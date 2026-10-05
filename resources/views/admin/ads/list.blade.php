@extends('layouts.admin')
@section('title', get_phrase('Ads Post'))
@section('admin_layout')

<div class="ol-card radius-8px">
    <div class="ol-card-body my-3 py-12px px-20px">
        <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap flex-md-nowrap">
            <h4 class="title fs-16px">
                <i class="fi-rr-settings-sliders me-2"></i>
                {{ get_phrase('Ads  Lists') }}
            </h4>

            <a href="{{route('admin.ads.add')}}" class="btn ol-btn-outline-secondary d-flex align-items-center cg-10px">
                <span class="fi-rr-plus"></span>
                <span>{{ get_phrase('Add new Ads') }}</span>
            </a>
        </div>
    </div>
</div>
<div class="ol-card mt-3">
    <div class="ol-card-body p-3">
@if(count($ads))
<table id="datatable" class="table  nowrap w-100">
    <thead class="table-light">
        <tr>
            <th>#</th>
            <th>{{ get_phrase('Image') }}</th>
            <th>{{ get_phrase('Title') }}</th>
            <th>{{ get_phrase('Type') }}</th>
            <th>{{ get_phrase('Publish Date') }}</th>
            <th>{{ get_phrase('Publish Status') }}</th>
            <th>{{ get_phrase('System Status') }}</th>
            <th class="text-center">{{ get_phrase('Action') }}</th>
        </tr>
    </thead>
    <tbody>

        @foreach($ads as $key => $add)

        @php
            $today = \Carbon\Carbon::now()->startOfDay();
            $start = \Carbon\Carbon::parse($add->start_date);
            $end   = \Carbon\Carbon::parse($add->end_date);

        @endphp

        <tr>
            <td>{{ ++$key }}</td>
            <td>
                @if($add->image && file_exists(public_path($add->image)))
                    <img src="{{ asset($add->image) }}" width="60" height="60" class="rounded shadow-sm">
                @else
                    <img src="{{ asset('image/placeholder.png') }}" width="60" height="60" class="rounded shadow-sm">
                @endif
            </td>
            <td>{{ $add->title }}</td>
            <td>  <span class=" text-dark text-capitalize">  {{ $add->type }} </span> </td>
            <td>
                <small  style="font-size: 14px;">
                    {{ $start->format('d M Y') }}
                    <br> {{get_phrase('To')}} <br>
                    {{ $end->format('d M Y') }}
                </small>
            </td>
           <td>
                @if($add->status == 0)
                    <span class="badge bg-dark">{{get_phrase('Inactive')}}</span>
                @elseif(\Carbon\Carbon::now()->startOfDay()->lt(\Carbon\Carbon::parse($add->start_date)))
                    <span class="badge bg-warning text-dark">{{get_phrase('Scheduled')}}</span>
                @elseif(\Carbon\Carbon::now()->startOfDay()->gt(\Carbon\Carbon::parse($add->end_date)))
                    <span class="badge bg-danger">{{get_phrase('Expired')}}</span>
                @else
                    <span class="badge bg-success">{{get_phrase('Active')}}</span>
                @endif
            </td>
            <td>
                @if($add->status == 1)
                    <span class="badge bg-success">{{get_phrase('Active')}}</span>
                @else
                    <span class="badge bg-danger">{{get_phrase('Disabled')}}</span>
                @endif
            </td>
            <td class="text-center">
                <div class="dropdown ol-icon-dropdown">
                    <button class="px-2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="fi-rr-menu-dots-vertical"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item fs-14px"  href="{{ route('admin.ads.edit',['id'=>$add->id]) }}"> {{ get_phrase('Edit') }}</a>
                        </li>
                        <li>
                            <a class="dropdown-item fs-14px" onclick="delete_modal('{{ route('admin.ads.delete',['id'=>$add->id]) }}')"
                               href="javascript:void(0);">  {{ get_phrase('Delete') }}
                            </a>
                        </li>
                    </ul>
                </div>
            </td>

        </tr>
        @endforeach

    </tbody>
</table>

@else
    @include('layouts.no_data_found')
@endif

    </div>
</div>


@endsection