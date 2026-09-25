// ignore_for_file: must_be_immutable

import 'package:auto_size_text/auto_size_text.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:parse_server_sdk_flutter/parse_server_sdk_flutter.dart';
import 'package:trace/helpers/quick_actions.dart';
import 'package:trace/home/home_screen.dart';
import 'package:trace/home/profile/profile_screen.dart';
import 'package:trace/home/relations/close_friends.dart';
import 'package:trace/home/settings/settings_screen.dart';
import 'package:trace/ui/container_with_corner.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../helpers/quick_help.dart';
import '../../models/GroupMessageModel.dart';
import '../../models/UserModel.dart';
import '../../ui/text_with_tap.dart';
import '../../utils/colors.dart';
import '../agency/add_host_screen.dart';
import '../agency/agency_group_creation_screen.dart';
import '../agency/agency_screen.dart';
import '../agency/agent_screen.dart';
import '../agency/my_agent_sreen.dart';
import '../agency/official_services_screen.dart';
import '../coins/refill_coins_screen.dart';
import '../coins_and_points/coins_and_points_screen.dart';
import '../coins_and_points/points_screen.dart';
import '../coins_trading/coins_trading_screen.dart';
import '../contact_us/contact_us_screen.dart';
import '../fan_club/fan_club_screen.dart';
import '../feedback/my_feedback_screen.dart';
import '../guardian_vip/guardian_and_vip_store_screen.dart';
import '../guardian_vip/my_guardian_screen.dart';
import '../help/help_screen.dart';
import '../host_center/host_center_screen.dart';
import '../invitation/invitation_screen.dart';
import '../level/level_screen.dart';
import '../mvp/mvp_screen.dart';
import '../my_moments/my_moments_screen.dart';
import '../my_obtained_items/my_obtained_items.dart';
import '../relations/followers_screen.dart';
import '../relations/visits_screen.dart';
import '../report/report_screen.dart';
import '../reward/reward_screen.dart';
import '../store/store_screen.dart';
import '../task_rules/task_rules_screen.dart';
import '../upload_live_photo/upload_live_photo_screen.dart';
import '../wallet/wallet_screen.dart';
import '../withdraw/witthdraw_screen.dart';

class TabProfileScreen extends StatefulWidget {
  UserModel? currentUser;
  static String route = "user/profile";

  TabProfileScreen({this.currentUser, Key? key}) : super(key: key);

  @override
  State<TabProfileScreen> createState() => _TabProfileScreenState();
}

class _TabProfileScreenState extends State<TabProfileScreen> {
  final CarouselController _controller = CarouselController();
  int current = 0;

  var numbersCaptions = [
    "tab_profile.followings_".tr(),
    "tab_profile.followers_".tr(),
    "profile_list_menu.moments_".tr(),
  ];

  var coinsCaption = [
    "tab_profile.coins_".tr(),
    "tab_profile.p_coin".tr(),
    "tab_profile.points_".tr(),
  ];

  var slideBanner = [
    "assets/images/slide_image_1.png",
    "assets/images/slide_image_2.png",
    "assets/images/slide_image_3.png",
    "assets/images/slide_image_4.png",
  ];

  var firstOptionsCaption = [
    "tab_profile.reward_".tr(),
    "tab_profile.rank_".tr(),
    "tab_profile.store_".tr(),
    "tab_profile.invite_".tr(),
    "tab_profile.medal_".tr(),
    "tab_profile.fans_club".tr(),
    "tab_profile.auth_".tr(),
  ];

  var firstOptionsIcons = [
    "assets/images/ic_tab_profile_reward.png",
    "assets/images/ic_tab_profile_rank.png",
    "assets/images/ic_tab_profile_store.png",
    "assets/images/ic_tab_invite.png",
    "assets/images/ic_tab_profile_medal.png",
    "assets/images/ic_tab_profile_fans.png",
    "assets/images/ic_tab_profile_auth.png",
  ];

  var agentOptionsIcons = [
    "assets/images/ic_tab_profile_agent.png",
    "assets/images/ic_tab_profile_add_host.png",
    "assets/images/ic_tab_profile_coins_trading.png",
    "assets/images/ic_tab_profile_official_services.png",
  ];

  var agentOptionsCaption = [
    "agents_menu.agent_".tr(),
    "agents_menu.add_host".tr(),
    "agents_menu.coins_trading".tr(),
    "agents_menu.official_services".tr(),
  ];

  var secondOptionsCaption = [
    //"tab_profile.guardian_".tr(),
    //"tab_profile.help_".tr(),
    "tab_profile.my_agency".tr(),
    //"tab_profile.level_complete".tr(),
    //"tab_profile.about_".tr(),
    //"tab_profile.settings_".tr(),
    //"tab_profile.follow_us".tr()
  ];

  var secondOptionsLightIcons = [
    //"assets/images/ic_profil_tab_guardian.png",
    //"assets/images/ic_profil_tab_help.png",
    "assets/images/ic_tab_profile_agency.png",
    //"assets/images/ic_tab_profile_level.png",
    //"assets/images/ic_tab_profile_about.png",
    //"assets/images/ic_tab_profile_settings.png",
    //"assets/images/ic_tab_profile_follow.png",
  ];

  var secondOptionsDarkIcons = [
    "assets/svg/ic_guardian_dark.svg",
    "assets/svg/help.svg",
    "assets/svg/ic_agent_dark.svg",
    "assets/svg/ic_level_dark.svg",
    "assets/svg/ic_about_dark.svg",
    "assets/svg/ic_config_dark.svg",
    "assets/svg/ic_facebook_dark.svg"
  ];

  var coinsImageUrls = [
    "assets/images/icon_jinbi.png",
    "assets/images/icon_ppbi_do_task.png",
    "assets/images/ic_jifen_wode.webp",
  ];

  var coinsActionsTexts = [
    "tab_profile.top_up".tr(),
    "tab_profile.receive_".tr(),
    "tab_profile.withdraw_".tr(),
  ];

  bool showTempAlert = false;

  loadAgencyGroup() async {
    QueryBuilder<MessageGroupModel> queryBuilder =
    QueryBuilder<MessageGroupModel>(MessageGroupModel());

    queryBuilder.whereEqualTo(
        MessageGroupModel.keyCreatorID, widget.currentUser!.objectId);
    queryBuilder.whereEqualTo(
        MessageGroupModel.keyGroupType, MessageGroupModel.keyAgencyGroupType);
    queryBuilder.includeObject([
      MessageGroupModel.keyCreator,
    ]);

    ParseResponse response = await queryBuilder.query();

    if (response.success && response.result != null) {
      agencyGroup = response.results!.first;
    }
  }

  @override
  void initState() {
    super.initState();
    loadAgencyGroup();
  }

  showTemporaryAlert() {
    setState(() {
      showTempAlert = true;
    });
    hideTemporaryAlert();
  }

  hideTemporaryAlert() {
    Future.delayed(const Duration(seconds: 1), () {
      setState(() {
        showTempAlert = false;
      });
    });
  }

  MessageGroupModel? agencyGroup;

  Widget agencyScreen() {
    if (widget.currentUser!.getAgencyRole == UserModel.agencyClientRole) {
      return MyAgentScreen(
        currentUser: widget.currentUser,
      );
    } else if (widget.currentUser!.getAgencyRole == UserModel.agencyAgentRole) {
      return AgentScreen(
        currentUser: widget.currentUser,
      );
    } else {
      return AgencyScreen(
        currentUser: widget.currentUser,
      );
    }
  }

  var coinsActionsButtonsBgColors = [
    kOrangeColor,
    kPrimaryColor,
    earnCashColor,
  ];

  var firstOptionsScreens = [];
  var secondOptionsScreens = [];
  var agentOptionsScreens = [];
  var agencyOptionsScreens = [];
  var listMenuScreens = [];

  var personalIcons = [
    "assets/images/my_icon_message.png",
    "assets/images/my_icon_bag.png",
    "assets/images/my_icon_store.png",
    "assets/images/my_icon_home.png",
    "assets/images/my_icon_lv.png",
    "assets/images/my_icon_check.png",
    "assets/images/my_icon_manor.png",
    "assets/images/icon_medal_default.png",
  ];

  var personalTitle = [
    "personal_menu.messages_".tr(),
    "personal_menu.Backpacks_".tr(),
    "personal_menu.shop_".tr(),
    "personal_menu.family_".tr(),
    "personal_menu.level_".tr(),
    "personal_menu.check_in".tr(),
    "personal_menu.farm_".tr(),
    "personal_menu.badges_".tr(),
  ];

  var privilegesIcons = [
    "assets/images/my_icon_member.png",
    "assets/images/my_icon_vip.png",
    "assets/images/my_icon_guard.png",
    "assets/images/my_icon_love.png",
  ];

  var privilegesTitle = [
    "profile_list_menu.mvp_".tr(),
    "profile_list_menu.vip_".tr(),
    "profile_list_menu.my_guardian".tr(),
    "profile_list_menu.fan_club".tr(),
  ];

  var listMenuTitle = [
    "profile_list_menu.host_center".tr(),
    //"profile_list_menu.batter_of_glory".tr(),
    "profile_list_menu.who_viewed_me".tr(),
    "profile_list_menu.view_record".tr(),
    "profile_list_menu.customer_service".tr(),
    "profile_list_menu.help_center".tr(),
    "profile_list_menu.feed_back".tr(),
    "profile_list_menu.contact_us".tr(),
  ];

  // Leading icons paired 1:1 with listMenuTitle, purely decorative.
  static const List<IconData> _listMenuIcons = [
    Icons.storefront_outlined,
    Icons.visibility_outlined,
    Icons.history_rounded,
    Icons.support_agent_rounded,
    Icons.help_outline_rounded,
    Icons.feedback_outlined,
    Icons.mail_outline_rounded,
  ];

  var colors = [Colors.redAccent, Colors.amber, Colors.deepPurpleAccent];

  final Uri url =
  Uri.parse("https://www.facebook.com/profile.php?id=100063582998530");

  Future<void> goToFacebookPage() async {
    if (!await launchUrl(url)) {
      throw Exception('Could not launch $url');
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    bool isDark = QuickHelp.isDarkMode(context);

    agencyOptionsScreens = [
      AgentScreen(
        currentUser: widget.currentUser,
      ),
      AddHostScreen(
        currentUser: widget.currentUser,
      ),
      CoinsTradingScreen(
        currentUser: widget.currentUser,
      ),
      OfficialServicesScreen(
        currentUser: widget.currentUser,
        groupModel: agencyGroup,
      ),
    ];

    agentOptionsScreens = [
      MVPScreen(
        currentUser: widget.currentUser,
      ),
      GuardianAndVipStoreScreen(
        currentUser: widget.currentUser,
        initialIndex: 1,
      ),
      MyGuardianScreen(
        currentUser: widget.currentUser,
      ),
      FanClubScreen(
        currentUser: widget.currentUser,
      ),
    ];

    listMenuScreens = [
      HostCenterScreen(
        currentUser: widget.currentUser,
      ),
      /*HostCenterScreen(
        currentUser: widget.currentUser,

      ),*/
      VisitScreen(
        currentUser: widget.currentUser,
        initialIndex: 0,
      ),
      VisitScreen(
        currentUser: widget.currentUser,
        initialIndex: 1,
      ),
      ReportScreen(
        currentUser: widget.currentUser,
      ),
      HelpScreen(
        currentUser: widget.currentUser,
      ),
      ReportScreen(
        currentUser: widget.currentUser,
      ),
      ContactUsScreen(
        currentUser: widget.currentUser,
      ),
    ];

    firstOptionsScreens = [
      HomeScreen(
        currentUser: widget.currentUser,
        initialTabIndex: 3,
      ),
      MyObtainedItems(
        currentUser: widget.currentUser,
      ),
      StoreScreen(
        currentUser: widget.currentUser,
      ),
      InvitationScreen(
        currentUser: widget.currentUser,
      ),
      LevelScreen(
        currentUser: widget.currentUser,
      ),
      UploadLivePhoto(
        currentUser: widget.currentUser,
      ),
      MyFeedbackScreen(
        currentUser: widget.currentUser,
      ),
      TaskRulesScreen(
        currentUser: widget.currentUser,
      ),
    ];

    secondOptionsScreens = [
      /*GuardianAndVipStoreScreen(
        currentUser: widget.currentUser,

        initialIndex: 0,
      ),
      HelpScreen(
        currentUser: widget.currentUser,

      ),*/
      agencyScreen(),
      /*LevelScreen(
        currentUser: widget.currentUser,

      ),
      AboutUsScreen(
        currentUser: widget.currentUser,

      ),
      SettingsScreen(
        currentUser: widget.currentUser,

      ),
      null*/
    ];

    final Color scaffoldBg = isDark ? kContentDarkShadow : kGrayWhite;
    final Color cardBg = isDark ? kContentColorLightTheme : Colors.white;
    final Color textPrimary = isDark ? Colors.white : const Color(0xFF13131A);
    final double gridItemWidth = (size.width - 32) / 4;

    return Stack(
      children: [
        Scaffold(
          backgroundColor: scaffoldBg,
          appBar: AppBar(
            automaticallyImplyLeading: false,
            leadingWidth: 0,
            elevation: 0,
            scrolledUnderElevation: 0,
            surfaceTintColor: Colors.transparent,
            backgroundColor: scaffoldBg,
            titleSpacing: 20,
            title: Text(
              widget.currentUser!.getFullName!,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.w700,
                color: textPrimary,
              ),
            ),
            actions: [
              Padding(
                padding: const EdgeInsets.only(right: 16),
                child: IconButton(
                  padding: EdgeInsets.zero,
                  onPressed: () async {
                    UserModel? user =
                    await QuickHelp.goToNavigatorScreenForResult(
                        context,
                        SettingsScreen(
                          currentUser: widget.currentUser,
                        ));
                    if (user != null) {
                      debugPrint("user: ${user}");
                      setState(() {
                        widget.currentUser = user;
                      });
                    }
                  },
                  icon: Container(
                    width: 40,
                    height: 40,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isDark
                          ? Colors.white.withOpacity(0.08)
                          : const Color(0xFFF0F0F5),
                    ),
                    child: Image.asset(
                      "assets/images/profile_icon_set.png",
                      height: 20,
                      width: 20,
                    ),
                  ),
                ),
              )
            ],
          ),
          body: ListView(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
            children: [
              _buildHero(size, isDark, textPrimary),
              _buildWalletCard(size, isDark, textPrimary, cardBg),
              _sectionHeader("personal_".tr(), textPrimary),
              _gridCard(
                isDark: isDark,
                cardBg: cardBg,
                itemWidth: gridItemWidth,
                children: List.generate(
                  personalTitle.length,
                      (index) => options(
                    caption: personalTitle[index],
                    screenTogo: firstOptionsScreens[index],
                    iconURL: personalIcons[index],
                    isAgency: false,
                    index: index,
                  ),
                ),
              ),
              _sectionHeader("privileges_".tr(), textPrimary),
              _gridCard(
                isDark: isDark,
                cardBg: cardBg,
                itemWidth: gridItemWidth,
                children: List.generate(
                  privilegesTitle.length,
                      (index) => options(
                    caption: privilegesTitle[index],
                    screenTogo: agentOptionsScreens[index],
                    iconURL: privilegesIcons[index],
                    width: size.width / 14,
                    height: size.width / 14,
                    isAgency: false,
                    index: index,
                  ),
                ),
              ),
              _sectionHeader("agency_".tr(), textPrimary),
              _gridCard(
                isDark: isDark,
                cardBg: cardBg,
                itemWidth: gridItemWidth,
                children: List.generate(
                  secondOptionsCaption.length,
                      (index) => secondOptions(
                    caption: secondOptionsCaption[index],
                    screenTogo: secondOptionsScreens[index],
                    iconURL: secondOptionsLightIcons[index],
                  ),
                ),
              ),
              if (widget.currentUser!.getAgencyRole ==
                  UserModel.agencyAgentRole)
                Padding(
                  padding: const EdgeInsets.only(top: 10),
                  child: _gridCard(
                    isDark: isDark,
                    cardBg: cardBg,
                    itemWidth: gridItemWidth,
                    children: List.generate(
                      agentOptionsCaption.length,
                          (index) => options(
                        caption: agentOptionsCaption[index],
                        screenTogo: agencyOptionsScreens[index],
                        iconURL: agentOptionsIcons[index],
                        isAgency: true,
                        index: index,
                      ),
                    ),
                  ),
                ),
              _buildListMenu(isDark, textPrimary, cardBg),
              const SizedBox(height: 12),
            ],
          ),
        ),
        Positioned(
          bottom: 0,
          top: kToolbarHeight,
          child: IgnorePointer(
            child: ContainerCorner(
              fit: BoxFit.fill,
              imageDecoration: QuickHelp.levelVipCover(
                currentCredit: widget.currentUser!.getCredits!.toDouble(),
                user: widget.currentUser!,
              ),
              width: size.width,
              height: size.height - kToolbarHeight,
            ),
          ),
        ),
        _buildCopiedToast(),
      ],
    );
  }

  Widget _buildHero(Size size, bool isDark, Color textPrimary) {
    var numbersCaptionsScreens = [
      FollowersScreen(
        currentUser: widget.currentUser,
        isFollowers: false,
      ),
      FollowersScreen(
        currentUser: widget.currentUser,
        isFollowers: true,
      ),
      MyMomentsScreen(
        currentUser: widget.currentUser,
      ),
      VisitScreen(
        currentUser: widget.currentUser,
      ),
    ];

    var numbers = [
      widget.currentUser!.getFollowing!.length,
      widget.currentUser!.getFollowers!.length,
      widget.currentUser!.getPostIdList!.length,
    ];

    return Stack(
      children: [
        if (QuickHelp.isMvpUser(widget.currentUser!))
          Container(
            width: size.width,
            height: 260,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              gradient: LinearGradient(
                colors: [kColorsLightBlue200, kTransparentColor],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
            ),
            child: Stack(
              alignment: AlignmentDirectional.center,
              children: [
                Image.asset("assets/images/google_points_mvp_icon.png"),
                Positioned(
                  top: 0,
                  right: 10,
                  child: Image.asset(
                    "assets/images/vip_member.png",
                    height: 35,
                    width: 35,
                  ),
                ),
              ],
            ),
          ),
        Column(
          children: [
            GestureDetector(
              onTap: () {
                QuickHelp.goToNavigatorScreen(
                  context,
                  ProfileScreen(
                    currentUser: widget.currentUser,
                  ),
                );
              },
              child: QuickActions.avatarWidget(
                widget.currentUser!,
                width: size.width / 3,
                height: size.width / 3,
                margin: const EdgeInsets.only(top: 15, bottom: 15),
                hideAvatarFrame: true,
              ),
            ),
            Text(
              widget.currentUser!.getFullName!,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w800,
                color: textPrimary,
              ),
            ),
            const SizedBox(height: 10),
            GestureDetector(
              onTap: () {
                QuickHelp.copyText(
                    textToCopy: "${widget.currentUser!.getUid!}");
                showTemporaryAlert();
              },
              child: Container(
                padding: const EdgeInsets.symmetric(
                    horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: kGrayColor.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      "tab_profile.id_".tr(),
                      style: const TextStyle(
                        fontSize: 12.5,
                        fontWeight: FontWeight.w700,
                        color: kGrayColor,
                      ),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      widget.currentUser!.getUid!.toString(),
                      style: const TextStyle(
                        fontSize: 12.5,
                        fontWeight: FontWeight.w600,
                        color: kGrayColor,
                      ),
                    ),
                    const SizedBox(width: 6),
                    const Icon(
                      Icons.copy_rounded,
                      color: kGrayColor,
                      size: 14,
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: List.generate(
                numbersCaptions.length,
                    (index) => captionAndNumber(
                  caption: numbersCaptions[index],
                  screenToGo: numbersCaptionsScreens[index],
                  number: numbers[index],
                  visitor: index == 2 ? true : false,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildWalletCard(
      Size size, bool isDark, Color textPrimary, Color cardBg) {
    return Container(
      margin: const EdgeInsets.only(top: 18),
      padding: const EdgeInsets.symmetric(vertical: 14),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: kGrayColor.withOpacity(isDark ? 0.25 : 0.08),
            blurRadius: 14,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                borderRadius: BorderRadius.circular(12),
                onTap: () async {
                  UserModel? user =
                  await QuickHelp.goToNavigatorScreenForResult(
                    context,
                    WalletScreen(
                      currentUser: widget.currentUser,
                    ),
                  );
                  if (user != null) {
                    setState(() {
                      widget.currentUser = user;
                    });
                  }
                },
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.account_balance_wallet_rounded,
                            size: 14, color: kOrangeColor),
                        const SizedBox(width: 5),
                        Text(
                          "profile_list_menu.wallet_".tr(),
                          style: const TextStyle(
                            fontSize: 12.5,
                            fontWeight: FontWeight.w600,
                            color: kGrayColor,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Image.asset(
                          "assets/images/icon_jinbi.png",
                          height: 15,
                          width: 15,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          QuickHelp.checkFundsWithString(
                              amount: "${widget.currentUser!.getCredits}"),
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w800,
                            color: textPrimary,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
          Container(
            height: 34,
            width: 1,
            color: kGrayColor.withOpacity(0.25),
          ),
          Expanded(
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                borderRadius: BorderRadius.circular(12),
                onTap: () {
                  QuickHelp.goToNavigatorScreen(
                    context,
                    PointsScreen(
                      currentUser: widget.currentUser,
                    ),
                  );
                },
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.diamond_rounded,
                            size: 14, color: kPrimaryColor),
                        const SizedBox(width: 5),
                        Text(
                          "my_earnings".tr(),
                          style: const TextStyle(
                            fontSize: 12.5,
                            fontWeight: FontWeight.w600,
                            color: kGrayColor,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Image.asset(
                          "assets/images/ic_jifen_wode.webp",
                          height: 15,
                          width: 15,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          QuickHelp.checkFundsWithString(
                            amount: "${widget.currentUser!.getDiamonds}",
                          ),
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w800,
                            color: textPrimary,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _sectionHeader(String text, Color textPrimary) {
    return Padding(
      padding: const EdgeInsets.only(top: 20, bottom: 10),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 17,
          fontWeight: FontWeight.w800,
          color: textPrimary,
        ),
      ),
    );
  }

  Widget _gridCard({
    required List<Widget> children,
    required double itemWidth,
    required bool isDark,
    required Color cardBg,
  }) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 8),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: kGrayColor.withOpacity(isDark ? 0.25 : 0.08),
            blurRadius: 14,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Wrap(
        runSpacing: 8,
        children:
        children.map((child) => SizedBox(width: itemWidth, child: child)).toList(),
      ),
    );
  }

  Widget _buildListMenu(bool isDark, Color textPrimary, Color cardBg) {
    return Container(
      margin: const EdgeInsets.only(top: 20),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: kGrayColor.withOpacity(isDark ? 0.25 : 0.08),
            blurRadius: 14,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: List.generate(listMenuTitle.length, (index) {
          return Column(
            children: [
              Material(
                color: Colors.transparent,
                child: InkWell(
                  borderRadius: BorderRadius.vertical(
                    top: index == 0 ? const Radius.circular(16) : Radius.zero,
                    bottom: index == listMenuTitle.length - 1
                        ? const Radius.circular(16)
                        : Radius.zero,
                  ),
                  onTap: () => QuickHelp.goToNavigatorScreen(
                    context,
                    listMenuScreens[index],
                  ),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 16, vertical: 14),
                    child: Row(
                      children: [
                        Icon(
                          index < _listMenuIcons.length
                              ? _listMenuIcons[index]
                              : Icons.chevron_right_rounded,
                          size: 20,
                          color: kGrayColor,
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Text(
                            listMenuTitle[index],
                            style: TextStyle(
                              fontSize: 14.5,
                              fontWeight: FontWeight.w500,
                              color: textPrimary,
                            ),
                          ),
                        ),
                        if (index == 4)
                          Padding(
                            padding: const EdgeInsets.only(right: 8),
                            child: Image.asset(
                              "assets/images/im_service_icon.png",
                              height: 16,
                              width: 16,
                            ),
                          ),
                        const Icon(
                          Icons.chevron_right_rounded,
                          size: 18,
                          color: kGrayColor,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              if (index != listMenuTitle.length - 1)
                Divider(
                  height: 1,
                  thickness: 1,
                  indent: 16,
                  endIndent: 16,
                  color: (isDark ? Colors.white : Colors.black)
                      .withOpacity(0.06),
                ),
            ],
          );
        }),
      ),
    );
  }

  Widget _buildCopiedToast() {
    return Align(
      alignment: Alignment.bottomCenter,
      child: Visibility(
        visible: showTempAlert,
        child: Padding(
          padding: const EdgeInsets.only(bottom: 40),
          child: Container(
            padding:
            const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.75),
              borderRadius: BorderRadius.circular(30),
            ),
            child: Text(
              "copied_".tr(),
              style: const TextStyle(
                color: Colors.white,
                fontSize: 12.5,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget oldBody() {
    Size size = MediaQuery.of(context).size;
    bool isDark = QuickHelp.isDarkMode(context);
    var coinsNumbers = [
      widget.currentUser!.getCredits,
      widget.currentUser!.getPCoins,
      widget.currentUser!.getDiamonds,
    ];

    var numbers = [
      widget.currentUser!.getFollowing!.length,
      widget.currentUser!.getFollowers!.length,
      widget.currentUser!.getCloseFriends!.length,
      widget.currentUser!.getVisitors!.length,
    ];

    var numbersCaptionsScreens = [
      FollowersScreen(
        currentUser: widget.currentUser,
        isFollowers: false,
      ),
      FollowersScreen(
        currentUser: widget.currentUser,
        isFollowers: true,
      ),
      CloseFriendsScreen(
        currentUser: widget.currentUser,
      ),
      VisitScreen(
        currentUser: widget.currentUser,
      ),
    ];

    var coinsAndPointsScreen = [
      CoinsAndPointsScreen(
        currentUser: widget.currentUser,
        initialIndex: 0,
      ),
      CoinsAndPointsScreen(
        currentUser: widget.currentUser,
        initialIndex: 1,
      ),
      PointsScreen(
        currentUser: widget.currentUser,
      ),
    ];

    var coinsAndPointsScreenOperation = [
      RefillCoinsScreen(
        currentUser: widget.currentUser,
      ),
      RewardScreen(
        currentUser: widget.currentUser,
      ),
      WithDrawScreen(
        currentUser: widget.currentUser,
      ),
    ];

    return Scaffold(
      backgroundColor: isDark ? kContentDarkShadow : kGrayWhite,
      body: Stack(
        alignment: AlignmentDirectional.center,
        children: [
          NestedScrollView(
            headerSliverBuilder:
                (BuildContext context, bool innerBoxIsScrolled) {
              return [
                SliverOverlapAbsorber(
                  handle:
                  NestedScrollView.sliverOverlapAbsorberHandleFor(context),
                  sliver: SliverAppBar(
                    centerTitle: true,
                    automaticallyImplyLeading: false,
                    title: Visibility(
                      visible: innerBoxIsScrolled,
                      child: TextWithTap(
                        widget.currentUser!.getFullName!,
                      ),
                    ),
                    backgroundColor:
                    isDark ? kContentColorLightTheme : kGrayWhite,
                    floating: false,
                    primary: true,
                    pinned: true,
                    snap: false,
                    elevation: 0,
                    stretch: true,
                    expandedHeight: size.width / 3,
                    flexibleSpace: FlexibleSpaceBar(
                      centerTitle: true,
                      collapseMode: CollapseMode.parallax,
                      background: Padding(
                        padding: EdgeInsets.only(
                            left: 20, right: 20, top: size.width / 7),
                        child: header(),
                      ),
                    ),
                  ),
                ),
              ];
            },
            body: Builder(builder: (BuildContext context) {
              return CustomScrollView(
                slivers: [
                  SliverOverlapInjector(
                    // This is the flip side of the SliverOverlapAbsorber above.
                    handle: NestedScrollView.sliverOverlapAbsorberHandleFor(
                        context),
                  ),
                  SliverToBoxAdapter(
                    child: SizedBox(
                      width: size.width,
                      height: size.height,
                      child: ListView(
                        padding: EdgeInsets.zero,
                        physics: NeverScrollableScrollPhysics(),
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(
                              left: 15,
                              right: 15,
                            ),
                            child: Column(
                              children: [
                                const SizedBox(
                                  height: 10,
                                ),
                                Row(
                                  mainAxisAlignment:
                                  MainAxisAlignment.spaceAround,
                                  children: List.generate(
                                    numbersCaptions.length,
                                        (index) => captionAndNumber(
                                      caption: numbersCaptions[index],
                                      screenToGo: numbersCaptionsScreens[index],
                                      number: numbers[index],
                                      visitor: index == 3 ? true : false,
                                    ),
                                  ),
                                ),
                                ContainerCorner(
                                  imageDecoration: "assets/images/vip_bar.png",
                                  height: 40,
                                  fit: BoxFit.fill,
                                  radiusTopRight: 10,
                                  radiusTopLeft: 10,
                                  marginTop: 20,
                                  borderWidth: 0,
                                  onTap: () {
                                    QuickHelp.goToNavigatorScreen(
                                        context,
                                        GuardianAndVipStoreScreen(
                                          currentUser: widget.currentUser,
                                        ));
                                  },
                                  child: Row(
                                    mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                    children: [
                                      Padding(
                                        padding: const EdgeInsets.all(5.0),
                                        child: Image.asset(
                                          "assets/images/VIP.png",
                                          fit: BoxFit.fitHeight,
                                        ),
                                      ),
                                      Row(
                                        children: [
                                          TextWithTap(
                                            "tab_profile.noble_privileges".tr(),
                                            fontSize: size.width / 40,
                                            color: kRoseVipClair,
                                          ),
                                          ContainerCorner(
                                            borderRadius: 50,
                                            marginRight: 15,
                                            marginLeft: 10,
                                            marginTop: 10,
                                            marginBottom: 10,
                                            colors: [kRoseVip, kRoseVipClair],
                                            child: Center(
                                              child: TextWithTap(
                                                "tab_profile.open_".tr(),
                                                fontSize: size.width / 40,
                                                marginRight: 15,
                                                marginLeft: 15,
                                                color: kColdVip,
                                                fontWeight: FontWeight.w600,
                                              ),
                                            ),
                                          ),
                                        ],
                                      )
                                    ],
                                  ),
                                ),
                                ContainerCorner(
                                  color: isDark
                                      ? kContentColorLightTheme
                                      : Colors.white,
                                  radiusBottomRight: 10,
                                  radiusBottomLeft: 10,
                                  child: Row(
                                    mainAxisAlignment:
                                    MainAxisAlignment.spaceAround,
                                    children: List.generate(
                                      coinsCaption.length,
                                          (index) => coinsAndPoints(
                                        caption: coinsCaption[index],
                                        number: coinsNumbers[index]!,
                                        imageUrl: coinsImageUrls[index],
                                        bgColor:
                                        coinsActionsButtonsBgColors[index],
                                        actionText: coinsActionsTexts[index],
                                        screenToGo: coinsAndPointsScreen[index],
                                        screenOperation:
                                        coinsAndPointsScreenOperation[
                                        index],
                                      ),
                                    ),
                                  ),
                                ),
                                ContainerCorner(
                                  color: isDark
                                      ? kContentColorLightTheme
                                      : Colors.white,
                                  borderRadius: 10,
                                  width: size.width,
                                  height: 200,
                                  marginTop: 10,
                                  child: GridView.count(
                                    crossAxisCount: 4,
                                    physics: NeverScrollableScrollPhysics(),
                                    children: List.generate(
                                      firstOptionsCaption.length,
                                          (index) {
                                        return options(
                                          caption: firstOptionsCaption[index],
                                          screenTogo:
                                          firstOptionsScreens[index],
                                          iconURL: firstOptionsIcons[index],
                                          isAgency: false,
                                          index: index,
                                        );
                                      },
                                    ),
                                  ),
                                ),
                                sliders(),
                                Visibility(
                                  visible: widget.currentUser!.getAgencyRole ==
                                      UserModel.agencyAgentRole,
                                  child: ContainerCorner(
                                    color: isDark
                                        ? kContentColorLightTheme
                                        : Colors.white,
                                    borderRadius: 10,
                                    width: size.width,
                                    height: 90,
                                    marginTop: 10,
                                    child: GridView.count(
                                      crossAxisCount: 4,
                                      physics: NeverScrollableScrollPhysics(),
                                      children: List.generate(
                                        agentOptionsCaption.length,
                                            (index) {
                                          return options(
                                            caption: agentOptionsCaption[index],
                                            screenTogo:
                                            agentOptionsScreens[index],
                                            iconURL: agentOptionsIcons[index],
                                            isAgency: true,
                                            index: index,
                                          );
                                        },
                                      ),
                                    ),
                                  ),
                                ),
                                ContainerCorner(
                                  color: isDark
                                      ? kContentColorLightTheme
                                      : Colors.white,
                                  borderRadius: 10,
                                  width: size.width,
                                  height: 200,
                                  marginTop: 10,
                                  child: GridView.count(
                                    crossAxisCount: 4,
                                    physics: NeverScrollableScrollPhysics(),
                                    children: List.generate(
                                      secondOptionsCaption.length,
                                          (index) {
                                        return secondOptions(
                                          caption: secondOptionsCaption[index],
                                          screenTogo:
                                          secondOptionsScreens[index],
                                          iconURL:
                                          secondOptionsLightIcons[index],
                                        );
                                      },
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                ],
              );
            }),
          ),
          Visibility(
            visible: showTempAlert,
            child: ContainerCorner(
              color: Colors.black.withOpacity(0.5),
              height: 50,
              marginRight: 50,
              marginLeft: 50,
              borderRadius: 50,
              width: size.width / 2,
              shadowColor: kGrayColor,
              shadowColorOpacity: 0.3,
              child: TextWithTap(
                "copied_".tr(),
                color: Colors.white,
                marginBottom: 5,
                marginTop: 5,
                marginLeft: 20,
                marginRight: 20,
                fontSize: 12,
                fontWeight: FontWeight.w700,
                alignment: Alignment.center,
                textAlign: TextAlign.center,
              ),
            ),
          ),
        ],
      ),
    );
  }

  String vipIconUrl() {
    if (widget.currentUser!.isDiamondVip!) {
      return "assets/images/icon_vip_3.webp";
    } else if (widget.currentUser!.isSuperVip!) {
      return "assets/images/icon_vip_2.webp";
    } else if (widget.currentUser!.isNormalVip!) {
      return "assets/images/icon_vip_1.webp";
    } else {
      return "assets/images/icon_vip_0.png";
    }
  }

  Widget vipIconType() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 5),
      child: GestureDetector(
        onTap: () {
          QuickHelp.goToNavigatorScreen(
              context,
              GuardianAndVipStoreScreen(
                currentUser: widget.currentUser,
              ));
        },
        child: Image.asset(
          vipIconUrl(),
          height: 15,
        ),
      ),
    );
  }

  Widget options({
    required String caption,
    required String iconURL,
    required Widget screenTogo,
    double? width,
    double? height,
    required bool isAgency,
    required int index,
  }) {
    Size size = MediaQuery.of(context).size;
    bool isDark = QuickHelp.isDarkMode(context);
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: () async {
          UserModel? user;
          if (isAgency && index == 3) {
            if (agencyGroup != null) {
              QuickHelp.goToNavigatorScreenForResult(context, screenTogo);
            } else {
              QuickHelp.showLoadingDialog(context);
              QueryBuilder<MessageGroupModel> queryBuilder =
              QueryBuilder<MessageGroupModel>(MessageGroupModel());

              queryBuilder.whereEqualTo(
                  MessageGroupModel.keyCreatorID, widget.currentUser!.objectId);
              queryBuilder.whereEqualTo(MessageGroupModel.keyGroupType,
                  MessageGroupModel.keyAgencyGroupType);
              queryBuilder.includeObject([
                MessageGroupModel.keyCreator,
              ]);

              ParseResponse response = await queryBuilder.query();

              if (response.success && response.result != null) {
                QuickHelp.hideLoadingDialog(context);
                agencyGroup = response.results!.first as MessageGroupModel;
                QuickHelp.goToNavigatorScreenForResult(
                  context,
                  OfficialServicesScreen(
                    currentUser: widget.currentUser,
                    groupModel: agencyGroup,
                  ),
                );
              } else {
                QuickHelp.hideLoadingDialog(context);
                QuickHelp.goToNavigatorScreenForResult(
                  context,
                  AgencyGroupCreationScreen(
                    currentUser: widget.currentUser,
                  ),
                );
              }
            }
          } else {
            user = await QuickHelp.goToNavigatorScreenForResult(
                context, screenTogo);
          }
          if (user != null) {
            setState(() {
              widget.currentUser = user;
            });
          }
        },
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 2),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Image.asset(
                iconURL,
                width: width ?? size.width / 10,
                height: height ?? size.width / 10,
              ),
              const SizedBox(height: 6),
              Text(
                caption,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: size.width / 40,
                  fontWeight: FontWeight.w500,
                  color: isDark ? Colors.white70 : const Color(0xFF3A3A44),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget secondOptions({
    required String caption,
    required String iconURL,
    Widget? screenTogo,
  }) {
    Size size = MediaQuery.of(context).size;
    bool isDark = QuickHelp.isDarkMode(context);
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: () async {
          if (screenTogo != null) {
            UserModel? user = await QuickHelp.goToNavigatorScreenForResult(
                context, screenTogo);
            if (user != null) {
              setState(() {
                widget.currentUser = user;
              });
            }
          } else {
            goToFacebookPage();
          }
        },
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 2),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Image.asset(
                iconURL,
                width: size.width / 14,
                height: size.width / 14,
              ),
              const SizedBox(height: 8),
              Text(
                caption,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: size.width / 38,
                  fontWeight: FontWeight.w500,
                  color: isDark ? Colors.white70 : const Color(0xFF3A3A44),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget sliders() {
    Size size = MediaQuery.of(context).size;
    return ContainerCorner(
      marginTop: 10,
      child: CarouselView(
        itemExtent: double.infinity,
        controller: _controller,
        children: List.generate(slideBanner.length, (index){
          return ContainerCorner(
            width: size.width,
            borderRadius: 8,
            child: Image.asset(
              slideBanner[index],
            ),
          );
        }),
      ),
    );
  }

  Widget coinsAndPoints(
      {required String caption,
        required int number,
        required String imageUrl,
        required Color bgColor,
        required String actionText,
        required Widget screenToGo,
        required Widget screenOperation}) {
    Size size = MediaQuery.of(context).size;
    return ContainerCorner(
      marginTop: 15,
      marginBottom: 15,
      onTap: () {
        QuickHelp.goToNavigatorScreen(context, screenToGo);
      },
      child: Column(
        children: [
          TextWithTap(
            QuickHelp.checkFundsWithString(amount: number.toString()),
            fontWeight: FontWeight.w600,
            marginBottom: 10,
          ),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Image.asset(
                imageUrl,
                width: size.width / 30,
                height: size.width / 30,
                //color: kTra,
              ),
              TextWithTap(
                caption,
                color: kGrayColor,
                fontSize: size.width / 34,
                marginLeft: 2,
              ),
            ],
          ),
          ContainerCorner(
            borderWidth: 0,
            borderRadius: 50,
            marginTop: 10,
            color: bgColor.withOpacity(0.2),
            onTap: () async {
              UserModel? user = await QuickHelp.goToNavigatorScreenForResult(
                context,
                screenOperation,
              );
              if (user != null) {
                widget.currentUser = user;
                setState(() {});
              }
            },
            child: Padding(
              padding:
              const EdgeInsets.only(left: 10, right: 10, top: 4, bottom: 6),
              child: AutoSizeText(
                actionText,
                maxFontSize: 14.0,
                minFontSize: 5.0,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w900,
                  color: bgColor,
                ),
                maxLines: 1,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget captionAndNumber({
    required String caption,
    required int number,
    bool? visitor,
    required Widget screenToGo,
  }) {
    bool isDark = QuickHelp.isDarkMode(context);
    bool isVisitor = visitor ?? false;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () => QuickHelp.goToNavigatorScreen(context, screenToGo),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Stack(
                alignment: AlignmentDirectional.center,
                clipBehavior: Clip.none,
                children: [
                  Text(
                    number.toString(),
                    style: TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w800,
                      color: isDark ? Colors.white : const Color(0xFF13131A),
                    ),
                  ),
                  if (isVisitor)
                    Positioned(
                      top: -2,
                      right: -8,
                      child: Container(
                        height: 7,
                        width: 7,
                        decoration: const BoxDecoration(
                          color: Colors.red,
                          shape: BoxShape.circle,
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                caption,
                style: const TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w500,
                  color: kGrayColor,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget header() {
    Size size = MediaQuery.of(context).size;
    return ContainerCorner(
      marginBottom: 25,
      onTap: () => QuickHelp.goToNavigatorScreen(
        context,
        ProfileScreen(
          currentUser: widget.currentUser,
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              QuickActions.avatarWidget(widget.currentUser!,
                  width: size.width / 6, height: size.width / 6),
              Padding(
                padding: const EdgeInsets.only(left: 10),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        TextWithTap(
                          widget.currentUser!.getFullName!,
                          fontSize: size.width / 23,
                          fontWeight: FontWeight.w600,
                          marginBottom: 4,
                          marginRight: 4,
                        ),
                        vipIconType(),
                      ],
                    ),
                    Row(
                      children: [
                        QuickActions.getGender(
                          currentUser: widget.currentUser!,
                          context: context,
                        ),
                        const SizedBox(
                          width: 5,
                        ),
                        QuickActions.giftReceivedLevel(
                          receivedGifts: widget.currentUser!.getDiamondsTotal!,
                          width: 35,
                        ),
                        const SizedBox(
                          width: 5,
                        ),
                        QuickActions.wealthLevel(
                          credit: widget.currentUser!.getCreditsSent!,
                          width: 35,
                        ),
                      ],
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        TextWithTap(
                          "tab_profile.id_".tr(),
                          fontSize: size.width / 33,
                          fontWeight: FontWeight.w900,
                        ),
                        TextWithTap(
                          widget.currentUser!.getUid!.toString(),
                          fontSize: size.width / 33,
                          marginLeft: 3,
                          marginRight: 3,
                        ),
                        GestureDetector(
                          onTap: () {
                            QuickHelp.copyText(
                                textToCopy: "${widget.currentUser!.getUid!}");
                            showTemporaryAlert();
                          },
                          child: Icon(
                            Icons.copy,
                            color: kGrayColor,
                            size: 20,
                          ),
                        )
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          Icon(
            Icons.arrow_forward_ios,
            color: kGrayColor,
            size: size.width / 30,
          ),
        ],
      ),
    );
  }
}
