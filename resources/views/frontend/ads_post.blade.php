
@php 
    $today = \Carbon\Carbon::now()->format('Y-m-d');

    $ads = \App\Models\Ads::where('type', $listing->type)
        ->where('status', 1)
        ->whereDate('start_date', '<=', $today)
        ->whereDate('end_date', '>=', $today)
        ->inRandomOrder()
        ->take(2)
        ->get();
@endphp
@if($ads->count() > 0)
<div class="ads-post">
    <div class="ads-post-header">
        <h4 class="sub-title mb-16">{{ get_phrase('Sponsored Post') }}</h4>
    </div>
    <div class="ads-post-body">
        @foreach ($ads as $ad)
            <a href="{{ $ad->url }}" target="_blank" class="ads-post-item">
                <div>
                    @if($ad->image && file_exists(public_path($ad->image)))
                        <img src="{{ asset($ad->image) }}" alt="{{ $ad->title }}" class="ads-post-img">
                    @else
                        <img src="{{ asset('image/placeholder.png') }}" alt="placeholder" class="ads-post-img">
                    @endif
                </div>
                <div class="ads-post-text">
                    <h6 class="ads-post-title">{{ $ad->title }}</h6>
                    <p class="ads-post-description"> {{ \Illuminate\Support\Str::limit(trim(strip_tags($ad->description)), 100) }} </p>
                </div>
            </a>
        @endforeach

    </div>
</div>
@endif