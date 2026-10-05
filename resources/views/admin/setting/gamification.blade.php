@extends('layouts.admin')
@section('title', get_phrase('Gamification Badge Settings'))
@push('css')
<style>
    @media (max-width: 991px) {
        .table-responsive {
            min-width: unset;
        }
    }
</style>
@endpush
@section('admin_layout')

<div class="ol-card radius-8px">
    <div class="ol-card-body my-3 py-12px px-20px">
        <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap flex-md-nowrap">
            <h4 class="title fs-16px">
                <i class="fi-rr-settings-sliders me-2"></i>
                {{ get_phrase('Gamification Badges') }}
            </h4>
            <a href="javascript:;" onclick="modal('modal-md', '{{route('admin.gamification_badge.create')}}', '{{get_phrase('Add Badge')}}')" class="btn ol-btn-outline-secondary d-flex align-items-center cg-10px">
                <span class="fi-rr-plus"></span>
                <span>{{ get_phrase('Add new Badge') }}</span>
            </a>
        </div>
    </div>
</div>

<div class="ol-card p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <p class="title text-14px m-0">{{ get_phrase('Manage Badges') }}</p>
    </div>

    <div class="ol-card-body">
        <ul class="nav nav-tabs eNav-Tabs-custom eTab" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="badgeType1-tab" data-bs-toggle="tab" data-bs-target="#badgeType1" type="button" role="tab" aria-controls="badgeType1" aria-selected="true">
                    {{ get_phrase('Number of Review') }}
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="badgeType2-tab" data-bs-toggle="tab" data-bs-target="#badgeType2" type="button" role="tab" aria-controls="badgeType2" aria-selected="false">
                    {{ get_phrase('Number of 5 star Review') }}
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="badgeType3-tab" data-bs-toggle="tab" data-bs-target="#badgeType3" type="button" role="tab" aria-controls="badgeType3" aria-selected="false">
                    {{ get_phrase('Number of Listing') }}
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="badgeType4-tab" data-bs-toggle="tab" data-bs-target="#badgeType4" type="button" role="tab" aria-controls="badgeType4" aria-selected="false">
                    {{ get_phrase('Number of Article') }}
                </button>
            </li>
        </ul>

        <div class="tab-content eNav-Tabs-content mt-3" id="myTabContent">
            <!-- Active Tab: Number of Review -->
            <div class="tab-pane fade show active" id="badgeType1" role="tabpanel" aria-labelledby="badgeType1-tab">
                <div class="table-responsive">
                    <table id="datatable" class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Badge Name</th>
                                <th>Field</th>
                                <th>Range (From - To)</th>
                                <th>Icon</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $number_of_review = $badges->where('field', 'number_of_review');
                            @endphp
                            @foreach($number_of_review as $badge)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $badge->title }}</td>
                                    <td>{{ ucfirst(str_replace('_', ' ', $badge->field)) }}</td>
                                    <td>{{ $badge->value_from }} - {{ $badge->value_to }}</td>
                                    <td>
                                        @if($badge->icon)
                                        <img src="{{ asset($badge->icon) }}" alt="{{ $badge->name }}" width="40" height="40" class="object-fit-contain">
                                        @else
                                        <span class="text-muted">No Icon</span>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="badge d-inline {{ $badge->is_active ? 'bg-success' : 'bg-danger' }}">
                                            {{ $badge->is_active ? 'Active' : 'Inactive' }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="dropdown ol-icon-dropdown ol-icon-dropdown-transparent">
                                            <button class="btn ol-btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                                <span class="fi-rr-menu-dots-vertical"></span>
                                            </button>

                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a onclick="edit_modal('modal-md','{{route('admin.gamification_badge.edit',['id'=>$badge->id])}}','{{get_phrase('Edit Badge')}}')" class="dropdown-item"  href="#">{{get_phrase('Edit Badge')}}</a>
                                                </li>
                                                <li><a class="dropdown-item" href="javascript:void(0);" onclick="delete_modal('{{route('admin.gamification_badge.status-toggle',['id'=>$badge->id])}}')">
                                                    {{ $badge->is_active == 1 ? 'Make As Inactive' : 'Make As Active' }}
                                                </a></li>
                                                <li><a class="dropdown-item" href="#" onclick="delete_modal('{{route('admin.gamification_badge.delete',['id'=>$badge->id])}}')">{{ get_phrase('Delete Badge') }}</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Tab: Number of 5 star Review -->
            <div class="tab-pane fade" id="badgeType2" role="tabpanel" aria-labelledby="badgeType2-tab">
                <div class="table-responsive">
                    <table id="datatable2" class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Badge Name</th>
                                <th>Field</th>
                                <th>Range (From - To)</th>
                                <th>Icon</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $five_star_review = $badges->where('field', 'number_of_5_star_review');
                            @endphp
                            @foreach($five_star_review as $badge)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $badge->title }}</td>
                                    <td>{{ ucfirst(str_replace('_', ' ', $badge->field)) }}</td>
                                    <td>{{ $badge->value_from }} - {{ $badge->value_to }}</td>
                                    <td>
                                        @if($badge->icon)
                                        <img src="{{ asset($badge->icon) }}" alt="{{ $badge->name }}" width="40" height="40" class="object-fit-contain">
                                        @else
                                        <span class="text-muted">No Icon</span>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="badge d-inline {{ $badge->is_active ? 'bg-success' : 'bg-danger' }}">
                                            {{ $badge->is_active ? 'Active' : 'Inactive' }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="dropdown ol-icon-dropdown ol-icon-dropdown-transparent">
                                            <button class="btn ol-btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                                <span class="fi-rr-menu-dots-vertical"></span>
                                            </button>

                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a onclick="edit_modal('modal-md','{{route('admin.gamification_badge.edit',['id'=>$badge->id])}}','{{get_phrase('Edit Badge')}}')" class="dropdown-item"  href="#">{{get_phrase('Edit Badge')}}</a>
                                                </li>
                                                <li><a class="dropdown-item" href="javascript:void(0);" onclick="delete_modal('{{route('admin.gamification_badge.status-toggle',['id'=>$badge->id])}}')">
                                                    {{ $badge->is_active == 1 ? 'Make As Inactive' : 'Make As Active' }}
                                                </a></li>
                                                <li><a class="dropdown-item" href="#" onclick="delete_modal('{{route('admin.gamification_badge.delete',['id'=>$badge->id])}}')">{{ get_phrase('Delete Badge') }}</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Tab: Number of Listing -->
            <div class="tab-pane fade" id="badgeType3" role="tabpanel" aria-labelledby="badgeType3-tab">
                <div class="table-responsive">
                    <table id="datatable3" class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Badge Name</th>
                                <th>Field</th>
                                <th>Range (From - To)</th>
                                <th>Icon</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $number_of_listing = $badges->where('field', 'number_of_listing');
                            @endphp
                            @foreach($number_of_listing as $badge)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $badge->title }}</td>
                                    <td>{{ ucfirst(str_replace('_', ' ', $badge->field)) }}</td>
                                    <td>{{ $badge->value_from }} - {{ $badge->value_to }}</td>
                                    <td>
                                        @if($badge->icon)
                                        <img src="{{ asset($badge->icon) }}" alt="{{ $badge->name }}" width="40" height="40" class="object-fit-contain">
                                        @else
                                        <span class="text-muted">No Icon</span>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="badge d-inline {{ $badge->is_active ? 'bg-success' : 'bg-danger' }}">
                                            {{ $badge->is_active ? 'Active' : 'Inactive' }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="dropdown ol-icon-dropdown ol-icon-dropdown-transparent">
                                            <button class="btn ol-btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                                <span class="fi-rr-menu-dots-vertical"></span>
                                            </button>

                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a onclick="edit_modal('modal-md','{{route('admin.gamification_badge.edit',['id'=>$badge->id])}}','{{get_phrase('Edit Badge')}}')" class="dropdown-item"  href="javascript:void(0);">{{get_phrase('Edit Badge')}}</a>
                                                </li>
                                                <li><a class="dropdown-item" href="javascript:void(0);" onclick="delete_modal('{{route('admin.gamification_badge.status-toggle',['id'=>$badge->id])}}')">
                                                    {{ $badge->is_active == 1 ? 'Make As Inactive' : 'Make As Active' }}
                                                </a></li>
                                                <li><a class="dropdown-item" href="javascript:void(0);" onclick="delete_modal('{{route('admin.gamification_badge.delete',['id'=>$badge->id])}}')">{{ get_phrase('Delete Badge') }}</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Tab: Number of Article -->
            <div class="tab-pane fade" id="badgeType4" role="tabpanel" aria-labelledby="badgeType4-tab">
                <div class="table-responsive">
                    <table id="datatable4" class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Badge Name</th>
                                <th>Field</th>
                                <th>Range (From - To)</th>
                                <th>Icon</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $number_of_article = $badges->where('field', 'number_of_article');
                            @endphp
                            @foreach($number_of_article as $badge)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $badge->title }}</td>
                                    <td>{{ ucfirst(str_replace('_', ' ', $badge->field)) }}</td>
                                    <td>{{ $badge->value_from }} - {{ $badge->value_to }}</td>
                                    <td>
                                        @if($badge->icon)
                                        <img src="{{ asset($badge->icon) }}" alt="{{ $badge->name }}" width="40" height="40" class="object-fit-contain">
                                        @else
                                        <span class="text-muted">No Icon</span>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="badge d-inline {{ $badge->is_active ? 'bg-success' : 'bg-danger' }}">
                                            {{ $badge->is_active ? 'Active' : 'Inactive' }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="dropdown ol-icon-dropdown ol-icon-dropdown-transparent">
                                            <button class="btn ol-btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                                <span class="fi-rr-menu-dots-vertical"></span>
                                            </button>

                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a onclick="edit_modal('modal-md','{{route('admin.gamification_badge.edit',['id'=>$badge->id])}}','{{get_phrase('Edit Badge')}}')" class="dropdown-item"  href="javascript:void(0);">{{get_phrase('Edit Badge')}}</a>
                                                </li>
                                                <li><a class="dropdown-item" href="javascript:void(0);" onclick="delete_modal('{{route('admin.gamification_badge.status-toggle',['id'=>$badge->id])}}')">
                                                    {{ $badge->is_active == 1 ? 'Make As Inactive' : 'Make As Active' }}
                                                </a></li>
                                                <li><a class="dropdown-item" href="javascript:void(0);" onclick="delete_modal('{{route('admin.gamification_badge.delete',['id'=>$badge->id])}}')">{{ get_phrase('Delete Badge') }}</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</div>

@endsection

@push('js')
<script>
    "use strict";

    let table2, table3, table4;

    $(document).ready(function () {
        table2 = $('#datatable2').DataTable({ responsive: true, autoWidth: false });
        table3 = $('#datatable3').DataTable({ responsive: true, autoWidth: false });
        table4 = $('#datatable4').DataTable({ responsive: true, autoWidth: false });
    });

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function () {
        $.fn.dataTable.tables({ visible: true, api: true })
            .columns.adjust()
            .responsive.recalc();
    });

    function deleteRow(table, btn) {
        table.row($(btn).closest('tr')).remove().draw(false);

        $.fn.dataTable.tables({ api: true })
            .columns.adjust()
            .responsive.recalc();
    }

</script>
@endpush