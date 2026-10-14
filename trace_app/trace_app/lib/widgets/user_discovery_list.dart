import 'package:flutter/material.dart';
import 'package:parse_server_sdk_flutter/parse_server_sdk_flutter.dart';
import 'package:trace/helpers/quick_actions.dart';
import 'package:trace/helpers/quick_help.dart';
import 'package:trace/home/message/message_screen.dart';
import 'package:trace/home/profile/user_profile_screen.dart';
import 'package:trace/models/UserModel.dart';
import 'package:trace/utils/colors.dart';

/// Ana sayfadaki kullanıcı keşfet listesi: son aktif/yeni kullanıcıları
/// avatar + isim + rozet + yaş + durum satırı + tek dokunuş "Hi" butonuyla
/// gösterir (gönderi akışının yerini alır).
class UserDiscoveryList extends StatefulWidget {
  final UserModel currentUser;

  const UserDiscoveryList({Key? key, required this.currentUser})
      : super(key: key);

  @override
  State<UserDiscoveryList> createState() => _UserDiscoveryListState();
}

class _UserDiscoveryListState extends State<UserDiscoveryList> {
  List<UserModel> _users = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    QueryBuilder<UserModel> query =
        QueryBuilder<UserModel>(UserModel.forQuery());

    query.whereNotEqualTo(UserModel.keyObjectId, widget.currentUser.objectId);
    query.whereNotEqualTo(UserModel.keyUserStatus, true);

    List<dynamic>? blockedIds = widget.currentUser.getBlockedUsersIDs;
    if (blockedIds != null && blockedIds.isNotEmpty) {
      query.whereNotContainedIn(
          UserModel.keyObjectId, blockedIds.cast<String>());
    }

    query.orderByDescending(UserModel.keyLastOnline);
    query.setLimit(40);

    ParseResponse response = await query.query();
    if (!mounted) return;

    if (response.success && response.results != null) {
      setState(() {
        _users = response.results!.cast<UserModel>();
        _loading = false;
      });
    } else {
      setState(() {
        _loading = false;
        _error = response.error?.message;
      });
    }
  }

  void _openProfile(UserModel user) {
    QuickHelp.goToNavigatorScreen(
      context,
      UserProfileScreen(currentUser: widget.currentUser, mUser: user),
    );
  }

  void _sendHi(UserModel user) {
    QuickHelp.goToNavigatorScreen(
      context,
      MessageScreen(
        currentUser: widget.currentUser,
        mUser: user,
        autoGreetingText: "Hi",
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Padding(
        padding: EdgeInsets.symmetric(vertical: 40),
        child: Center(child: CircularProgressIndicator.adaptive()),
      );
    }

    if (_users.isEmpty) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 40),
        child: Center(
          child: Text(
            _error ?? 'Gösterilecek kullanıcı yok',
            textAlign: TextAlign.center,
          ),
        ),
      );
    }

    return ListView.separated(
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      padding: const EdgeInsets.only(top: 4),
      itemCount: _users.length,
      separatorBuilder: (context, index) =>
          Divider(height: 1, color: Colors.grey.withOpacity(0.15)),
      itemBuilder: (context, index) {
        UserModel user = _users[index];
        bool isOnline = user.getUserStateInApp == UserModel.userOnline;
        String? statusLine = (user.getMoodTitle?.isNotEmpty == true)
            ? user.getMoodTitle
            : user.getBio;

        return InkWell(
          onTap: () => _openProfile(user),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Stack(
                  clipBehavior: Clip.none,
                  children: [
                    QuickActions.avatarBorder(
                      user,
                      width: 54,
                      height: 54,
                      borderWidth: 0,
                    ),
                    if (isOnline)
                      Positioned(
                        right: 2,
                        bottom: 2,
                        child: Container(
                          width: 12,
                          height: 12,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.green,
                            border: Border.all(color: Colors.white, width: 2),
                          ),
                        ),
                      ),
                  ],
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Row(
                        children: [
                          Flexible(
                            child: Text(
                              user.getFullName?.isNotEmpty == true
                                  ? user.getFullName!
                                  : (user.getUsername ?? ''),
                              style: const TextStyle(
                                fontWeight: FontWeight.w700,
                                fontSize: 15,
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          if (user.isPhotoVerified == true) ...[
                            const SizedBox(width: 4),
                            const Icon(Icons.verified,
                                color: kPrimaryColor, size: 15),
                          ],
                          if (user.getAge != null) ...[
                            const SizedBox(width: 6),
                            Text(
                              user.getAge.toString(),
                              style: TextStyle(
                                  color: Colors.grey[600], fontSize: 12),
                            ),
                          ],
                        ],
                      ),
                      const SizedBox(height: 3),
                      QuickHelp.usersMoreInfo(context, user),
                      if (statusLine != null && statusLine.isNotEmpty) ...[
                        const SizedBox(height: 3),
                        Text(
                          statusLine,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style:
                              TextStyle(color: Colors.grey[600], fontSize: 12),
                        ),
                      ],
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                GestureDetector(
                  onTap: () => _sendHi(user),
                  child: Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                    decoration: BoxDecoration(
                      color: kRedColor1,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.favorite, color: Colors.white, size: 13),
                        SizedBox(width: 4),
                        Text(
                          "Hi",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
