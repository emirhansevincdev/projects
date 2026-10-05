@extends('layouts.frontend')
@push('title', get_phrase('Add Listing'))
@push('meta')@endpush
@section('frontend_layout')

<style>
    .listing-type {
        border: 1px solid #DBDFEB;
        width: 100%;
        padding: 15px;
        color: #000;
        margin-bottom: 10px;
        margin-top: 10px;
        border-radius: 10px;
        position: relative;
    }
    .listing-type:hover .right-array{
        background-color: #000;
        transition: 0.6s;
        color: #fff;
    }
    .listing-type .right-array {
        position: absolute;
        top: 15%;
        right: 7px;
        background: #000;
        height: 34px;
        border-radius: 7px;
        color: #fff;
        width: 34px;
        line-height: 34px;
        text-align: center;
     }
    .listing-type h5 {
        font-size: 14px;
        font-weight: 500; 
    }
    .line-1 {
        display: -webkit-box!important;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
    }
    .possition_relative {
        position: relative;
        margin-right: 15px;
        margin-top: 11px;
    }
    .possition_relative i {
        position: absolute;
        top: -12px;
        right: -10px;
        color: #fff;
        background-color: red;
        padding: 7px;
        cursor: pointer;
        border-radius: 50px;
        font-size: 12px;
    }
    .team-checkbox {
    position: relative;
}
.team-checkbox .card-title {
    font-size: 14px;
    font-weight: 600;
    padding: 0;
    margin: 0;
}
.team-checkbox .card-text {
    font-size: 12px;
}
.team-checkbox .card-text {
    font-size: 12px;
}
.team-checkbox .team-body .checked {
    position: absolute;
    top: 2px;
    right: 5px;
}
.team-checkbox .team-body .checked i {
    background-color: #1B84FF;
    padding: 7px 5px;
    border-radius: 50px;
    color: #fff;
    font-size: 10px;
}
.team-checkbox img {
    height: 65px;
    width: 100px;
    object-fit: cover;
    border-radius: 5px;
}
.dBtn{}
.dBtn a {
	padding: 8px 16px;
	font-weight: 500;
}

</style>

<section class="ca-wraper-main mb-90px mt-4">
    <div class="container">
        <div class="row gx-20px">
            <div class="col-lg-4 col-xl-3">
                @include('user.navigation')
            </div>
            <div class="col-lg-8 col-xl-9">
                <!-- Header -->
                <div class="d-flex align-items-start justify-content-between gap-2 mb-20px">
                    <div class="d-flex justify-content-between align-items-start gap-12px flex-column flex-lg-row w-100">
                        <h1 class="ca-title-18px">{{get_phrase('All Listing Type')}}</h1>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb cap-breadcrumb">
                              <li class="breadcrumb-item cap-breadcrumb-item"><a href="{{route('home')}}">{{get_phrase('Home')}}</a></li>
                              <li class="breadcrumb-item cap-breadcrumb-item active" aria-current="page">{{get_phrase('Listing')}}</li>
                            </ol>
                        </nav>
                    </div>
                    <button class="btn ca-menu-btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#user-sidebar-offcanvas" aria-controls="user-sidebar-offcanvas">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 5.25H3C2.59 5.25 2.25 4.91 2.25 4.5C2.25 4.09 2.59 3.75 3 3.75H21C21.41 3.75 21.75 4.09 21.75 4.5C21.75 4.91 21.41 5.25 21 5.25Z" fill="#242D47"/>
                            <path d="M21 10.25H3C2.59 10.25 2.25 9.91 2.25 9.5C2.25 9.09 2.59 8.75 3 8.75H21C21.41 8.75 21.75 9.09 21.75 9.5C21.75 9.91 21.41 10.25 21 10.25Z" fill="#242D47"/>
                            <path d="M21 15.25H3C2.59 15.25 2.25 14.91 2.25 14.5C2.25 14.09 2.59 13.75 3 13.75H21C21.41 13.75 21.75 14.09 21.75 14.5C21.75 14.91 21.41 15.25 21 15.25Z" fill="#242D47"/>
                            <path d="M21 20.25H3C2.59 20.25 2.25 19.91 2.25 19.5C2.25 19.09 2.59 18.75 3 18.75H21C21.41 18.75 21.75 19.09 21.75 19.5C21.75 19.91 21.41 20.25 21 20.25Z" fill="#242D47"/>
                        </svg>
                    </button>
                </div>
                <div class="ca-content-card h-50">
                    <div class="row">
                        <div class="col-lg-12 ">
                             <div class="d-flex justify-content-end mb-2 dBtn  flex-wrap gap-2">
                                    <a href="{{ asset('listing-bulk.csv') }}" class="btn cap2-btn-primary d-flex gap-6px align-items-center" target="_blank" download >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.3931 9.43903C20.1661 8.86803 19.6221 8.49902 19.0081 8.49902H16.915V4C16.915 3.173 16.242 2.5 15.415 2.5H9.41504C8.58804 2.5 7.91504 3.173 7.91504 4V8.5H5.99194C5.37794 8.5 4.83393 8.869 4.60693 9.44C4.37993 10.011 4.52201 10.652 4.96801 11.073L11.2419 17.001C11.5949 17.334 12.047 17.5 12.499 17.5C12.951 17.5 13.4031 17.333 13.7561 17.001L20.029 11.073C20.4781 10.651 20.6191 10.01 20.3931 9.43903ZM19.344 10.345L13.0701 16.273C12.7521 16.575 12.2499 16.575 11.9309 16.273L5.656 10.345C5.432 10.133 5.50908 9.87998 5.53808 9.80798C5.56608 9.73498 5.68392 9.49902 5.99292 9.49902H8.41601C8.54901 9.49902 8.67602 9.44603 8.77002 9.35303C8.86402 9.26003 8.91601 9.13202 8.91601 8.99902V3.99902C8.91601 3.72302 9.14101 3.49902 9.41601 3.49902H15.416C15.691 3.49902 15.916 3.72302 15.916 3.99902V8.99902C15.916 9.13202 15.969 9.25903 16.062 9.35303C16.155 9.44703 16.283 9.49902 16.416 9.49902H19.009C19.318 9.49902 19.4361 9.73598 19.4641 9.80798C19.4921 9.88098 19.568 10.134 19.344 10.345ZM20 21C20 21.276 19.776 21.5 19.5 21.5H5.5C5.224 21.5 5 21.276 5 21C5 20.724 5.224 20.5 5.5 20.5H19.5C19.776 20.5 20 20.724 20 21Z" fill="#fff"/>
                                            </svg>
                                        <span> {{get_phrase('Preview Bulk Download')}} </span>
                                    </a>
                                    <a href="{{route('agent.bulk_listing_upload')}}" class="btn cap2-btn-primary d-flex gap-6px align-items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.914 21C19.914 21.276 19.69 21.5 19.414 21.5H5.41501C5.13901 21.5 4.91501 21.276 4.91501 21C4.91501 20.724 5.13901 20.5 5.41501 20.5H19.414C19.69 20.5 19.914 20.724 19.914 21ZM20.393 10.5609C20.166 11.1319 19.622 11.5009 19.008 11.5009H17.0849V16.0009C17.0849 16.8279 16.4119 17.5009 15.5849 17.5009H9.58493C8.75793 17.5009 8.08493 16.8279 8.08493 16.0009V11.5009H5.99191C5.37791 11.5009 4.8339 11.1319 4.6069 10.5609C4.3799 9.98994 4.52197 9.34895 4.96897 8.92795L11.2419 2.99997C11.9469 2.33497 13.0511 2.33497 13.7561 2.99997L20.03 8.92795C20.478 9.34895 20.619 9.98994 20.393 10.5609ZM19.3449 9.655L13.07 3.72696C12.752 3.42496 12.2499 3.42496 11.9309 3.72696L5.65695 9.655C5.43195 9.867 5.50906 10.12 5.53806 10.192C5.56606 10.265 5.68389 10.5009 5.99289 10.5009H8.58591C8.71891 10.5009 8.84591 10.5539 8.93991 10.6469C9.03391 10.7399 9.08591 10.8679 9.08591 11.0009V16.0009C9.08591 16.2769 9.31091 16.5009 9.58591 16.5009H15.5859C15.8609 16.5009 16.0859 16.2769 16.0859 16.0009V11.0009C16.0859 10.8679 16.1389 10.7409 16.2319 10.6469C16.3249 10.5529 16.4529 10.5009 16.5859 10.5009H19.009C19.318 10.5009 19.4361 10.264 19.4641 10.192C19.4921 10.119 19.5679 9.866 19.3449 9.655Z" fill="#fff"/>
                                            </svg>
                                        <span> {{get_phrase('Bulk Upload')}} </span>
                                    </a>
                                </div>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        
                    @php
                        $listingTypes = \App\Models\CustomType::where('status', 1)
                            ->orderBy('sorting', 'asc')
                            ->take($subscription_info->category)
                            ->get();
                    @endphp

                    @foreach($listingTypes as $type)
                        <div class="col-sm-4">
                            <a href="{{ route('agent.add.listing.type', ['type' => $type->slug]) }}" class="listing-type">
                                <h5>{{ get_phrase(ucwords(str_replace('-', ' ', $type->slug)) . ' Listing') }}</h5>
                                <div class="right-array">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.0303 8.46981L11.7802 3.21981C11.6388 3.08319 11.4493 3.0076 11.2527 3.00931C11.0561 3.01101 10.8679 3.08989 10.7289 3.22895C10.5898 3.368 10.511 3.55611 10.5092 3.75276C10.5075 3.94941 10.5831 4.13886 10.7198 4.28031L14.6895 8.25006H1.5C1.30109 8.25006 1.11032 8.32908 0.96967 8.46973C0.829018 8.61038 0.75 8.80115 0.75 9.00006C0.75 9.19897 0.829018 9.38974 0.96967 9.53039C1.11032 9.67104 1.30109 9.75006 1.5 9.75006H14.6895L10.7198 13.7198C10.6481 13.789 10.591 13.8718 10.5517 13.9633C10.5124 14.0548 10.4917 14.1532 10.4908 14.2528C10.4899 14.3523 10.5089 14.4511 10.5466 14.5433C10.5843 14.6354 10.64 14.7192 10.7105 14.7896C10.7809 14.86 10.8646 14.9157 10.9568 14.9534C11.049 14.9911 11.1477 15.0101 11.2473 15.0092C11.3469 15.0084 11.4453 14.9877 11.5368 14.9484C11.6283 14.9091 11.7111 14.8519 11.7802 14.7803L17.0303 9.53031C17.1709 9.38967 17.2498 9.19893 17.2498 9.00006C17.2498 8.80119 17.1709 8.61046 17.0303 8.46981Z" fill="currentColor"/>
                                </svg>
                                </div>
                            </a>
                        </div>
                    @endforeach
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

@endsection