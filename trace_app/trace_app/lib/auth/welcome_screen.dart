import 'dart:async';
import 'dart:ui';

import 'package:flutter_svg/svg.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:trace/app/config.dart';
import 'package:trace/app/setup.dart';
import 'package:trace/auth/phone_login_screen.dart';
import 'package:trace/auth/social_login.dart';
import 'package:trace/models/UserModel.dart';
import 'package:trace/helpers/quick_help.dart';
import 'package:trace/ui/container_with_corner.dart';
import 'package:trace/utils/colors.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:parse_server_sdk_flutter/parse_server_sdk_flutter.dart';
import 'package:video_player/video_player.dart';

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({Key? key}) : super(key: key);

  static const String route = '/welcome';

  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  GoogleSignIn _googleSignIn = GoogleSignIn(scopes: ['email', 'profile']);

  bool hasError = false;
  late VideoPlayerController videoController;

  late SharedPreferences preferences;

  bool agreeWithTerms = false;
  bool showAgreeAlert = false;

  // Logo ve alt bölümün açılışta yumuşakça belirmesi için.
  bool _entered = false;

  showAgreeWithTermsAlert() {
    setState(() {
      showAgreeAlert = true;
    });
    hideAgreeWithTermsAlert();
  }

  hideAgreeWithTermsAlert() {
    Future.delayed(const Duration(seconds: 1), () {
      setState(() {
        showAgreeAlert = false;
      });
    });
  }

  @override
  void initState() {
    initSharedPref();
    videoController = VideoPlayerController.asset("assets/video/welcome_flash_bg.mp4");

    videoController.addListener(() {
      setState(() {});
    });
    videoController.setLooping(true);
    videoController.initialize().then((_) => setState(() {}));
    videoController.play();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        setState(() {
          _entered = true;
        });
      }
    });

    super.initState();
  }

  @override
  void dispose() {
    videoController.dispose();
    super.dispose();
  }

  initSharedPref() async {
    preferences = await SharedPreferences.getInstance();
  }

  Future<void> googleLogin() async {
    try {
      GoogleSignInAccount? account = await _googleSignIn.signIn();
      GoogleSignInAuthentication authentication = await account!.authentication;

      QuickHelp.showLoadingDialog(context);

      var allName = account.displayName!.split(" ");
      String firstName = allName[0];
      String secondName = allName.length >= 1 ? allName[1] : "";

      final ParseResponse response = await ParseUser.loginWith(
        'google',
        google(authentication.accessToken!, _googleSignIn.currentUser!.id,
            authentication.idToken!),
        email: account.email,
        username: firstName.toLowerCase() + secondName.toLowerCase(),
      );
      if (response.success) {
        UserModel? user = await ParseUser.currentUser();

        if (user != null) {
          if (user.getUid == null) {
            getGoogleUserDetails(user, account, authentication.idToken!);
          } else {
            SocialLogin.goHome(context, user);
          }
        } else {
          QuickHelp.hideLoadingDialog(context);
          QuickHelp.showAppNotificationAdvanced(
              context: context, title: "auth.gg_login_error".tr());
          await _googleSignIn.signOut();
        }
      } else {
        QuickHelp.hideLoadingDialog(context);
        QuickHelp.showAppNotificationAdvanced(
            context: context, title: response.error!.message);
        await _googleSignIn.signOut();
      }
    } catch (error, stackTrace) {
      // GEÇİCİ DEBUG: Gerçek hatayı ekranda göster
      debugPrint("GOOGLE SIGN IN ERROR: $error");
      debugPrint("STACK TRACE: $stackTrace");

      if (mounted) {
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: Text("Google Sign-In Hatası (DEBUG)"),
            content: SingleChildScrollView(
              child: SelectableText(
                "$error",
                style: TextStyle(fontSize: 12),
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: Text("Kapat"),
              ),
            ],
          ),
        );
      }

      await _googleSignIn.signOut();
    }
  }

  void getGoogleUserDetails(
      UserModel user, GoogleSignInAccount googleUser, String idToken) async {
    Map<String, dynamic>? idMap = QuickHelp.getInfoFromToken(idToken);

    String firstName = idMap!["given_name"];
    String lastName = idMap["family_name"];

    String username =
        lastName.replaceAll(" ", "") + firstName.replaceAll(" ", "");

    user.setFullName = googleUser.displayName!;
    user.setGoogleId = googleUser.id;
    user.setFirstName = firstName;
    user.setLastName = lastName;
    user.username = username.toLowerCase().trim();
    user.setEmail = googleUser.email;
    user.setEmailPublic = googleUser.email;
    user.setUid = QuickHelp.generateUId();
    user.setPopularity = 0;
    user.setUserRole = UserModel.roleUser;
    user.setPrefMinAge = Setup.minimumAgeToRegister;
    user.setPrefMaxAge = Setup.maximumAgeToRegister;
    user.setLocationTypeNearBy = true;
    user.addCredit = Setup.welcomeCredit;
    user.setBio = Setup.bio;
    user.setHasPassword = false;
    ParseResponse response = await user.save();

    if (response.success) {
      SocialLogin.getPhotoFromUrl(context, user, googleUser.photoUrl!);
    } else {
      QuickHelp.hideLoadingDialog(context);
      QuickHelp.showErrorResult(context, response.error!.code);
    }
  }

  // Reduce-motion açıksa animasyonları anında bitir.
  Duration _motionDuration(Duration base) {
    return MediaQuery.of(context).disableAnimations ? Duration.zero : base;
  }

  @override
  Widget build(BuildContext context) {
    QuickHelp.setWebPageTitle(context,
        "page_title.welcome_title".tr(namedArgs: {"app_name": Config.appName}));
    Size size = MediaQuery.of(context).size;

    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        backgroundColor: Colors.black,
        resizeToAvoidBottomInset: false,
        body: Stack(
          alignment: AlignmentDirectional.center,
          children: [
            ContainerCorner(
              width: size.width,
              height: size.height,
              borderWidth: 0,
              child: VideoPlayer(videoController),
            ),
            _buildScrim(size),
            SafeArea(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _buildLogo(size),
                  _buildBottomSection(),
                ],
              ),
            ),
            _buildAgreeAlert(),
          ],
        ),
      ),
    );
  }

  // Video üstüne, üstte açık altta koyu sinematik bir gradyan.
  Widget _buildScrim(Size size) {
    return IgnorePointer(
      child: Container(
        width: size.width,
        height: size.height,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            stops: const [0.0, 0.32, 0.6, 1.0],
            colors: [
              Colors.black.withOpacity(0.55),
              Colors.black.withOpacity(0.22),
              Colors.black.withOpacity(0.45),
              Colors.black.withOpacity(0.92),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLogo(Size size) {
    return Padding(
      padding: const EdgeInsets.only(top: 24),
      child: AnimatedSlide(
        duration: _motionDuration(const Duration(milliseconds: 700)),
        curve: Curves.easeOutCubic,
        offset: _entered ? Offset.zero : const Offset(0, 0.08),
        child: AnimatedOpacity(
          duration: _motionDuration(const Duration(milliseconds: 700)),
          curve: Curves.easeOut,
          opacity: _entered ? 1.0 : 0.0,
          child: Image.asset(
            "assets/images/ic_logo_legend.png",
            height: size.width / 2.4,
            width: size.width / 2.4,
          ),
        ),
      ),
    );
  }

  Widget _buildBottomSection() {
    return AnimatedSlide(
      duration: _motionDuration(const Duration(milliseconds: 800)),
      curve: Curves.easeOutCubic,
      offset: _entered ? Offset.zero : const Offset(0, 0.05),
      child: AnimatedOpacity(
        duration: _motionDuration(const Duration(milliseconds: 800)),
        curve: Curves.easeOut,
        opacity: _entered ? 1.0 : 0.0,
        child: Padding(
          padding: const EdgeInsets.only(bottom: 6),
          child: Column(
            children: [
              _buildSocialButton(
                iconAsset: "assets/svg/ic_google_logo.svg",
                label: "login_screen.connect_google".tr(),
                textColor: Colors.black87,
                shadowColor: kPrimaryColor,
                onTap: () {
                  if (agreeWithTerms) {
                    googleLogin();
                  } else {
                    showAgreeWithTermsAlert();
                  }
                },
              ),
              Visibility(
                visible: QuickHelp.isAndroidLogin(),
                child: Column(
                  children: [
                    const SizedBox(height: 12),
                    _buildSocialButton(
                      iconAsset: "assets/svg/ic_apple_logo.svg",
                      label: "login_screen.sign_apple".tr(),
                      textColor: Colors.black,
                      shadowColor: Colors.black,
                      onTap: () {
                        if (agreeWithTerms) {
                          SocialLogin.loginApple(context, preferences);
                        } else {
                          showAgreeWithTermsAlert();
                        }
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 22),
              _buildDividerWithText("login_screen.more_methods".tr()),
              const SizedBox(height: 16),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Visibility(
                    visible: false,
                    child: Padding(
                      padding: const EdgeInsets.only(right: 18),
                      child: _buildGlassIconButton(
                        iconAsset: "assets/svg/ic_facebook_logo.svg",
                        onTap: () {
                          if (agreeWithTerms) {
                            SocialLogin.loginFacebook(context);
                          } else {
                            showAgreeWithTermsAlert();
                          }
                        },
                      ),
                    ),
                  ),
                  _buildGlassIconButton(
                    iconAsset: "assets/svg/ic_phone_login.svg",
                    onTap: () {
                      if (agreeWithTerms) {
                        QuickHelp.goToNavigatorScreen(context, PhoneLoginScreen());
                      } else {
                        showAgreeWithTermsAlert();
                      }
                    },
                  ),
                ],
              ),
              const SizedBox(height: 24),
              _buildAgreeCheckbox(),
              const SizedBox(height: 8),
              _buildTermsText(),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSocialButton({
    required String iconAsset,
    required String label,
    required Color textColor,
    required Color shadowColor,
    required VoidCallback onTap,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(30),
          onTap: onTap,
          child: Container(
            height: 54,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(30),
              boxShadow: [
                BoxShadow(
                  color: shadowColor.withOpacity(0.32),
                  blurRadius: 22,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SvgPicture.asset(iconAsset, height: 22, width: 22),
                const SizedBox(width: 12),
                Text(
                  label,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.2,
                    color: textColor,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDividerWithText(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 48),
      child: Row(
        children: [
          Expanded(
            child: Divider(color: Colors.white.withOpacity(0.28), thickness: 0.6),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Text(
              text,
              style: const TextStyle(
                fontSize: 9,
                color: kGrayColor,
                letterSpacing: 0.6,
              ),
            ),
          ),
          Expanded(
            child: Divider(color: Colors.white.withOpacity(0.28), thickness: 0.6),
          ),
        ],
      ),
    );
  }

  Widget _buildGlassIconButton({
    required String iconAsset,
    required VoidCallback onTap,
  }) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(50),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 14, sigmaY: 14),
        child: Material(
          shape: const CircleBorder(
            side: BorderSide(color: Colors.white24, width: 1),
          ),
          color: Colors.white.withOpacity(0.14),
          child: InkWell(
            customBorder: const CircleBorder(),
            onTap: onTap,
            child: SizedBox(
              height: 46,
              width: 46,
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: SvgPicture.asset(iconAsset),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAgreeCheckbox() {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(20),
        onTap: () {
          setState(() {
            agreeWithTerms = !agreeWithTerms;
          });
        },
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 6),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              AnimatedContainer(
                duration: _motionDuration(const Duration(milliseconds: 200)),
                height: 16,
                width: 16,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: agreeWithTerms ? kPrimaryColor : Colors.transparent,
                  border: Border.all(
                    color: agreeWithTerms ? kPrimaryColor : Colors.white70,
                    width: 1.4,
                  ),
                ),
                child: agreeWithTerms
                    ? const Icon(Icons.check, size: 11, color: Colors.white)
                    : null,
              ),
              const SizedBox(width: 8),
              Text(
                "login_screen.by_using".tr(namedArgs: {"app_name": Config.appName}),
                style: const TextStyle(color: Colors.white, fontSize: 11),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTermsText() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: RichText(
        textAlign: TextAlign.center,
        text: TextSpan(
          style: const TextStyle(fontSize: 11, height: 1.5),
          children: [
            TextSpan(
              style: TextStyle(
                fontSize: 11,
                color: kSecondaryColor,
                decoration: TextDecoration.underline,
                decorationColor: kSecondaryColor.withOpacity(0.6),
                fontWeight: FontWeight.w600,
              ),
              text: "login_screen.terms_of_service".tr(),
              recognizer: TapGestureRecognizer()
                ..onTap = () {
                  if (QuickHelp.isMobile()) {
                    QuickHelp.goToWebPage(context,
                        pageType: QuickHelp.pageTypeTerms);
                  } else {
                    QuickHelp.launchInWebViewWithJavaScript(Config.termsOfUseUrl);
                  }
                },
            ),
            TextSpan(
              style: const TextStyle(
                color: Colors.white70,
                fontSize: 11,
                fontWeight: FontWeight.normal,
              ),
              text: "login_screen.and_".tr().toLowerCase(),
            ),
            TextSpan(
              style: TextStyle(
                fontSize: 11,
                color: kSecondaryColor,
                decoration: TextDecoration.underline,
                decorationColor: kSecondaryColor.withOpacity(0.6),
                fontWeight: FontWeight.w600,
              ),
              text: "login_screen.privacy_".tr(),
              recognizer: TapGestureRecognizer()
                ..onTap = () {
                  if (QuickHelp.isMobile()) {
                    QuickHelp.goToWebPage(context,
                        pageType: QuickHelp.pageTypePrivacy);
                  } else {
                    QuickHelp.launchInWebViewWithJavaScript(Config.privacyPolicyUrl);
                  }
                },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAgreeAlert() {
    return IgnorePointer(
      ignoring: !showAgreeAlert,
      child: AnimatedOpacity(
        duration: _motionDuration(const Duration(milliseconds: 250)),
        opacity: showAgreeAlert ? 1.0 : 0.0,
        child: AnimatedScale(
          duration: _motionDuration(const Duration(milliseconds: 250)),
          curve: Curves.easeOut,
          scale: showAgreeAlert ? 1.0 : 0.9,
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 46),
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
            decoration: BoxDecoration(
              color: kContentDarkShadow.withOpacity(0.94),
              borderRadius: BorderRadius.circular(18),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.35),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.info_outline, color: kGoldenColor, size: 18),
                const SizedBox(width: 10),
                Flexible(
                  child: Text(
                    "login_screen.please_tick_option".tr(),
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: Colors.white, fontSize: 12.5),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
