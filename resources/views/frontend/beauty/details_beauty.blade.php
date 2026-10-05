@extends('layouts.frontend')
@push('title', get_phrase('Beauty Listing Details'))
@push('meta')@endpush
@push('css')
    <link rel="stylesheet" href="{{ asset('assets/frontend/css/plyr.css') }}">
    <script src="{{ asset('assets/frontend/js/plyr.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('assets/frontend/css/venobox.min.css') }}">
    <script src="{{ asset('assets/frontend/js/venobox.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('assets/frontend/css/flatpickr.min.css') }}">
    <script src="{{ asset('assets/frontend/js/flatpickr.min.js') }}"></script>

    <style>
        .at-details-description ul, .at-details-description ol {
            list-style: revert;
            padding: 0 0 0 30px;
        }
    </style>
@endpush
@section('frontend_layout')
 
    <!-- Start Bread Crumb  -->
    <section class="mt-20px mb-20px">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb atn-breadcrumb">
                            <li class="breadcrumb-item atn-breadcrumb-item"><a href="{{ route('beauty.home') }}">{{ get_phrase('Home') }}</a></li>
                            <li class="breadcrumb-item atn-breadcrumb-item"><a href="{{route('listing.view', ['type' => 'beauty', 'view' => 'grid'])}}">{{ get_phrase('Beauty') }}</a></li>
                            <li class="breadcrumb-item atn-breadcrumb-item active" aria-current="page">{{ get_phrase('Beauty Details') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    <!-- End Bread Crumb  -->
    <!-- Start Top Title and Back -->
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="details-title-back1 d-flex align-items-start justify-content-between flex-wrap">
                        <div class="detailstop-title-location1">
                            <div class="detailstop-title1 d-flex align-items-center flex-wrap">
                                @php 
                                   $claimStatus = App\Models\ClaimedListing::where('listing_id', $listing->id)->where('listing_type', 'beauty')->first();  
                                @endphp
                                <h1 class="title">
                                    @if(isset($claimStatus) && $claimStatus->status == 1) 
                                    <span data-bs-toggle="tooltip" 
                                    data-bs-title=" {{ get_phrase('This listing is verified') }}">
                                    <svg fill="none" height="34" viewBox="0 0 24 24" width="34" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="paint0_linear_16_1334" gradientUnits="userSpaceOnUse" x1="12" x2="12" y1="-1.2" y2="25.2"><stop offset="0" stop-color="#ce9ffc"/><stop offset=".979167" stop-color="#7367f0"/></linearGradient><path d="m3.783 2.826 8.217-1.826 8.217 1.826c.2221.04936.4207.17297.563.3504.1424.17744.22.39812.22.6256v9.987c-.0001.9877-.244 1.9602-.7101 2.831s-1.14 1.6131-1.9619 2.161l-6.328 4.219-6.328-4.219c-.82173-.5478-1.49554-1.2899-1.96165-2.1605-.46611-.8707-.71011-1.8429-.71035-2.8305v-9.988c.00004-.22748.07764-.44816.21999-.6256.14235-.17743.34095-.30104.56301-.3504zm8.217 10.674 2.939 1.545-.561-3.272 2.377-2.318-3.286-.478-1.469-2.977-1.47 2.977-3.285.478 2.377 2.318-.56 3.272z" fill="url(#paint0_linear_16_1334)"/></svg>
                                    </span>
                                    @endif
                                     {{ $listing->title }} 
                                    
                                </h1>
                            </div>
                            <div class="location d-flex align-items-center">
                                <img src="{{ asset('assets/frontend/images/icons/location-gray2-16.svg') }}" alt="location">
                                <p class="name"> {{ $listing->address }} </p>
                            </div>
                            @php
                                $city_name = App\Models\City::where('id', $listing->city)->first()->name;
                                $country_name = App\Models\Country::where('id', $listing->country)->first()->name;
                            @endphp
                            <p class="name"> {{ $city_name . ', ' . $country_name }} </p>
                        </div>
                        <div class="detailstop-share-back d-flex align-items-center flex-wrap">
                            @php
                                $is_in_wishlist = check_wishlist_status($listing->id, $listing->type);
                            @endphp
                            <a href="javascript:;" data-bs-toggle="tooltip" data-bs-title="{{ $is_in_wishlist ? get_phrase('Remove from Wishlist') : get_phrase('Add to Wishlist') }}" class="save-share {{ $is_in_wishlist ? 'active' : '' }}" onclick="updateWishlist(this, '{{ $listing->id }}')">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21.6501C11.69 21.6501 11.39 21.6101 11.14 21.5201C7.32 20.2101 1.25 15.5601 1.25 8.6901C1.25 5.1901 4.08 2.3501 7.56 2.3501C9.25 2.3501 10.83 3.0101 12 4.1901C13.17 3.0101 14.75 2.3501 16.44 2.3501C19.92 2.3501 22.75 5.2001 22.75 8.6901C22.75 15.5701 16.68 20.2101 12.86 21.5201C12.61 21.6101 12.31 21.6501 12 21.6501ZM7.56 3.8501C4.91 3.8501 2.75 6.0201 2.75 8.6901C2.75 15.5201 9.32 19.3201 11.63 20.1101C11.81 20.1701 12.2 20.1701 12.38 20.1101C14.68 19.3201 21.26 15.5301 21.26 8.6901C21.26 6.0201 19.1 3.8501 16.45 3.8501C14.93 3.8501 13.52 4.5601 12.61 5.7901C12.33 6.1701 11.69 6.1701 11.41 5.7901C10.48 4.5501 9.08 3.8501 7.56 3.8501Z" fill="#7E7E89" />
                                </svg>
                            </a>
                             <!-- Share Button -->
                                            <div class="share-wrapper position-relative">
                                                <div class="save-share" >
                                                    <span class="icon-circle d-flex align-items-center justify-content-center h-100">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M18.7259 14.4443C18.0336 14.4448 17.3519 14.614 16.7395 14.9373C16.1271 15.2605 15.6025 15.728 15.2109 16.2995L9.25111 13.6056C9.67441 12.5823 9.67606 11.4329 9.25569 10.4084L15.2072 7.70071C15.7876 8.54103 16.6496 9.14527 17.6369 9.40383C18.6241 9.66239 19.6713 9.55815 20.5884 9.11001C21.5055 8.66187 22.2317 7.89952 22.6354 6.96124C23.0392 6.02296 23.0936 4.9709 22.7888 3.9959C22.4841 3.02089 21.8403 2.18752 20.9744 1.64695C20.1085 1.10638 19.0777 0.894424 18.069 1.04952C17.0603 1.20461 16.1406 1.71649 15.4766 2.4923C14.8126 3.26811 14.4484 4.25647 14.45 5.27809C14.4539 5.51989 14.4784 5.76092 14.5232 5.99855L8.19632 8.87673C7.58867 8.3068 6.82794 7.92697 6.00761 7.78391C5.18728 7.64084 4.34307 7.74078 3.5787 8.07144C2.81432 8.40211 2.16308 8.94909 1.70497 9.64519C1.24686 10.3413 1.00184 11.1562 1.00001 11.9898C0.998181 12.8234 1.23962 13.6394 1.69467 14.3375C2.14972 15.0356 2.79856 15.5854 3.56147 15.9195C4.32439 16.2535 5.16815 16.3571 5.9891 16.2177C6.81005 16.0782 7.57243 15.7017 8.18259 15.1345L14.526 18.0017C14.4819 18.2391 14.4577 18.4798 14.4536 18.7212C14.4535 19.5674 14.7039 20.3946 15.1734 21.0982C15.6429 21.8018 16.3103 22.3503 17.0911 22.6742C17.872 22.9981 18.7313 23.0829 19.5603 22.9178C20.3893 22.7528 21.1507 22.3454 21.7484 21.747C22.3461 21.1487 22.7531 20.3864 22.9179 19.5565C23.0828 18.7266 22.9981 17.8664 22.6745 17.0846C22.351 16.3029 21.8032 15.6348 21.1003 15.1648C20.3974 14.6949 19.5711 14.4441 18.7259 14.4443ZM18.7259 2.83346C19.2089 2.83328 19.6811 2.9765 20.0828 3.24501C20.4845 3.51352 20.7977 3.89526 20.9826 4.34194C21.1676 4.78862 21.2161 5.28018 21.122 5.75445C21.0278 6.22872 20.7953 6.66439 20.4539 7.00637C20.1124 7.34835 19.6773 7.58127 19.2036 7.67567C18.7298 7.77007 18.2388 7.72171 17.7925 7.53671C17.3463 7.35171 16.9648 7.03838 16.6965 6.63634C16.4281 6.23431 16.2849 5.76163 16.2849 5.27809C16.2854 4.63004 16.5427 4.00866 17.0003 3.55034C17.458 3.09201 18.0786 2.83419 18.7259 2.83346ZM5.29748 14.4443C4.81447 14.4445 4.34226 14.3012 3.94056 14.0327C3.53886 13.7642 3.22573 13.3825 3.04077 12.9358C2.8558 12.4891 2.80731 11.9976 2.90143 11.5233C2.99555 11.049 3.22805 10.6133 3.56953 10.2714C3.911 9.92939 4.34611 9.69647 4.81983 9.60207C5.29355 9.50767 5.78459 9.55603 6.23085 9.74103C6.67711 9.92603 7.05854 10.2394 7.32691 10.6414C7.59527 11.0434 7.73851 11.5161 7.73851 11.9997C7.73779 12.6476 7.4804 13.2689 7.02281 13.7271C6.56521 14.1854 5.94475 14.4433 5.29748 14.4443ZM18.7259 21.1658C18.2429 21.1658 17.7708 21.0225 17.3692 20.7539C16.9677 20.4852 16.6547 20.1034 16.4698 19.6567C16.285 19.21 16.2367 18.7185 16.3309 18.2443C16.4251 17.7701 16.6577 17.3345 16.9992 16.9926C17.3407 16.6507 17.7758 16.4179 18.2495 16.3236C18.7232 16.2292 19.2142 16.2777 19.6604 16.4627C20.1066 16.6477 20.488 16.961 20.7563 17.3631C21.0246 17.7651 21.1679 18.2377 21.1679 18.7212C21.1674 19.3694 20.9099 19.9909 20.4521 20.4493C19.9942 20.9076 19.3734 21.1654 18.7259 21.1658Z" fill="#7E7E89"></path>
                                                        </svg>
                                                    </span>
                                                    <!-- Social icons hover menu -->
                                                </div>
                                                @php
                                                    $shareUrl = urlencode(url()->current()); 
                                                    $shareTitle = urlencode($listing->slug);
                                                @endphp
                                                <div class="social-menu">
                                                       <a href="https://www.facebook.com/sharer/sharer.php?u={{ $shareUrl }}" 
                                                        class="social-icon fb" target="_blank" data-bs-toggle="tooltip" data-bs-title="{{get_phrase('Share on Facebook')}}" data-bs-placement="top">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                                            <path d="M20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 14.9912 3.65684 19.1283 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29063 9.93047 3.90625 12.2146 3.90625C13.3084 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1922C11.95 6.5625 11.5625 7.3334 11.5625 8.125V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3432 19.1283 20 14.9912 20 10Z" fill="#0D0E10"/>
                                                        </svg>
                                                    </a>

                                                    <a href="https://twitter.com/intent/tweet?&url={{ $shareUrl }}" 
                                                        target="_blank" class="social-icon x" data-bs-toggle="tooltip" data-bs-title="{{get_phrase('Share on X')}}" data-bs-placement="top">
                                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                                            <path d="M11.8616 8.46864L19.147 0H17.4206L11.0947 7.3532L6.04225 0H0.214844L7.85515 11.1193L0.214844 20H1.94134L8.62162 12.2348L13.9574 20H19.7848L11.8612 8.46864H11.8616Z" fill="#0D0E10"/>
                                                        </svg>
                                                    </a>

                                                    <a href="https://www.linkedin.com/shareArticle?mini=true&url={{ urlencode($shareUrl) }}&title={{ urlencode($shareTitle) }}" 
                                                        target="_blank" class="social-icon linkedin" data-bs-toggle="tooltip" data-bs-title="{{get_phrase('Share on LinkedIn')}}" data-bs-placement="top">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                                                            <path d="M19.4477 0H1.55056C0.693241 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.693241 20 1.55056 20H19.4477C20.305 20 21.0023 19.3516 21.0023 18.5586V1.44141C21.0023 0.644531 20.305 0 19.4477 0ZM6.23097 17.043H3.11343V7.49609H6.23097V17.043ZM4.6722 6.19531C3.67131 6.19531 2.86321 5.42578 2.86321 4.47656C2.86321 3.52734 3.67131 2.75781 4.6722 2.75781C5.66899 2.75781 6.47709 3.52734 6.47709 4.47656C6.47709 5.42188 5.66899 6.19531 4.6722 6.19531ZM17.8971 17.043H14.7837V12.4023C14.7837 11.2969 14.7632 9.87109 13.1634 9.87109C11.5431 9.87109 11.297 11.0781 11.297 12.3242V17.043H8.18763V7.49609H11.1739V8.80078H11.2149C11.6292 8.05078 12.6465 7.25781 14.1602 7.25781C17.3146 7.25781 17.8971 9.23438 17.8971 11.8047V17.043Z" fill="#0D0E10"/>
                                                        </svg>
                                                    </a>

                                                        <a href="javascript:void(0)" class="social-icon copy" data-bs-toggle="tooltip" data-bs-title="{{get_phrase('Copy Link')}}" data-bs-placement="top" id="shareButton">
                                                            <svg width="21" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M10.8799 14.12C10.6239 14.12 10.3682 14.022 10.1732 13.827C8.43116 12.084 8.22211 9.38399 9.67511 7.40799C9.77911 7.24399 9.95318 7.034 10.1722 6.814L13.532 3.453C14.47 2.516 15.7151 2 17.0391 2C18.3621 2 19.607 2.516 20.545 3.453C22.479 5.387 22.479 8.53401 20.545 10.467L18.7051 12.307C18.3141 12.698 17.6821 12.698 17.2911 12.307C16.9001 11.917 16.9001 11.284 17.2911 10.893L19.1312 9.05301C20.2842 7.89901 20.2842 6.021 19.1312 4.867C18.0122 3.749 16.0661 3.749 14.9461 4.867L11.587 8.22699C11.47 8.34399 11.3802 8.45201 11.3192 8.54501C10.4222 9.76801 10.548 11.375 11.587 12.413C11.978 12.804 11.978 13.437 11.587 13.827C11.392 14.022 11.1359 14.12 10.8799 14.12ZM10.4681 20.547L13.827 17.187C14.363 16.651 14.768 16.004 14.991 15.338C15.633 13.55 15.176 11.523 13.827 10.173C13.436 9.782 12.8041 9.782 12.4131 10.172C12.0221 10.562 12.0221 11.196 12.4131 11.586C13.2291 12.404 13.4961 13.582 13.1011 14.682C12.9691 15.077 12.7311 15.453 12.4131 15.772L9.05402 19.132C7.93502 20.251 5.98896 20.25 4.86896 19.132C3.71596 17.978 3.71596 16.1 4.86896 14.946L6.70904 13.106C7.10004 12.715 7.10004 12.082 6.70904 11.692C6.31805 11.301 5.68598 11.301 5.29498 11.692L3.45514 13.532C1.52114 15.466 1.52114 18.612 3.45514 20.546C4.39314 21.483 5.638 21.999 6.961 21.999C8.285 22 9.53008 21.484 10.4681 20.547Z" fill="#25314C"/>
                                                                </svg>
                                                        </a>
                                                </div>
                                            </div>
                            <a href="{{ route('listing.view', ['type' => 'beauty', 'view' => 'grid']) }}" class="back-btn1">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.9752 15.6834C7.81686 15.6834 7.65853 15.6251 7.53353 15.5001L2.4752 10.4418C2.23353 10.2001 2.23353 9.8001 2.4752 9.55843L7.53353 4.5001C7.7752 4.25843 8.1752 4.25843 8.41686 4.5001C8.65853 4.74176 8.65853 5.14176 8.41686 5.38343L3.8002 10.0001L8.41686 14.6168C8.65853 14.8584 8.65853 15.2584 8.41686 15.5001C8.3002 15.6251 8.13353 15.6834 7.9752 15.6834Z" fill="#7E7E89" />
                                    <path d="M17.0831 10.625H3.05811C2.71644 10.625 2.43311 10.3417 2.43311 10C2.43311 9.65833 2.71644 9.375 3.05811 9.375H17.0831C17.4248 9.375 17.7081 9.65833 17.7081 10C17.7081 10.3417 17.4248 10.625 17.0831 10.625Z" fill="#7E7E89" />
                                </svg>
                                <span>{{ get_phrase('Back to listing') }}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Top Title and Back -->

    <!-- Start Main Content Area -->
    <section>
        <div class="container">
            <div class="row row-28 mb-80px">
                <div class="col-xl-8 col-lg-7">
                    <!-- Banners -->
                    <div class="beauty-details-banners">
                        <div class="banner-top">
                            
                             @php
                                $images = !empty($listing->image) ? json_decode($listing->image, true) : [];
                            @endphp

                        @if (!empty($images) && count($images) > 0)
                            @foreach ($images as $key => $image)
                                @if ($key == 0)
                                    <img class="big-image-view" src="{{ get_all_image('listing-images/' . $image) }}" alt="">
                                @endif
                            @endforeach
                        @else
                            <img class="big-image-view" src="{{ asset('image/placeholder.png') }}" alt="">
                        @endif
                        </div>
                        <ul class="beauty-banner-list">
                            @foreach (json_decode($listing->image) as $key => $image)
                                  @if ($key > 3) @break @endif
                                 @if ($key <= 2)
                                    <li>
                                        <img class="small-image-view" src="{{ get_all_image('listing-images/' . $image) }}" alt="">
                                    </li>
                                @else
                                    <li class="last-child small-image-view">
                                        <img src="{{ get_all_image('listing-images/' . $image) }}" alt="">
                                        <a href="javascript:;" class="see-more" data-bs-toggle="modal" data-bs-target="#imageViewModal"> +{{ get_phrase('Show All') }}</a>
                                    </li>
                                @endif
                            @endforeach
                        </ul>
                    </div>

                    <!-- Description -->
                    <div class="at-details-description mb-50px">
                        <h4 class="title mb-16">{{ get_phrase('Description') }}</h4>
                        <div class="in-subtitle-2">{!! $listing->description !!}</div>
                    </div>

                     {{-- Shop Addon --}}
                     @if (addon_status('shop') == 1)
                        @php 
                        $shopItems = App\Models\Inventory::where('type', $listing->type)->where('listing_id', $listing->id)->where('availability', 1)->get();
                            $shopCategories = App\Models\InventoryCategory::where('type', $listing->type)->where('listing_id', $listing->id)->get();

                            @endphp
                        @if($shopItems && $shopItems->count() > 0)
                            @include('frontend.shop')
                        @endif
                     @endif
                    {{-- Shop Addon --}}
                    
                        {{-- Service Selling Addon --}}
                    @if (addon_status('service_selling') == 1)
                            @php 
                                $serviceSselling = App\Models\ServiceSelling::where('type', $listing->type)->where('listing_id', $listing->id)->where('status', 1)->get();
                                @endphp
                            @if($serviceSselling && $serviceSselling->count() > 0)
                                @include('frontend.service_selling.services')
                            @endif
                    @endif
                {{-- Service Selling Addon --}}

                     {{-- Calendly  Addon --}}
                        {{-- @if(addon_status('calendly') == 1) --}}
                            @include('frontend.calendly.list')
                        {{-- @endif --}}
                    {{-- Calendly  Addon --}}



                    @if ($listing->service)
                        <!-- Services -->
                        <div class="beauty-details-services mb-36">
                            <h4 class="in-title3-24px mb-20">{{ get_phrase('Services') }}</h4>
                            <div class="row row-28">
                                @foreach (json_decode($listing->service, true) ?? [] as $service)
                                    @php
                                        $amenities = App\Models\Amenities::where('id', $service)->first();
                                    @endphp
                                    <div class="col-xl-6 col-lg-12 col-md-6">
                                        <div class="beauty-details-service d-flex align-items-center justify-content-between flex-wrap">
                                            <div class="details">
                                                <p class="info">{{ $amenities->name }}</p>
                                                <p class="time">{{ $amenities->time }}</p>
                                                <p class="price">{{ get_phrase('from') . ' ' . currency($amenities->price) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @endif
                    <!-- Opening Time -->
                    @if ($listing->opening_time)
                        <!-- Opening Time -->
                        <div class="mb-36">
                            <h2 class="in-title3-24px mb-20">{{ get_phrase('Opening Time') }}</h2>
                            <ul class="opening-time-list">
                                @foreach (json_decode($listing->opening_time) as $key => $day)
                                    <li>
                                        <p class="day">{{ ucwords($key) }}</p>
                                        @if ($day->open === 'closed' && $day->close === 'closed')
                                            <p class="opening-time-close">{{ get_phrase('Closed') }}</p>
                                        @else
                                            <p class="time">{{ format_time($day->open) }} - {{ format_time($day->close) }}</p>
                                        @endif
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    <!-- Team Members -->
                    <div class=" mb-50px">
                        <h2 class="in-title3-24px mb-20">{{ get_phrase('Team Members') }}</h2>
                        <div class="beauty-team-members">
                            @php
                                $teamIds = json_decode($listing->team, true) ?? [];
                                $teams = App\Models\Amenities::where('type', 'beauty')->where('identifier', 'team')->whereIn('id', $teamIds)->get();
                            @endphp
                            @foreach ($teams as $team)
                                <div class="beauty-team-member">
                                    <div class="profile">
                                        <img src="{{ get_all_image('team/' . $team->image) }}" alt="">
                                    </div>
                                    <div class="ratings d-flex align-items-center">
                                        <p class="rating">{{ $team->rating }}</p>
                                        <img src="{{ asset('assets/frontend/images/icons/star-yellow2-20.svg') }}" alt="">
                                    </div>
                                    <h5 class="name">{{ $team->name }}</h5>
                                    <p class="role">{{ $team->designation }}</p>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    <!-- Video -->
                    <div class="realdetails-video-area mb-36">
                        <h2 class="in-title3-24px mb-20">{{ get_phrase('Video') }}</h2>
                        <div class="realdetails-video">
                            <div class="plyr__video-embed" id="player">
                                <iframe src="{{ $listing->video }}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                    {{-- Agent Contact  --}}
                    <!-- Agent Contact Details -->
                    <div class="restdetails-agent-details mb-50px">
                        <div class="restdetails-agent-header mb-16 d-flex align-items-center justify-content-between flex-wrap">
                            <h3 class="title">{{ get_phrase('Agent Contact Details') }}</h3>
                            <div class="restdetails-agent-btns d-flex align-items-center flex-wrap">
                                @php
                                    $isFollowing = in_array($listing->user_id, json_decode(auth()->user()->following_agent ?? '[]'));
                                    $text = $isFollowing ? 'Unfollow' : 'Follow';
                                @endphp

                                <a href="javascript:void(0)" class="theme-btn1 follow-btn" onclick="followers('{{ $listing->user_id }}')" id="followStatus">
                                    {{ $text }}
                                </a>
                                <a href="{{ route('agent.details', ['id' => $listing->user_id, 'slug' => slugify($listing->title)]) }}" class="gray-btn1">{{ get_phrase('View Details') }}</a>
                            </div>
                        </div>
                        <div class="restdetails-agent-area d-flex align-items-center">
                            @include('frontend.partial_agent_details')
                        </div>
                        <form>
                            <div class="mb-20 mt-3">
                                <label for="message" class="form-label smform-label2 mb-16">{{ get_phrase('Message*') }}</label>
                                <textarea class="form-control mform-control review-textarea" name="message" id="message" required></textarea>
                            </div>
                            
                            <div class="d-flex justify-content-between">
                                <button class="theme-btn1" type="button" onclick="send_message('{{ $listing->user_id }}')">{{ get_phrase('Submit') }}</button>

                                @if (Auth::check())
                                   @if (isset(auth()->user()->id) && auth()->user()->id !== $listing->user_id)
                                    @php
                                        $existingReport = \App\Models\ReportedListing::where('listing_id', $listing->id)->where('type', $listing->type)->where('reporter_id', auth()->user()->id)->exists();
                                    @endphp
                                    @if (!$existingReport)
                                       <a href="javascript:;" onclick="edit_modal('modal-md','{{ route('reportListingForm',['type'=>$listing->type ,'id'=>$listing->id]) }}','{{ get_phrase('Report this listing') }}')"   class="report-text">{{get_phrase('Report this listing')}}</a>
                                       @else 
                                       <a href="javascript:;"  class="report-text">{{get_phrase('Already Reported')}}</a>
                                       @endif
                                    @endif
                                @endif
                            </div>
                        </form>
                    </div>
                    {{-- Agent Contact  --}}
                    <!-- Reviews -->
                    <div class="beauty-details-reviews mb-50px">
                        <div class="review-title-button d-flex align-items-center justify-content-between flex-wrap">

                            @php
                                $totalReview = App\Models\Review::where('listing_id', $listing->id)->where('reply_id', null)->where('type', 'beauty')->get();
                            @endphp
                            <h2 class="title">{{ count($totalReview) }} {{ get_phrase('Reviews') }}</h2>

                            @if (auth()->check())
                                @php
                                    $user_review_count = App\Models\Review::where('listing_id', $listing->id)
                                        ->where('type', 'beauty')
                                        ->where('user_id', auth()->user()->id)->whereNull('reply_id')
                                        ->first();
                                @endphp
                                @if (auth()->user()->id !== $listing->user_id)
                                    @if (!$user_review_count)
                                        <a href="#add_review" id="" class="white-btn1">{{ get_phrase('Add Reviews') }}</a>
                                    @else
                                        <a href="#update_review" id="" class="white-btn1">{{ get_phrase('Update Reviews') }}</a>
                                    @endif
                                @endif
                            @endif
                        </div>
                        <!-- Single comment wrapper -->
                        @php
                            $reviews = App\Models\Review::where('listing_id', $listing->id)->where('type', 'beauty')->where('reply_id', null)->get();
                        @endphp
                        @foreach ($reviews as $review)
                            @php
                                $users = App\Models\User::where('id', $review->user_id)->first();
                                $replies = App\Models\Review::where('reply_id', $review->id)->get();
                                $userReplyExists = auth()->check()
                                    ? App\Models\Review::where('reply_id', $review->id)
                                        ->where('user_id', auth()->user()->id)
                                        ->exists()
                                    : false;
                            @endphp
                            <div class="single-comment-wrap">
                                <!-- Comment -->
                                <div class="single-comment d-flex">
                                    <div class="comment-profile">
                                        <img src="{{ get_all_image('users/' . $users['image']) }}" alt="">
                                    </div>
                                    <div class="comment-details">
                                        <div class="commentator-name-dropdown d-flex justify-content-between gap-2">
                                            <div class="commentator-name-date">
                                                <h3 class="name">{{ $users->name }}</h3>
                                                <p class="date">{{ \Carbon\Carbon::parse($review->created_at)->format('F j, Y . g:i a') }}</p>
                                            </div>
                                            @if (auth()->user() && auth()->user()->type == "admin")
                                                <div class="dropdown">
                                                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <img src="{{ asset('assets/frontend/images/icons/menu-dots-vertical.svg') }}" alt="">
                                                    </button>
                                                    <ul class="dropdown-menu dropdown-menu-end">
                                                        <li><a class="dropdown-item" onclick="delete_modal('{{ route('admin.listing_review_delete', ['id' => $review->id]) }}')" href="javascript:void(0);">{{ get_phrase('Delete Review') }}</a></li>
                                                    </ul>
                                                </div>
                                            @endif
                                            @if (auth()->user() && auth()->user()->id == $listing->user_id)
                                                <div class="dropdown">
                                                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <img src="{{ asset('assets/frontend/images/icons/menu-dots-vertical.svg') }}" alt="">
                                                    </button>
                                                    <ul class="dropdown-menu dropdown-menu-end">
                                                        <li><a class="dropdown-item" href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#reportModal{{ $review->id }}">{{ get_phrase('Report to Admin') }}</a></li>
                                                    </ul>
                                                </div>
                                                {{-- Report Modal Start --}}
                                                <form action="{{ route('listing.review.report', ['id' => $review->id]) }}" method="POST" class="modal fade" id="reportModal{{ $review->id }}" tabindex="-1" aria-labelledby="reportModalLabel{{ $review->id }}" aria-hidden="true">
                                                    @csrf
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h1 class="modal-title fs-5" id="reportModalLabel{{ $review->id }}">{{ get_phrase('Report to Admin') }}</h1>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="mb-20">
                                                                    <label class="form-label smform-label2 mb-16">{{ get_phrase('Message*') }}</label>
                                                                    <textarea class="form-control mform-control review-textarea" name="message" required></textarea>
                                                                    <input type="hidden" name="review_id" value="{{ $review->id }}">
                                                                    <input type="hidden" name="listing_id" value="{{ $review->listing_id }}">
                                                                    <input type="hidden" name="listing_type" value="{{ $review->type }}">
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ get_phrase('Cancel') }}</button>
                                                                <button type="submit" class="btn btn-primary">{{ get_phrase('Report Now') }}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                {{-- Report Modal End --}}
                                            @endif
                                        </div>
                                        <div class="comment-content">
                                            <ul class="d-flex eClass gap-1 mb-2">
                                                @for ($i = 1; $i <= 5; $i++)
                                                    @if ($i <= $review->rating)
                                                        <img src="{{ asset('assets/frontend/images/icons/star-yellow-17.svg') }}" alt="">
                                                    @else
                                                        <img src="{{ asset('assets/frontend/images/icons/star-gray-17.svg') }}" alt="">
                                                    @endif
                                                @endfor
                                            </ul>
                                            <p class="info">{{ $review->review }}</p>
                                        </div>
                                        @if (auth()->user() && auth()->user()->id == $listing->user_id && !$userReplyExists)
                                            <button class="comment-reply-btn" data-bs-toggle="modal" data-bs-target="#exampleModal{{ $review->id }}">{{ get_phrase('Reply') }}</button>
                                        @endif
                                    </div>
                                </div>
                                {{-- Reply Modal --}}
                                <form action="{{ route('listing.review.reply', ['id' => $review->id]) }}" method="POST" class="modal fade" id="exampleModal{{ $review->id }}" tabindex="-1" aria-labelledby="exampleModalLabel{{ $review->id }}" aria-hidden="true">
                                    @csrf
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel{{ $review->id }}">{{ get_phrase('Reply Review') }}</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="mb-20">
                                                    <label class="form-label smform-label2 mb-16">{{ get_phrase('Review*') }}</label>
                                                    <textarea class="form-control mform-control review-textarea" name="review" required></textarea>
                                                    <input type="hidden" name="reply_id" value="{{ $review->id }}">
                                                    <input type="hidden" name="agent_id" value="{{ $review->agent_id }}">
                                                    <input type="hidden" name="listing_id" value="{{ $review->listing_id }}">
                                                    <input type="hidden" name="listing_types" value="{{ $review->type }}">
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ get_phrase('Close') }}</button>
                                                <button type="submit" class="btn btn-primary">{{ get_phrase('Save changes') }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <!-- All Reply -->

                                <!-- Display Replies -->
                                @if ($replies->count() > 0)
                                    <ul class="comment-replies">
                                        @foreach ($replies as $reply)
                                            @php
                                                $reply_user = App\Models\User::where('id', $reply->user_id)->first();

                                            @endphp
                                            <li>
                                                <div class="single-comment d-flex">
                                                    <div class="comment-profile">
                                                        <img src="{{ get_all_image('users/' . $reply_user['image']) }}" alt="">
                                                    </div>
                                                    <div class="comment-details">
                                                        <div class="commentator-name-dropdown d-flex justify-content-between">
                                                            <div class="commentator-name-date">
                                                                <h3 class="name">{{ $reply_user->name }}</h3>
                                                                <p class="date">{{ \Carbon\Carbon::parse($reply->created_at)->format('F j, Y . g:i a') }}</p>
                                                            </div>
                                                            @if (auth()->user() && auth()->user()->id == $listing->user_id)
                                                                <div class="dropdown">
                                                                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <img src="{{ asset('assets/frontend/images/icons/menu-dots-vertical.svg') }}" alt="">
                                                                    </button>
                                                                    <ul class="dropdown-menu dropdown-menu-end">
                                                                        <li><a class="dropdown-item" href="javascript:;" onclick="edit_modal('modal-md','{{ route('listing.review.edit', ['id' => $reply->id]) }}','{{ get_phrase('Update Review') }}')">{{ get_phrase('Edit') }}</a></li>
                                                                        <li><a class="dropdown-item" href="javascript:;" onclick="delete_modal('{{ route('listing.review.delete', ['id' => $reply->id]) }}')" href="javascript:void(0);">{{ get_phrase('Delete') }}</a></li>
                                                                    </ul>
                                                                </div>
                                                            @endif
                                                        </div>
                                                        <div class="comment-content">
                                                            <p class="info">{{ $reply->review }}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </li>
                                        @endforeach
                                    </ul>
                                @endif
                            </div>
                        @endforeach
                    </div>
                    <!-- Edit Review -->
                    @php
                        $ownReview = null;
                        if (auth()->check()) {
                            $ownReview = App\Models\Review::where('listing_id', $listing->id)
                                ->where('type', 'beauty')
                                ->where('user_id', auth()->user()->id)->whereNull('reply_id')
                                ->first();
                        }
                    @endphp
                    @if (auth()->check() && auth()->user()->id !== $listing->user_id)
                        @if (!$user_review_count)
                            <!-- Add Review -->
                            <div class="atndetails-edit-reviews" id="add_review">
                                <h2 class="title mb-20">{{ get_phrase('Add Your Review') }}</h2>
                                <form action="{{ route('listing.review', ['id' => $listing->id]) }}" method="post">
                                    @csrf
                                    <div class="realdetails-review-form">
                                        <div class="mb-16">
                                            <input type="hidden" name="agent_id" value="{{ $listing->user_id }}">
                                            <input type="hidden" name="listing_type" value="{{ $listing->type }}">
                                            <label class="form-label smform-label2 mb-16">{{ get_phrase('Rating') }}</label>
                                            <select class="mNiceSelect review-select mform-control" name="rating" required>
                                                <option selected>{{ get_phrase('Select Rating') }}</option>
                                                <option value="1">{{ get_phrase('1') }}</option>
                                                <option value="2">{{ get_phrase('2') }}</option>
                                                <option value="3">{{ get_phrase('3') }}</option>
                                                <option value="4">{{ get_phrase('4') }}</option>
                                                <option value="5">{{ get_phrase('5') }}</option>
                                            </select>
                                        </div>
                                        <div class="mb-20">
                                            <label for="textarea1" class="form-label smform-label2 mb-16">{{ get_phrase('Review') }}</label>
                                            <textarea class="form-control mform-control review-textarea" name="review" id="textarea1" required></textarea>
                                        </div>
                                        <button class="theme-btn1" type="submit">{{ get_phrase('Submit') }}</button>
                                    </div>
                                </form>
                            </div>
                        @elseif(auth()->check() && $ownReview && auth()->user()->id == $ownReview->user_id)
                            <!-- Edit Review -->
                            <div class="atndetails-edit-reviews" id="update_review">
                                <h2 class="title mb-20">{{ get_phrase('Update Your Review') }}</h2>
                                <form action="{{ route('listing.review.update', ['id' => $listing->id]) }}" method="post">
                                    @csrf
                                    <div class="realdetails-review-form">
                                        <div class="mb-16">
                                            <input type="hidden" name="agent_id" value="{{ $listing->user_id }}">
                                            <input type="hidden" name="listing_type" value="{{ $listing->type }}">
                                            <label class="form-label smform-label2 mb-16">{{ get_phrase('Rating') }}</label>
                                            <select class="mNiceSelect review-select mform-control" name="rating" required>
                                                <option value="1" {{ isset($user_review_count) && $user_review_count->rating == 1 ? 'selected' : '' }}>{{ get_phrase('1') }}</option>
                                                <option value="2" {{ isset($user_review_count) && $user_review_count->rating == 2 ? 'selected' : '' }}>{{ get_phrase('2') }}</option>
                                                <option value="3" {{ isset($user_review_count) && $user_review_count->rating == 3 ? 'selected' : '' }}>{{ get_phrase('3') }}</option>
                                                <option value="4" {{ isset($user_review_count) && $user_review_count->rating == 4 ? 'selected' : '' }}>{{ get_phrase('4') }}</option>
                                                <option value="5" {{ isset($user_review_count) && $user_review_count->rating == 5 ? 'selected' : '' }}>{{ get_phrase('5') }}</option>
                                            </select>
                                        </div>
                                        <div class="mb-20">
                                            <label for="textarea1" class="form-label smform-label2 mb-16">{{ get_phrase('Review') }}</label>
                                            <textarea class="form-control mform-control review-textarea" name="review" id="textarea1" required>{{ $user_review_count->review }}</textarea>
                                        </div>
                                        <button class="theme-btn1" type="submit">{{ get_phrase('Update') }}</button>
                                    </div>
                                </form>
                            </div>
                        @else
                        @endif
                    @endif

                    {{-- Custom Field --}}
                   
                        @include('frontend.custom_field')
                   
                    {{-- Custom Field --}}

                </div>
                <!-- Sidebar -->
                <div class="col-xl-4 col-lg-5">
                    {{-- Ads Post --}}
                        @include('frontend.ads_post')
                    {{-- Ads Post --}}
                    <div class="beauty-details-sidebar">
                        @if(
                            (isset($subscription_info) && $subscription_info->contact == 'available')
                            || 
                            ($listing_user->role == 1)
                        )
                            <h1 class="title mb-20">{{ get_phrase('Book a Meeting') }}</h1>
                            @if (addon_status('form_builder') == 1 && get_settings('form_builder') == 1)
                            @include('frontend.form_builder.form')  
                            @else
                            <form action="{{ route('customerBookAppointment') }}" method="post">
                                @csrf
                                <input type="hidden" name="type" value="person">
                                <input type="hidden" name="listing_type" value="beauty">
                                <input type="hidden" name="listing_id" value="{{ $listing->id }}">
                                <input type="hidden" name="agent_id" value="{{ $listing->user_id }}">

                                <div class="beautydetails-meeting-form">
                                    <div class="mb-14">
                                        <label for="datetime" class="form-label mform-label mb-14">{{ get_phrase('Select Date and Time') }}</label>
                                        <input type="text" name="date"  placeholder="{{get_phrase('Select date')}}" class="form-control mform-control flat-input-picker3 input-calendar-icon" id="datetime" required />
                                    </div>
                                    <input type="text" class="form-control mform-control mb-14" name="name" placeholder="Name" required>
                                    <input type="number" class="form-control mform-control mb-14" name="phone" placeholder="Phone" required>
                                    <input type="email" class="form-control mform-control mb-14" name="email" placeholder="Email" required>
                                    <textarea class="form-control mform-control review-textarea mb-14" name="message" placeholder="Message" required></textarea>
                                    <button type="submit" class="submit-fluid-btn2 mb-2">{{ get_phrase('Submit Now') }}</button>
                                </div>
                            </form>
                            @endif
                        @endif
                         @if (Auth::check())
                            @if (isset(auth()->user()->id) && auth()->user()->id == $listing->user_id)
                                @php
                                    $existingClaim = \App\Models\ClaimedListing::where('listing_id', $listing->id)->where('listing_type', $listing->type)->where('user_id', auth()->user()->id)->exists();
                                @endphp
                                @if (!$existingClaim)
                                    <a href="javascript:;" onclick="edit_modal('modal-md','{{ route('claimListingForm',['type'=>$listing->type ,'id'=>$listing->id]) }}','{{ get_phrase('Verify Listing') }}')" class="submit-fluid-btn2">
                                        {{ get_phrase('Verify Listing') }}
                                    </a>
                                @else
                                    <button type="button" class="submit-fluid-btn" disabled>
                                        {{ get_phrase('Already Verified') }}
                                    </button>
                                @endif
                            @endif
                          @endif
                        @include('frontend.partial_claim')
                       
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Main Content Area -->

    <!-- Start Modal Area -->
    <div class="modal modal-main-xl fade" id="imageViewModal" tabindex="-1" aria-labelledby="imageViewModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="alm-header-wrap d-flex align-items-center">
                        <div class="alm-header-title-wrap d-flex align-items-center justify-content-between">
                            <h3 class="xl-modal-title">{{ $listing->title }}</h3>
                            <div class="alm-rating-review d-flex align-items-center gap-1">
                                <img src="{{ asset('assets/frontend/images/icons/star-yellow-16.svg') }}" alt="">
                                <p>({{ count($totalReview) }} {{ get_phrase('REVIEWS') }})</p>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-3">
                    <div class="row mt-2 gx-3 row-gap-3">
                        @foreach (json_decode($listing->image) as $key => $image)
                            <div class="col-lg-3 col-md-4 col-sm-6">
                                <div class="sing-gallery">
                                    <div class="gallery-head">
                                        <a class="veno-gallery-img" href="{{ get_all_image('listing-images/' . $image) }}"><img src="{{ get_all_image('listing-images/' . $image) }}" alt=""></a>
                                    </div>
                                    <p>{{ $listing->title }}</p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal Area -->

    <!-- Start Related Product Area -->
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="in-title3-24px mb-20">{{ get_phrase('Related Property') }}</h1>
                </div>
            </div>
            <div class="row row-28 mb-80">
                <!-- Single Card -->
                @php
                    $relatedListing = App\Models\BeautyListing::where('is_popular', $listing->is_popular)->where('visibility', 'visible')->where('id', '!=', $listing->id)->take(4)->get();
                @endphp
                @foreach ($relatedListing->sortByDesc('created_at') as $listings)
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div class="single-grid-card">
                            <!-- Banner Slider -->
                            <div class="grid-slider-area">
                                @php
                                    $images = json_decode($listings->image);
                                    $image = isset($images[0]) ? $images[0] : null;
                                @endphp
                                <a class="w-100 h-100" href="{{ route('listing.details', ['type' => $type, 'id' => $listings->id, 'slug' => slugify($listings->title)]) }}">
                                    <img class="card-item-image" src="{{ get_all_image('listing-images/' . $image) }}">
                                </a>
                                <p class="card-light-text theme-light capitalize">{{ $listings->is_popular }}</p>
                                @php
                                    $is_in_wishlist = check_wishlist_status($listings->id, $listings->type);
                                @endphp

                                <a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-title="{{ $is_in_wishlist ? get_phrase('Remove from Wishlist') : get_phrase('Add to Wishlist') }}" onclick="PopuralupdateWishlist(this, '{{ $listings->id }}')" class="grid-list-bookmark white-bookmark {{ $is_in_wishlist ? 'active' : '' }}">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.4361 3C12.7326 3.01162 12.0445 3.22023 11.4411 3.60475C10.8378 3.98927 10.3407 4.53609 10 5.18999C9.65929 4.53609 9.16217 3.98927 8.55886 3.60475C7.95554 3.22023 7.26738 3.01162 6.56389 3C5.44243 3.05176 4.38583 3.57288 3.62494 4.44953C2.86404 5.32617 2.4607 6.48707 2.50302 7.67861C2.50302 10.6961 5.49307 13.9917 8.00081 16.2262C8.56072 16.726 9.26864 17 10 17C10.7314 17 11.4393 16.726 11.9992 16.2262C14.5069 13.9917 17.497 10.6961 17.497 7.67861C17.5393 6.48707 17.136 5.32617 16.3751 4.44953C15.6142 3.57288 14.5576 3.05176 13.4361 3Z" fill="#6C1CFF" />
                                    </svg>
                                </a>
                            </div>
                            <div class="beauty-grid-details position-relative">
                                <div class="beautygrid-location-title">
                                    <div class="location d-flex">
                                        <img src="{{ asset('assets/frontend/images/icons/location-gray2-16.svg') }}" alt="">
                                        @php
                                            $city_name = App\Models\City::where('id', $listings->city)->first()->name;
                                            $country_name = App\Models\Country::where('id', $listings->country)->first()->name;

                                            $claimStatus = App\Models\ClaimedListing::where('listing_id', $listings->id)->where('listing_type', 'beauty')->first();  
                                        @endphp
                                        <p class="name"> {{ $city_name . ', ' . $country_name }} </p>
                                    </div>
                                    <a href="{{ route('listing.details', ['type' => $type, 'id' => $listings->id, 'slug' => slugify($listings->title)]) }}" class="title">
                                        @if(isset($claimStatus) && $claimStatus->status == 1) 
                                        <span data-bs-toggle="tooltip" 
                                            data-bs-title=" {{ get_phrase('This listing is verified') }}" > <svg fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="paint0_linear_16_1334" gradientUnits="userSpaceOnUse" x1="12" x2="12" y1="-1.2" y2="25.2"><stop offset="0" stop-color="#ce9ffc"/><stop offset=".979167" stop-color="#7367f0"/></linearGradient><path d="m3.783 2.826 8.217-1.826 8.217 1.826c.2221.04936.4207.17297.563.3504.1424.17744.22.39812.22.6256v9.987c-.0001.9877-.244 1.9602-.7101 2.831s-1.14 1.6131-1.9619 2.161l-6.328 4.219-6.328-4.219c-.82173-.5478-1.49554-1.2899-1.96165-2.1605-.46611-.8707-.71011-1.8429-.71035-2.8305v-9.988c.00004-.22748.07764-.44816.21999-.6256.14235-.17743.34095-.30104.56301-.3504zm8.217 10.674 2.939 1.545-.561-3.272 2.377-2.318-3.286-.478-1.469-2.977-1.47 2.977-3.285.478 2.377 2.318-.56 3.272z" fill="url(#paint0_linear_16_1334)"/></svg></span>
                                        @endif
                                        {{ $listings->title }} </a>
                                </div>
                                <div class="beautygrid-rating-open d-flex align-items-center justify-content-between flex-wrap">
                                    @php
                                        $reviews_count = App\Models\Review::where('listing_id', $listings->id)->where('user_id', '!=', $listings->user_id)->where('type', 'beauty')->where('reply_id', null)->count();
                                        $total_ratings = App\Models\Review::where('listing_id', $listings->id)->where('user_id', '!=', $listings->user_id)->where('type', 'beauty')->where('reply_id', null)->sum('rating');
                                        $average_rating = $reviews_count > 0 ? $total_ratings / $reviews_count : 0;
                                    @endphp
                                    <div class="beauty-grid-ratings d-flex align-items-center">
                                        <p class="rating">{{ number_format($average_rating, 1) }}</p>
                                        <img src="{{ asset('assets/frontend/images/icons/star-yellow-20.svg') }}" alt="">
                                        <p class="reviews">({{ $reviews_count }})</p>
                                    </div>
                                    <div class="beauty-grid-open d-flex align-items-center">
                                        @if (open_status($listings->id, 'BeautyListing') === 'Open')
                                            <img src="{{ asset('assets/frontend/images/icons/door-open-green.svg') }}" alt="">
                                            <p class="status open">{{ get_phrase('Open') }}</p>
                                        @else
                                            <img src="{{ asset('assets/frontend/images/icons/door-open-red.svg') }}" alt="">
                                            <p class="status close">{{ get_phrase('Closed') }}</p>
                                        @endif
                                    </div>
                                </div>
                                <div class="beauty-grid-btns d-flex align-items-center justify-content-between flex-wrap">
                                    <a href="{{ route('listing.details', ['type' => $type, 'id' => $listings->id, 'slug' => slugify($listings->title)]) }}" class="small-border-btn1">{{ ucwords(App\Models\Category::where('id', $listings->category)->first()->name) }}</a>
                                    <a href="{{ route('listing.details', ['type' => $type, 'id' => $listings->id, 'slug' => slugify($listings->title)]) }}" class="reals-grid-view stretched-link">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.6499 9.33752H6.8999C6.5924 9.33752 6.3374 9.08252 6.3374 8.77502C6.3374 8.46752 6.5924 8.21252 6.8999 8.21252H10.6499C10.9574 8.21252 11.2124 8.46752 11.2124 8.77502C11.2124 9.08252 10.9574 9.33752 10.6499 9.33752Z" fill="#555558" />
                                            <path d="M8.7749 11.2125C8.4674 11.2125 8.2124 10.9575 8.2124 10.65V6.90002C8.2124 6.59252 8.4674 6.33752 8.7749 6.33752C9.0824 6.33752 9.3374 6.59252 9.3374 6.90002V10.65C9.3374 10.9575 9.0824 11.2125 8.7749 11.2125Z" fill="#555558" />
                                            <path d="M8.625 16.3125C4.3875 16.3125 0.9375 12.8625 0.9375 8.625C0.9375 4.3875 4.3875 0.9375 8.625 0.9375C12.8625 0.9375 16.3125 4.3875 16.3125 8.625C16.3125 12.8625 12.8625 16.3125 8.625 16.3125ZM8.625 2.0625C5.0025 2.0625 2.0625 5.01 2.0625 8.625C2.0625 12.24 5.0025 15.1875 8.625 15.1875C12.2475 15.1875 15.1875 12.24 15.1875 8.625C15.1875 5.01 12.2475 2.0625 8.625 2.0625Z" fill="#555558" />
                                            <path d="M16.5001 17.0625C16.3576 17.0625 16.2151 17.01 16.1026 16.8975L13.5003 14.2955C13.2828 14.078 13.2828 13.718 13.5003 13.5005C13.7178 13.283 14.0778 13.283 14.2953 13.5005L16.8976 16.1025C17.1151 16.32 17.1151 16.68 16.8976 16.8975C16.7851 17.01 16.6426 17.0625 16.5001 17.0625Z" fill="#555558" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
                <!-- Single Card -->

            </div>
        </div>
    </section>
    <!-- End Related Product Area -->

@endsection
@push('js')

    <script>
        "use strict";
        $('documnet').ready(function() {
            flatpickr("#datetime", {
                enableTime: true,
                dateFormat: "Y-m-d H:i:S",
                minDate: "today",
            });
        });
    </script>
    <script>
        "use strict";

        function toggleDescription() {
            var shortDesc = document.getElementById("short-description");
            var fullDesc = document.getElementById("full-description");
            var readMoreBtn = document.getElementById("read-more-btn");

            if (shortDesc.classList.contains("d-block")) {
                shortDesc.classList.remove("d-block");
                shortDesc.classList.add("d-none");
                fullDesc.classList.remove("d-none");
                fullDesc.classList.add("d-block");
                readMoreBtn.querySelector("span").textContent = "Read Less";
            } else {
                shortDesc.classList.remove("d-none");
                shortDesc.classList.add("d-block");
                fullDesc.classList.remove("d-block");
                fullDesc.classList.add("d-none");
                readMoreBtn.querySelector("span").textContent = "Read More";
            }
        }
    </script>

    @if (Auth::check())
        <script>
            "use strict";

            function updateWishlist(button, listingId) {
                const bookmarkButton = $(button);
                const isActive = bookmarkButton.hasClass('active');
                bookmarkButton.toggleClass('active');
                const newTooltipText = isActive ? 'Add to Wishlist' : 'Remove from Wishlist';
                bookmarkButton.attr('data-bs-title', newTooltipText);

                const tooltipInstance = bootstrap.Tooltip.getInstance(button);
                if (tooltipInstance) tooltipInstance.dispose();
                new bootstrap.Tooltip(button);

                $.ajax({
                    url: '{{ route('wishlist.update') }}',
                    method: 'POST',
                    data: {
                        listing_id: listingId,
                        type: 'beauty',
                        user_id: {{ auth()->check() ? auth()->id() : 'null' }},
                        _token: '{{ csrf_token() }}',
                    },
                    success: function(response) {
                        if (response.status === 'success') {
                            success(response.message);
                        } else if (response.status === 'error') {
                            bookmarkButton.toggleClass('active');
                            const revertTooltipText = isActive ? 'Remove from Wishlist' : 'Add to Wishlist';
                            bookmarkButton.attr('data-bs-title', revertTooltipText);
                            const revertTooltipInstance = bootstrap.Tooltip.getInstance(button);
                            if (revertTooltipInstance) revertTooltipInstance.dispose();
                            new bootstrap.Tooltip(button);
                        }
                    },
                    error: function(xhr) {
                        bookmarkButton.toggleClass('active');
                        const revertTooltipText = isActive ? 'Remove from Wishlist' : 'Add to Wishlist';
                        bookmarkButton.attr('data-bs-title', revertTooltipText);
                        const revertTooltipInstance = bootstrap.Tooltip.getInstance(button);
                        if (revertTooltipInstance) revertTooltipInstance.dispose();
                        new bootstrap.Tooltip(button);
                    },
                });
            }
        </script>
    @else
        <script>
            "use strict";

            function updateWishlist(listing_id) {
                warning("Please login first!");
            }
        </script>
    @endif
    @if (Auth::check())
        <script>
            "use strict";

            function PopuralupdateWishlist(button, listingId) {
                const bookmarkButton = $(button);
                const isActive = bookmarkButton.hasClass('active');
                bookmarkButton.toggleClass('active');
                const newTooltipText = isActive ? 'Add to Wishlist' : 'Remove from Wishlist';
                bookmarkButton.attr('data-bs-title', newTooltipText);

                const tooltipInstance = bootstrap.Tooltip.getInstance(button);
                if (tooltipInstance) tooltipInstance.dispose();
                new bootstrap.Tooltip(button);

                $.ajax({
                    url: '{{ route('wishlist.update') }}',
                    method: 'POST',
                    data: {
                        listing_id: listingId,
                        type: 'beauty',
                        user_id: {{ auth()->check() ? auth()->id() : 'null' }},
                        _token: '{{ csrf_token() }}',
                    },
                    success: function(response) {
                        if (response.status === 'success') {
                            success(response.message);
                        } else if (response.status === 'error') {
                            bookmarkButton.toggleClass('active');
                            const revertTooltipText = isActive ? 'Remove from Wishlist' : 'Add to Wishlist';
                            bookmarkButton.attr('data-bs-title', revertTooltipText);
                            const revertTooltipInstance = bootstrap.Tooltip.getInstance(button);
                            if (revertTooltipInstance) revertTooltipInstance.dispose();
                            new bootstrap.Tooltip(button);
                        }
                    },
                    error: function(xhr) {
                        bookmarkButton.toggleClass('active');
                        const revertTooltipText = isActive ? 'Remove from Wishlist' : 'Add to Wishlist';
                        bookmarkButton.attr('data-bs-title', revertTooltipText);
                        const revertTooltipInstance = bootstrap.Tooltip.getInstance(button);
                        if (revertTooltipInstance) revertTooltipInstance.dispose();
                        new bootstrap.Tooltip(button);
                    },
                });
            }
        </script>
    @else
        <script>
            "use strict";

            function PopuralupdateWishlist(listing_id) {
                warning("Please login first!");
            }
        </script>
    @endif

    @if (Auth::check())
        @if (isset(auth()->user()->id) && auth()->user()->id != $listing->user_id)
            <script>
                "use strict";

                function followers(user_id) {
                    $.ajax({
                        url: "{{ route('followUnfollow') }}",
                        method: "POST",
                        data: {
                            agent_id: user_id,
                            _token: "{{ csrf_token() }}"
                        },
                        success: function(response) {
                            if (response.status == 1) {
                                $("#followStatus").html('Unfollow');
                                success("Follow Successfully!");
                            } else {
                                $("#followStatus").html('Follow');
                                success("Unfollow Successfully!");
                            }
                        },
                        error: function() {
                            error("An error occurred. Please try again.");
                        }
                    });
                }
            </script>
        @else
            <script>
                "use strict";

                function followers(user_id) {
                    warning("You can't follow yourself!");
                }
            </script>
        @endif
    @else
        <script>
            "use strict";

            function followers(listing_id) {
                warning("Please login first!");
            }
        </script>
    @endif

    <script>
        "use strict";
        $(document).ready(function() {
            $('#shareButton').on('click', function() {
                var currentPageUrl = window.location.href;

                // Toggle the active class
                $(this).toggleClass('active');

                // Copy the current page URL to clipboard
                navigator.clipboard.writeText(currentPageUrl).then(function() {
                    success('Successfully copied this link!');
                }).catch(function(error) {
                    error('Failed to copy the link!');
                });
            });
        });
    </script>

    @if (Auth::check())
        @if (isset(auth()->user()->id) && auth()->user()->id != $listing->user_id)
            <script>
                "use strict";

                function send_message(user_id) {
                    var message = $('#message').val();
                    if (message != "") {
                        $.ajax({
                            url: '{{ route('customerMessage') }}',
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data: {
                                agent_id: user_id,
                                message: message
                            },
                            success: function(response) {
                                console.log(response);
                                if (response.status == 'success') {
                                    success("Message sent successfully");
                                    $('#message').val('');
                                } else {
                                    error("Message send failed");
                                }
                            }
                        });
                    } else {
                        warning("Please fill up the field first");
                    }
                }
            </script>
        @else
            <script>
                "use strict";

                function send_message(user_id) {
                    warning("You can't Message yourself");
                }
            </script>
        @endif
    @else
        <script>
            "use strict";

            function send_message(listing_id) {
                warning("Please login first!");
            }
        </script>
    @endif





@endpush





