import 'dart:async';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:parse_server_sdk_flutter/parse_server_sdk_flutter.dart';
import 'package:trace/helpers/quick_help.dart';
import 'package:trace/home/web/web_url_screen.dart';
import 'package:trace/models/OfficialAnnouncementModel.dart';
import 'package:trace/models/UserModel.dart';
import 'package:trace/utils/colors.dart';

/// Otomatik kayan banner/duyuru kutucukları. Admin panelindeki
/// "Official Announcement" verisiyle beslenir (görsel + başlık + link),
/// böylece mevcut duyuru sistemi hem bildirim listesinde hem burada görünür.
class PromoBannerCarousel extends StatefulWidget {
  final UserModel? currentUser;
  final double height;

  const PromoBannerCarousel({Key? key, this.currentUser, this.height = 130})
      : super(key: key);

  @override
  State<PromoBannerCarousel> createState() => _PromoBannerCarouselState();
}

class _PromoBannerCarouselState extends State<PromoBannerCarousel> {
  final PageController _controller = PageController();
  Timer? _timer;
  int _page = 0;
  List<OfficialAnnouncementModel> _banners = [];
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    _loadBanners();
  }

  @override
  void dispose() {
    _timer?.cancel();
    _controller.dispose();
    super.dispose();
  }

  Future<void> _loadBanners() async {
    QueryBuilder<OfficialAnnouncementModel> queryBuilder =
        QueryBuilder<OfficialAnnouncementModel>(OfficialAnnouncementModel());
    queryBuilder.orderByDescending(OfficialAnnouncementModel.keyCreatedAt);
    queryBuilder.whereValueExists(
        OfficialAnnouncementModel.keyPreviewImage, true);

    ParseResponse response = await queryBuilder.query();
    if (!mounted) return;

    if (response.success && response.results != null) {
      setState(() {
        _banners = response.results!.cast<OfficialAnnouncementModel>();
        _loaded = true;
      });
      _startAutoSlide();
    } else {
      setState(() => _loaded = true);
    }
  }

  void _startAutoSlide() {
    if (_banners.length < 2) return;
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 4), (_) {
      if (!mounted || !_controller.hasClients) return;
      _page = (_page + 1) % _banners.length;
      _controller.animateToPage(
        _page,
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeOut,
      );
    });
  }

  void _openBanner(OfficialAnnouncementModel banner) {
    if (widget.currentUser?.objectId != null) {
      banner.setViewedBy = [widget.currentUser!.objectId];
      banner.save();
    }
    QuickHelp.goToNavigatorScreen(
      context,
      WebViewScreen(
        pageType: 'announcement',
        receivedTitle: banner.getTitle,
        receivedURL: banner.getWebViewURL,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (!_loaded || _banners.isEmpty) return const SizedBox.shrink();

    return Column(
      children: [
        SizedBox(
          height: widget.height,
          child: PageView.builder(
            controller: _controller,
            itemCount: _banners.length,
            onPageChanged: (index) => setState(() => _page = index),
            itemBuilder: (context, index) {
              OfficialAnnouncementModel banner = _banners[index];
              return Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                child: GestureDetector(
                  onTap: () => _openBanner(banner),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(18),
                    child: banner.getPreviewImage?.url != null
                        ? CachedNetworkImage(
                            imageUrl: banner.getPreviewImage!.url!,
                            fit: BoxFit.cover,
                            width: double.infinity,
                            errorWidget: (context, url, error) => Container(
                              color: kPrimaryColor.withOpacity(0.15),
                            ),
                          )
                        : Container(color: kPrimaryColor.withOpacity(0.15)),
                  ),
                ),
              );
            },
          ),
        ),
        if (_banners.length > 1) ...[
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(_banners.length, (index) {
              bool isActive = index == _page;
              return AnimatedContainer(
                duration: const Duration(milliseconds: 250),
                margin: const EdgeInsets.symmetric(horizontal: 3),
                width: isActive ? 16 : 6,
                height: 6,
                decoration: BoxDecoration(
                  color:
                      isActive ? kPrimaryColor : kPrimaryColor.withOpacity(0.25),
                  borderRadius: BorderRadius.circular(3),
                ),
              );
            }),
          ),
        ],
      ],
    );
  }
}
