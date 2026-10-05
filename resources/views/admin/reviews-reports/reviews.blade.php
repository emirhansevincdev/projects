@extends('layouts.admin')
@section('title', get_phrase('Reviews'))
@section('admin_layout')

    @include('admin.setting.user_review_list')

@endsection
