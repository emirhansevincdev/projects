import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:trace/helpers/quick_help.dart';
import 'package:trace/models/UserModel.dart';
import 'package:trace/ui/app_bar.dart';
import 'package:trace/ui/text_with_tap.dart';
import 'package:trace/utils/colors.dart';

// Placeholder "Aile" (Family) screen. Content (member list, invite flow,
// etc.) to be defined later.
class FamilyScreen extends StatefulWidget {
  UserModel? currentUser;

  FamilyScreen({this.currentUser, Key? key}) : super(key: key);

  static String route = "/profile/family";

  @override
  State<FamilyScreen> createState() => _FamilyScreenState();
}

class _FamilyScreenState extends State<FamilyScreen> {
  @override
  Widget build(BuildContext context) {
    return ToolBar(
      title: "profile_list_menu.family_".tr(),
      centerTitle: QuickHelp.isAndroidPlatform() ? false : true,
      leftButtonIcon: Icons.arrow_back_ios,
      onLeftButtonTap: () => QuickHelp.goBackToPreviousPage(context),
      child: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.diversity_3_rounded,
                size: 64,
                color: kGrayColor.withOpacity(0.5),
              ),
              const SizedBox(height: 16),
              TextWithTap(
                "profile_list_menu.family_coming_soon".tr(),
                textAlign: TextAlign.center,
                alignment: Alignment.center,
                color: kGrayColor,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
