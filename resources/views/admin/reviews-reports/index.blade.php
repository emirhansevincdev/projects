@extends('layouts.admin')
@section('title', get_phrase('Reviews Reports'))
@section('admin_layout')

    <div class="ol-card radius-8px">
        <div class="ol-card-body my-2 py-3 px-20px">
            <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap flex-md-nowrap">
                <h4 class="title fs-16px">
                    <i class="fi-rr-settings-sliders me-2"></i>
                    {{ get_phrase('Reviews Reports List') }}
                </h4>
            </div>
        </div>
    </div>

    <div class="ol-card mt-3">
        <div class="ol-card-body p-3">
            @if (count($reports))
                <table id="datatable" class="table nowrap w-100">
                    <thead>
                        <tr>
                            <th> {{ get_phrase('ID') }} </th>
                            <th> {{ get_phrase('Message') }} </th>
                            <th> {{ get_phrase('Agent Name') }} </th>
                            <th> {{ get_phrase('Review') }} </th>
                            <th> {{ get_phrase('Listing Type') }} </th>
                            <th> {{ get_phrase('listing Title') }} </th>
                            <th> {{ get_phrase('Action') }} </th>
                        </tr>
                    </thead>
                    <tbody>
                        @php $num = 1 @endphp
                        @foreach ($reports as $item)
                            <tr>
                                <td> {{ $num++ }} </td>
                                <td> {{ $item->message }} </td>
                                <td> 
                                    @php
                                        $agent = App\Models\User::where('id', $item->agent_id)->first();
                                    @endphp
                                    {{ $agent->name }} 
                                </td>
                                <td> 
                                    @php
                                        $review = App\Models\Review::where('id', $item->review_id)->first();
                                    @endphp
                                    {{ $review->review }} 
                                </td>
                                <td> {{ $item->listing_type }} </td>
                                @php
                                    $listing = null;
                                    $listingTitle = 'N/A';

                                    switch ($item->listing_type) {
                                        case 'hotel':
                                            $listing = App\Models\HotelListing::find($item->listing_id);
                                            break;
                                        case 'car':
                                            $listing = App\Models\CarListing::find($item->listing_id);
                                            break;
                                        case 'beauty':
                                            $listing = App\Models\BeautyListing::find($item->listing_id);
                                            break;
                                        case 'restaurant':
                                            $listing = App\Models\RestaurantListing::find($item->listing_id);
                                            break;
                                        case 'real-estate':
                                            $listing = App\Models\RealEstateListing::find($item->listing_id);
                                            break;
                                        default:
                                            // Custom Listing
                                            $listing = App\Models\CustomListings::find($item->listing_id);
                                            break;
                                    }

                                    if ($listing) {
                                        $listingTitle = $listing->title ?? 'No Title';
                                    }
                                @endphp
                                <td> {{ $listingTitle }} </td>
                                <td>
                                    <div class="dropdown ol-icon-dropdown">
                                        <button class="px-2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span class="fi-rr-menu-dots-vertical"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item fs-14px" href="{{route('listing.details',['type'=>$item->listing_type, 'id'=>$item->listing_id, 'slug'=>slugify($listingTitle)])}}" target="_blank"> {{ get_phrase('View on Frontend') }} </a></li>

                                            <li><a class="dropdown-item fs-14px" onclick="delete_modal('{{ route('admin.listing_review_delete', ['id' => $item->review_id]) }}')" href="javascript:void(0);"> {{ get_phrase('Delete the Review') }} </a></li>
                                            
                                            <li><a class="dropdown-item fs-14px" onclick="delete_modal('{{ route('admin.review_report_delete', ['id' => $item->id]) }}')" href="javascript:void(0);"> {{ get_phrase('Delete Report') }} </a></li>
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
