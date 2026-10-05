@extends('layouts.admin')
@section('title', get_phrase('Calendly Settings'))
@section('admin_layout')
<style>
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
<div class="ol-card radius-8px">
    <div class="ol-card-body my-2 py-20px px-20px">
        <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap flex-md-nowrap">
            <h4 class="title fs-16px">
                <i class="fi-rr-settings-sliders me-2"></i>
                {{ get_phrase('Calendly Settings') }}
            </h4>
        </div>
    </div>
</div>

<div class="row mt-3">
    <div class="col-lg-6 col-md-12">
        <div class="ol-card">
            <div class="ol-card-body p-3 py-4">
                <form action="{{route('admin.calendly-setting-update')}}" method="post" enctype="multipart/form-data">
                    @csrf
                    
                    <div class="mb-3">
                        <label for="calendly_info" class="form-label ol-form-label"> {{get_phrase('Personal  Access Token')}}* </label>
                        <input type="text" id="calendly_info" name="calendly_info" class="form-control ol-form-control" value="{{$calendlies->calendly_info ?? ''}}" required>
                    </div>
                    
                    <div class="form-group mt-3">
                        <button type="submit" class="btn ol-btn-primary "> {{get_phrase("Update")}} </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-lg-6 col-md-12">
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

@endsection