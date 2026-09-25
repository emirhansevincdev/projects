// ignore_for_file: deprecated_member_use

import 'dart:ui';

import 'package:app_tracking_transparency/app_tracking_transparency.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/services.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:parse_server_sdk_flutter/parse_server_sdk_flutter.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import 'package:trace/app/constants.dart';
import 'package:trace/home/profile/tab_profile_screen.dart';
import 'package:trace/home/feed/feed_home_screen.dart';
import 'package:trace/home/profile/profile_edit.dart';
import 'package:trace/home/reels/reels_home_screen.dart';
import 'package:trace/models/MessageModel.dart';
import 'package:trace/models/OfficialAnnouncementModel.dart';
import 'package:trace/models/UserModel.dart';
import 'package:trace/ui/button_widget.dart';
import 'package:trace/ui/container_with_corner.dart';
import 'package:trace/ui/text_with_tap.dart';
import 'package:trace/utils/colors.dart';
import 'package:trace/helpers/quick_help.dart';
import 'package:trace/widgets/component.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_svg/svg.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:vibration/vibration.dart';

import '../app/setup.dart';
import '../auth/welcome_screen.dart';
import '../models/NotificationsModel.dart';
import '../services/call_services.dart';
import '../services/deep_links_service.dart';
import '../utils/permission.dart';
import 'admob/AppLifecycleReactor.dart';
import 'admob/AppOpenAdManager.dart';
import 'live/all_lives_screen.dart';
import 'message/message_list_screen.dart';

// ignore: must_be_immutable
class HomeScreen extends StatefulWidget {
  static const String route = '/home';

  UserModel? currentUser;
  int? initialTabIndex;

  HomeScreen(
      {this.initialTabIndex, this.currentUser});

  /* static of(BuildContext context, {bool root = false}) => root
      ? context.findRootAncestorStateOfType<_HomeScreenState>()
      : context.findAncestorStateOfType<_HomeScreenState>();*/

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late AppLifecycleReactor _appLifecycleReactor;

  BannerAd? _anchoredAdaptiveAd;
  bool _isLoaded = false;

  bool? hasVibrator;
  bool? hasAmplitude;
  bool? hasCustomDuration;
  int unreadMessageMount = 0;

  LiveQuery liveQuery = LiveQuery();
  Subscription? subscription;

  late QueryBuilder<NotificationsModel> notificationQueryBuilder;
  late QueryBuilder<MessageModel> messageQueryBuilder;
  late QueryBuilder<OfficialAnnouncementModel> officialAssistantQueryBuilder;
  var officialAnnouncements = [];
  bool messageCounted = false;
  bool announceCounted = false;

  getUnreadNotification() async {
    notificationQueryBuilder =
        QueryBuilder<NotificationsModel>(NotificationsModel());
    notificationQueryBuilder.whereEqualTo(
        NotificationsModel.keyReceiver, widget.currentUser!);
    notificationQueryBuilder.whereEqualTo(NotificationsModel.keyRead, false);

    notificationQueryBuilder.whereNotEqualTo(
        NotificationsModel.keyAuthor, widget.currentUser!);

    setupNotificationLiveQuery();

    ParseResponse parseResponse = await notificationQueryBuilder.query();

    if (parseResponse.success || parseResponse.count > 0) {
      unreadMessageMount += parseResponse.count;
    }
  }

  getUnreadMessage() async {
    messageQueryBuilder = QueryBuilder<MessageModel>(MessageModel());
    messageQueryBuilder.whereEqualTo(
        MessageModel.keyReceiver, widget.currentUser!);
    messageQueryBuilder.whereEqualTo(MessageModel.keyRead, false);

    messageQueryBuilder.whereNotEqualTo(
        NotificationsModel.keyAuthor, widget.currentUser!);

    setupMessageLiveQuery();

    ParseResponse parseResponse = await messageQueryBuilder.query();

    if (parseResponse.success || parseResponse.count > 0) {
      unreadMessageMount += parseResponse.count;
    }
  }

  getUnreadOfficial() async {
    officialAssistantQueryBuilder =
        QueryBuilder<OfficialAnnouncementModel>(OfficialAnnouncementModel());
    officialAssistantQueryBuilder.whereNotEqualTo(
        NotificationsModel.keyAuthor, widget.currentUser!);

    setupOfficialLiveQuery();

    ParseResponse parseResponse = await officialAssistantQueryBuilder.query();

    if (parseResponse.success) {
      if (parseResponse.results != null) {
        for (OfficialAnnouncementModel announcement in parseResponse.results!) {
          if (!announcement.getViewedBy!
              .contains(widget.currentUser!.objectId!)) {
            officialAnnouncements.add(announcement.objectId);
          }
        }
        unreadMessageMount += officialAnnouncements.length;
      }
    }
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _loadAd();
  }

  @override
  void dispose() {
    super.dispose();
    onUserLogout();
    if (subscription != null) {
      liveQuery.client.unSubscribe(subscription!);
    }
    //_anchoredAdaptiveAd?.dispose();
  }

  initializeVibrator() async {
    hasVibrator = await Vibration.hasVibrator();
    hasAmplitude = await Vibration.hasAmplitudeControl();
    hasAmplitude = await Vibration.hasCustomVibrationsSupport();
  }

  vibrate() async {
    bool? hasVibrator = await Vibration.hasVibrator();
    bool? hasAmplitude = await Vibration.hasAmplitudeControl();

    if (hasVibrator!) {
      Vibration.vibrate(
        amplitude: hasAmplitude != null ? 128 : -1,
        duration: hasAmplitude != null ? 80 : 500,
      );
    }
  }

  Future<void> _loadAd() async {
    // Get an AcbXX3KgvqD7B8Y4WjCu6yNx1Prfu5cNHz before loading the ad.
    final AnchoredAdaptiveBannerAdSize? size =
    await AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(
        MediaQuery.of(context).size.width.truncate());

    if (size == null) {
      print('Unable to get height of anchored banner.');
      return;
    } else {
      print('Got to get height of anchored banner.');
    }

    _anchoredAdaptiveAd = BannerAd(
      adUnitId: Constants.getAdmobHomeBannerUnit(),
      size: size,
      request: AdRequest(),
      listener: BannerAdListener(
        onAdLoaded: (Ad ad) {
          print('$ad loaded: ${ad.responseInfo}');
          setState(() {
            // When the ad is loaded, get the ad size and use it to set
            // the height of the ad container.
            _anchoredAdaptiveAd = ad as BannerAd;
            _isLoaded = true;
          });
        },
        onAdFailedToLoad: (Ad ad, LoadAdError error) {
          print('Anchored adaptive banner failedToLoad: $error');
          ad.dispose();
        },
      ),
    );
    return _anchoredAdaptiveAd!.load();
  }

  TextEditingController inviteTextController = TextEditingController();
  bool hasNotification = false;

  int _selectedIndex = 2;
  double iconSize = 30;

  static bool appTrackingDialogShowing = false;

  double _getElevation() {
    if (_selectedIndex == 0) {
      return 0;
    } else {
      return 8;
    }
  }

  void onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    vibrate();
    //getUser(updateLocation: false);
  }

  List<Widget> _widgetOptions() {
    //_checkNotifications();

    List<Widget> widgets = [
      ReelsHomeScreen(
        currentUser: widget.currentUser != null
            ? widget.currentUser
            : widget.currentUser,
      ),
      FeedHomeScreen(
        currentUser: widget.currentUser,
      ),
      AllLivesScreen(
        currentUser: widget.currentUser,
      ),
      MessagesListScreen(
        currentUser: widget.currentUser != null
            ? widget.currentUser
            : widget.currentUser,
      ),
      TabProfileScreen(
        currentUser: widget.currentUser != null
            ? widget.currentUser
            : widget.currentUser,
      ),
    ];

    return widgets;
  }

  // Not: Fonksiyon adı ve çağrıldığı yer (Scaffold.bottomNavigationBar) aynı kaldı.
  // Sadece görsel katman değişti — index'ler, onItemTapped(index) çağrıları,
  // badge mantığı ve asset yolları birebir korunuyor.
  Widget bottomNavBar() {
    bool isDark = QuickHelp.isDarkMode(context);
    Color bgColor = QuickHelp.isDarkMode(context)
        ? kContentColorLightTheme
        : kContentColorDarkTheme;

    List<Widget> navIcons = [
      _navItem(
        index: 0,
        icon: Component.buildNavIcon(
            Icon(
              Icons.smart_display_rounded,
              size: iconSize,
              color: _selectedIndex == 0
                  ? kPrimaryColor
                  : (isDark ? Colors.white : Colors.black),
            ),
            0,
            false,
            context),
      ),
      _navItem(
        index: 1,
        icon: Component.buildNavIcon(
            Icon(
              Icons.grid_view_rounded,
              size: iconSize,
              color: _selectedIndex == 1
                  ? kPrimaryColor
                  : (isDark ? Colors.white : Colors.black),
            ),
            1,
            false,
            context,
            badge: 12),
      ),
      _navItem(
        index: 2,
        isCenter: true,
        icon: Component.buildNavIcon(
            Container(
              height: 52,
              width: 52,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [kPrimaryColor, kSecondaryColor],
                ),
              ),
              child: const Icon(
                Icons.videocam_rounded,
                color: Colors.white,
                size: 26,
              ),
            ),
            2,
            false,
            context,
            color: 0xFF27E150,
            badge: 15),
      ),
      _navItem(
        index: 3,
        icon: Component.buildNavIcon(
            Icon(
              Icons.chat_bubble_rounded,
              size: 25,
              color: _selectedIndex == 3
                  ? kPrimaryColor
                  : (isDark ? Colors.white : Colors.black),
            ),
            3,
            unreadMessageMount > 0,
            badge: unreadMessageMount,
            context),
      ),
      _navItem(
        index: 4,
        icon: Icon(
          Icons.person_rounded,
          size: iconSize,
          color: _selectedIndex == 4
              ? kPrimaryColor
              : (isDark ? Colors.white : Colors.black),
        ),
      ),
    ];

    return Container(
      color: Colors.transparent,
      child: SafeArea(
        top: false,
        minimum: EdgeInsets.only(bottom: 6),
        child: Container(
          margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(30),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                decoration: BoxDecoration(
                  color: bgColor.withOpacity(isDark ? 0.45 : 0.6),
                  borderRadius: BorderRadius.circular(30),
                  border: Border.all(
                    color: Colors.white.withOpacity(isDark ? 0.12 : 0.55),
                    width: 1,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(isDark ? 0.25 : 0.14),
                      blurRadius: 24,
                      offset: Offset(0, 10),
                    ),
                  ],
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: navIcons,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _navItem({
    required int index,
    required Widget icon,
    bool isCenter = false,
  }) {
    bool isSelected = _selectedIndex == index;

    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () => onItemTapped(index),
      child: AnimatedContainer(
        duration: Duration(milliseconds: 180),
        curve: Curves.easeOut,
        padding: EdgeInsets.symmetric(
          horizontal: isCenter ? 8 : 14,
          vertical: isCenter ? 4 : 8,
        ),
        decoration: BoxDecoration(
          color: (isSelected && !isCenter)
              ? kPrimaryColor.withOpacity(0.14)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(22),
        ),
        child: isCenter
            ? Transform.translate(
          offset: Offset(0, -6),
          child: Container(
            padding: EdgeInsets.all(6),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(
                  color: kPrimaryColor.withOpacity(0.45),
                  blurRadius: 16,
                  offset: Offset(0, 6),
                ),
              ],
            ),
            child: icon,
          ),
        )
            : icon,
      ),
    );
  }

  checkUser() async {
    CustomerInfo customerInfo = await Purchases.getCustomerInfo();

    if (widget.currentUser!.getFullName!.isNotEmpty) {
      Purchases.setDisplayName(widget.currentUser!.getFullName!);
    }

    if (widget.currentUser!.getEmail != null) {
      Purchases.setEmail(widget.currentUser!.getEmail!);
    }

    if (widget.currentUser!.getGender != null) {
      Map<String, String> params = <String, String>{
        "Gender": widget.currentUser!.getGender!,
      };
      Purchases.setAttributes(params);
    }

    if (widget.currentUser!.getAge != null) {
      Map<String, String> params = <String, String>{
        "Age": widget.currentUser!.getAge.toString(),
      };
      Purchases.setAttributes(params);
    }

    if (widget.currentUser!.getBirthday != null) {
      Map<String, String> params = <String, String>{
        "Birthday":
        QuickHelp.getBirthdayFromDate(widget.currentUser!.getBirthday!),
      };
      Purchases.setAttributes(params);
    }

    print("USER PURCHASES: $customerInfo");
  }

  Future<void> checkPermissionAudio() async {
    if (QuickHelp.isAndroidPlatform()) {
      DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
      AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
      bool api32 = androidInfo.version.sdkInt <= 32;

      PermissionStatus status = api32 ? await Permission.storage.status : await Permission.photos.status;
      PermissionStatus status2 = await Permission.camera.status;
      PermissionStatus status3 = await Permission.microphone.status;

      print('Permission android');

      checkStatusAudio(status, status2, status3);
    } else if (QuickHelp.isIOSPlatform()) {
      PermissionStatus status = await Permission.photos.status;
      PermissionStatus status2 = await Permission.camera.status;
      PermissionStatus status3 = await Permission.microphone.status;
      print('Permission ios');

      checkStatusAudio(status, status2, status3);
    } else {
      print('Permission other device');
    }
  }

  void checkStatusAudio(PermissionStatus status, PermissionStatus status2,
      PermissionStatus status3) {
    if (status.isDenied || status2.isDenied || status3.isDenied) {
      QuickHelp.showDialogPermission(
        context: context,
        title: "permissions.photo_access".tr(),
        confirmButtonText: "permissions.okay_".tr().toUpperCase(),
        message: "permissions.photo_access_explain"
            .tr(namedArgs: {"app_name": Setup.appName}),
        onPressed: () async {
          QuickHelp.hideLoadingDialog(context);
          Map<Permission, PermissionStatus> statuses = await [
            Permission.camera,
            Permission.photos,
            Permission.storage,
            Permission.microphone,
          ].request();

          if (statuses[Permission.camera]!.isGranted &&
              statuses[Permission.photos]!.isGranted ||
              statuses[Permission.storage]!.isGranted ||
              statuses[Permission.microphone]!.isGranted) {
            print("all permissions granted");
          }
        },
      );
    } else if (status.isPermanentlyDenied ||
        status2.isPermanentlyDenied ||
        status3.isPermanentlyDenied) {
      QuickHelp.showDialogPermission(
          context: context,
          title: "permissions.photo_access_denied".tr(),
          confirmButtonText: "permissions.okay_settings".tr().toUpperCase(),
          message: "permissions.photo_access_denied_explain"
              .tr(namedArgs: {"app_name": Setup.appName}),
          onPressed: () {
            QuickHelp.hideLoadingDialog(context);

            openAppSettings();
          });
    } else if (status.isGranted && status2.isGranted && status3.isGranted) {
      print("all permissions granted");
    }

    print('Permission $status');
    print('Permission $status2');
    print('Permission $status3');
  }

  @override
  void initState() {
    super.initState();
    requestPermission();

    onUserLogin(widget.currentUser!);

    //checkPermissionAudio();

    getUnreadNotification();
    getUnreadMessage();
    getUnreadOfficial();
    if (mounted) {
      Future.delayed(Duration(seconds: 2), () {
        DeepLinksService.listenToDeepLinks(
          currentUser: widget.currentUser!,
          context: context,
        );
      });
    }

    initializeVibrator();
    QuickHelp.saveCurrentRoute(route: HomeScreen.route);
    checkUser();

    _selectedIndex = widget.initialTabIndex ?? _selectedIndex;

    Future.delayed(Duration(seconds: 2), () {
      if (QuickHelp.isIOSPlatform()) {
        if (!mounted) return; // Try
        showAppTrackingPermission(context);
      }
    });

    if (Setup.isOpenAppAdsEnabled) {
      AppOpenAdManager appOpenAdManager = AppOpenAdManager()..loadAd();
      _appLifecycleReactor =
          AppLifecycleReactor(appOpenAdManager: appOpenAdManager);
      _appLifecycleReactor.listenToAppStateChanges();
    }
  }

  bool checkHomeBannerAdReels() {
    if (Setup.isBannerAdsOnHomeReelsEnabled) {
      return true;
    } else {
      if (_selectedIndex == 4) {
        return false;
      } else {
        return true;
      }
    }
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Column(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: _widgetOptions().elementAt(_selectedIndex),
          ),
          if (_anchoredAdaptiveAd != null &&
              _isLoaded &&
              checkHomeBannerAdReels() && _selectedIndex != 4)
            Container(
              width: _anchoredAdaptiveAd!.size.width.toDouble(),
              height: _anchoredAdaptiveAd!.size.height.toDouble(),
              decoration: BoxDecoration(
                border: Border(
                  top: BorderSide(
                    color: Colors.black.withOpacity(0.06),
                    width: 1,
                  ),
                ),
              ),
              child: ClipRect(child: AdWidget(ad: _anchoredAdaptiveAd!)),
            )
          //Container(height: 50, color: Colors.purpleAccent,)
        ],
      ),
      //_widgetOptions().elementAt(_selectedIndex),
      bottomNavigationBar: bottomNavBar(),
    );
  }

  Widget getCoinsWidget(
      {double? coinIconSize, Color? coinsColor, String? coinsIcon}) {
    QueryBuilder<UserModel> queryBuilder =
    QueryBuilder<UserModel>(UserModel.forQuery());
    queryBuilder.whereEqualTo(keyVarObjectId, widget.currentUser!.objectId!);

    return ParseLiveListWidget<UserModel>(
      query: queryBuilder,
      reverse: false,
      lazyLoading: false,
      shrinkWrap: true,
      duration: Duration(seconds: 0),
      childBuilder: (BuildContext context,
          ParseLiveListElementSnapshot<ParseObject> snapshot) {
        if (snapshot.hasData) {
          UserModel updatedUser = snapshot.loadedData! as UserModel;
          widget.currentUser = updatedUser;

          if (QuickHelp.isAccountDisabled(updatedUser)) {
            print("User updated accountDisabled true");

            widget.currentUser!.logout(deleteLocalUserData: true).then((value) {

              QuickHelp.goToPageWithClear(
                context, WelcomeScreen(),
              );
            }).onError(
                  (error, stackTrace) {},
            );
          } else {
            print("User updated accountDisabled false");
          }

          //print("User updated, old value: ${widget.currentUser!.getCredits.toString()}");
          //print("User updated, new value: ${updatedUser.getCredits.toString()}");

          return coinsWidget(
            coinIconSize: coinIconSize,
            coinsColor: coinsColor,
            coinsIcon: coinsIcon,
            coins: updatedUser.getCredits.toString(),
          );
        } else {
          return coinsWidget(
            coinIconSize: coinIconSize,
            coinsColor: coinsColor,
            coinsIcon: coinsIcon,
            coins: "...",
          );
        }
      },
      queryEmptyElement: coinsWidget(
        coinIconSize: coinIconSize,
        coinsColor: coinsColor,
        coinsIcon: coinsIcon,
        coins: "",
      ),
      listLoadingElement: coinsWidget(
        coinIconSize: coinIconSize,
        coinsColor: coinsColor,
        coinsIcon: coinsIcon,
        coins: "...",
      ),
    );
  }

  Widget coinsWidget(
      {double? coinIconSize,
        Color? coinsColor,
        String? coinsIcon,
        String? coins}) {
    bool isDark = QuickHelp.isDarkMode(context);
    return ClipRRect(
      borderRadius: BorderRadius.circular(20),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: kGoldenColor.withOpacity(isDark ? 0.18 : 0.14),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: kGoldenColor.withOpacity(0.4), width: 1),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              SvgPicture.asset(coinsIcon!, width: coinIconSize, height: coinIconSize),
              TextWithTap(
                coins!,
                fontWeight: FontWeight.bold,
                fontSize: 14,
                marginLeft: 6,
                color: coinsColor,
              ),
            ],
          ),
        ),
      ),
    );
  }

  void showNameModal() {
    showModalBottomSheet(
        context: (context),
        isScrollControlled: true,
        backgroundColor: Colors.transparent,
        enableDrag: false,
        isDismissible: false,
        builder: (context) {
          return _showBottomSheetUpdateName();
        });
  }

  Widget _showBottomSheetUpdateName() {
    return Container(
      color: Color.fromRGBO(0, 0, 0, 0.001),
      child: GestureDetector(
        onTap: () {},
        child: DraggableScrollableSheet(
          initialChildSize: 0.3,
          minChildSize: 0.1,
          maxChildSize: 1.0,
          builder: (_, controller) {
            return StatefulBuilder(
              builder: (context, setState) {
                bool isDark = QuickHelp.isDarkMode(context);
                return Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.only(
                      topLeft: const Radius.circular(28.0),
                      topRight: const Radius.circular(28.0),
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.15),
                        blurRadius: 24,
                        offset: Offset(0, -6),
                      ),
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.only(
                      topLeft: const Radius.circular(28.0),
                      topRight: const Radius.circular(28.0),
                    ),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
                      child: Container(
                        decoration: BoxDecoration(
                          color: (isDark ? Colors.black : Colors.white)
                              .withOpacity(isDark ? 0.55 : 0.75),
                          border: Border(
                            top: BorderSide(
                              color: Colors.white
                                  .withOpacity(isDark ? 0.12 : 0.6),
                              width: 1,
                            ),
                          ),
                        ),
                        child: SafeArea(
                          child: Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Column(
                                  children: [
                                    Container(
                                      margin: EdgeInsets.only(top: 10),
                                      width: 40,
                                      height: 4,
                                      decoration: BoxDecoration(
                                        color: Colors.grey.withOpacity(0.4),
                                        borderRadius: BorderRadius.circular(10),
                                      ),
                                    ),
                                    TextWithTap(
                                      "profile_screen.change_name_title".tr(),
                                      marginTop: 16,
                                      marginBottom: 20,
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                    ),
                                    TextWithTap(
                                      "profile_screen.change_name_explain".tr(),
                                      fontSize: 16,
                                      textAlign: TextAlign.center,
                                      marginLeft: 20,
                                      marginRight: 20,
                                    ),
                                  ],
                                ),
                                ButtonWidget(
                                  width: 140,
                                  height: 42,
                                  padding: EdgeInsets.only(left: 10, right: 10),
                                  marginBottom: 24,
                                  borderRadiusAll: 24,
                                  color: kPrimaryColor,
                                  child: TextWithTap(
                                    "profile_screen.change_btn".tr(),
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  onTap: () async {
                                    QuickHelp.hideLoadingDialog(context);

                                    UserModel? user = await QuickHelp
                                        .goToNavigatorScreenForResult(
                                        context,
                                        ProfileEdit(
                                          currentUser: widget.currentUser,
                                        ));

                                    if (user != null) {
                                      widget.currentUser = user;
                                    }
                                  },
                                )
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              },
            );
          },
        ),
      ),
    );
  }

  showAppTrackingPermission(BuildContext context) async {
    // Show tracking authorization dialog and ask for permission
    try {
      // If the system can show an authorization request dialog
      TrackingStatus status =
      await AppTrackingTransparency.trackingAuthorizationStatus;

      if (status == TrackingStatus.notSupported) {
        print("TrackingPermission notSupported");
      } else if (status == TrackingStatus.notDetermined) {
        // Show a custom explainer dialog before the system dialog

        if (!appTrackingDialogShowing) {
          appTrackingDialogShowing = true;

          QuickHelp.showDialogPermission(
              context: context,
              dismissible: false,
              confirmButtonText:
              "permissions.allow_tracking".tr().toUpperCase(),
              title: "permissions.allow_app_tracking".tr(),
              message: "permissions.app_tracking_explain".tr(),
              onPressed: () async {
                QuickHelp.goBackToPreviousPage(context);
                appTrackingDialogShowing = false;
                await AppTrackingTransparency.requestTrackingAuthorization()
                    .then((value) async {
                  if (status == TrackingStatus.authorized) {
                    debugPrint("await FacebookAuth.i.autoLogAppEventsEnabled(true);");
                  }
                });
              });
        }
      }
    } on PlatformException {
      // Unexpected exception was thrown
    }
  }

  showError(int code) {
    QuickHelp.hideLoadingDialog(context);
    QuickHelp.showErrorResult(context, code);
  }

  setupNotificationLiveQuery() async {
    subscription = await liveQuery.client.subscribe(notificationQueryBuilder);

    print('*** INITIALIZE_Live_query ***');

    subscription!.on(LiveQueryEvent.create,
            (NotificationsModel notification) async {
          print('*** CREATED_Live_query ***');

          if (notification.isRead!) {
            unreadMessageMount--;
          } else {
            unreadMessageMount++;
          }
        });

    subscription!.on(LiveQueryEvent.update,
            (NotificationsModel notification) async {
          print('*** UPDATE_Live_query ***');
          if (notification.isRead!) {
            unreadMessageMount--;
          } else {
            unreadMessageMount++;
          }
        });

    subscription!.on(LiveQueryEvent.enter,
            (NotificationsModel notification) async {
          print('*** ENTER_Live_query ***');
          if (notification.isRead!) {
            unreadMessageMount--;
          } else {
            unreadMessageMount++;
          }
        });

    subscription!.on(LiveQueryEvent.leave,
            (NotificationsModel notification) async {
          print('*** Leave_Live_query ***');
          if (notification.isRead!) {
            unreadMessageMount--;
          } else {
            unreadMessageMount++;
          }
        });
  }

  setupMessageLiveQuery() async {
    subscription = await liveQuery.client.subscribe(messageQueryBuilder);

    print('*** INITIALIZE_Live_query ***');

    subscription!.on(LiveQueryEvent.create, (MessageModel message) async {
      print('*** CREATED_Live_query ***');

      if (message.isRead!) {
        unreadMessageMount--;
      } else {
        unreadMessageMount++;
        messageCounted = true;
      }
    });

    subscription!.on(LiveQueryEvent.update, (MessageModel message) async {
      print('*** UPDATE_Live_query ***');
      if (message.isRead!) {
        unreadMessageMount--;
      } else {
        if (!messageCounted) {
          unreadMessageMount++;
        }
        messageCounted = false;
      }
    });

    subscription!.on(LiveQueryEvent.enter, (MessageModel message) async {
      print('*** ENTER_Live_query ***');
      if (message.isRead!) {
        unreadMessageMount--;
      } else {
        unreadMessageMount++;
      }
    });

    subscription!.on(LiveQueryEvent.leave, (MessageModel message) async {
      print('*** Leave_Live_query ***');
      if (message.isRead!) {
        unreadMessageMount--;
      } else {
        unreadMessageMount++;
      }
    });
  }

  setupOfficialLiveQuery() async {
    subscription =
    await liveQuery.client.subscribe(officialAssistantQueryBuilder);

    print('*** INITIALIZE_Live_query ***');

    subscription!.on(LiveQueryEvent.create,
            (OfficialAnnouncementModel official) async {
          print('*** CREATED_Live_query ***');

          if (!official.getViewedBy!.contains(widget.currentUser!.objectId!)) {
            officialAnnouncements.add(official.objectId);
            unreadMessageMount++;
            announceCounted = true;
          }
        });

    subscription!.on(LiveQueryEvent.update,
            (OfficialAnnouncementModel official) async {
          print('*** UPDATE_Live_query ***');
          if (!official.getViewedBy!.contains(widget.currentUser!.objectId!)) {
            officialAnnouncements.add(official.objectId);
            unreadMessageMount++;
          } else {
            if (!announceCounted) {
              unreadMessageMount++;
            }
            announceCounted = false;
          }
        });

    subscription!.on(LiveQueryEvent.enter,
            (OfficialAnnouncementModel official) async {
          print('*** ENTER_Live_query ***');
          if (!official.getViewedBy!.contains(widget.currentUser!.objectId!)) {
            officialAnnouncements.add(official.objectId);
            unreadMessageMount++;
            announceCounted = true;
          }
        });

    subscription!.on(LiveQueryEvent.leave,
            (OfficialAnnouncementModel official) async {
          print('*** Leave_Live_query ***');
          if (official.getViewedBy!.contains(widget.currentUser!.objectId!)) {
            officialAnnouncements.add(official.objectId);
            unreadMessageMount--;
          }
        });
  }
}
