@extends('layouts.admin')
@section('title', get_phrase('Blog Permission'))
@push('css')
    <style>
        .form-check-input-radio:checked {
            background-color: transparent !important;
            border-color: #99a1b7 !important;
        }
    </style>
@endpush
@section('admin_layout')

<div class="ol-card radius-8px">
    <div class="ol-card-body my-2 py-12px px-20px">
        <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap flex-md-nowrap">
            <h4 class="title fs-16px">
                <i class="fi-rr-settings-sliders me-2"></i>
                {{ get_phrase('Blog Permission') }}
            </h4>
        </div>
    </div>
</div>

<div class="ol-card mt-3">
    <div class="ol-card-body p-3">
        <h4 class="title fs-16px fw-medium mb-10px">
            {{ get_phrase('Agents blog permission?') }}
        </h4>
        <form method="POST" action="{{ route('admin.blog-permission.update') }}">
            @csrf
            <div class="ol-radio-wrap">
                @php
                    $permissionEnabled = \App\Models\User::where('is_agent',1)
                        ->where('can_create_blog',1)
                        ->exists();
                @endphp
                <div class="form-check form-check-radio mb-2">
                    <input class="form-check-input form-check-input-radio"
                        type="radio"
                        name="blog_permission"
                        value="yes"
                        id="permission_yes"
                        {{ $permissionEnabled ? 'checked' : '' }}>
                    <label class="form-check-label" for="permission_yes">
                        Yes
                    </label>
                </div>
                <div class="form-check form-check-radio">
                    <input class="form-check-input form-check-input-radio"
                        type="radio"
                        name="blog_permission"
                        value="no"
                        id="permission_no"
                        {{ !$permissionEnabled ? 'checked' : '' }}>
                    <label class="form-check-label" for="permission_no">
                        No
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary mt-3">
                Save Permission
            </button>
        </form>
    </div>
</div>


@endsection