@extends('layouts.frontend')
@push('title', get_phrase('Calendly Settings'))
@push('meta')@endpush
@section('frontend_layout')

<style>
.fz-17-sb-black {
    font-size: 1.0625rem;
    font-weight: 600;
    line-height: 1.25rem;
    color: #0b162d;
}
.alert.alert-info{}
.alert.alert-info h4 {
	font-size: 17px;
	font-weight: 500;
	color: #0b162d;
}
.alert.alert-info p {
	font-size: 14px;
	margin: 7px 0;
}
</style>

    <!-- Start Main Area -->
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
                            <h1 class="ca-title-18px">{{get_phrase('Calendly Settings Update')}}</h1>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb cap-breadcrumb">
                                  <li class="breadcrumb-item cap-breadcrumb-item"><a href="{{route('home')}}">{{get_phrase('Home')}}</a></li>
                                  <li class="breadcrumb-item cap-breadcrumb-item active" aria-current="page">{{get_phrase('Calendly')}}</li>
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
                    <div class="ca-content-card">
                        <div class="row">
                                <div class="col-lg-7">
                                    <form action="{{route('agent.calendly-setting-update')}}" method="post" enctype="multipart/form-data">
                                        @csrf
                                        
                                        <div class="mb-3">
                                            <label for="calendly_info" class="cap-form-label"> {{get_phrase('Personal  Access Token')}}* </label>
                                            <input type="text" id="calendly_info" name="calendly_info" class="form-control cap-form-control" value="{{$calendlies->calendly_info ?? ''}}" required>
                                        </div>
                                        
                                        <div class="form-group mt-3">
                                            <button type="submit" class="btn ol-btn-primary "> {{get_phrase("Save")}} </button>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-lg-5">
                                   <div class="alert alert-info" role="alert">
                                        <h4 class="alert-heading">{{ get_phrase('How to integrate Calendly') }}</h4>
                                        <p>{{ get_phrase('1. Login to your') }} <a href="https://calendly.com/" target="_blank"><b>{{ get_phrase('Calendly account') }}</b></a></p>
                                      <p>{{ get_phrase('2. Go to') }} <a href="https://calendly.com/integrations" target="_blank"><b>{{ get_phrase('Integrations & Apps') }}</b></a> {{ get_phrase('and find the ') }} <b>{{get_phrase('API & Webhooks')}}</b> {{get_phrase('blocks.')}}</p>
                                        <p>{{ get_phrase('3. Click') }} <b>{{ get_phrase('Get a Personal Access Token') }}</b> {{ get_phrase('or create a new token if you don’t have one.') }}</p>
                                        <p>{{ get_phrase('4. Copy the token and paste it in your integration settings in this application.') }}</p>
                                        <p>{{ get_phrase('That’s it! Now your account is linked and you can display your Calendly events here.') }}</p>
                                    </div>
                                </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </section>
    

@endsection