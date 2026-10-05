@php 
$calendly = App\Models\Calendly::where('user_id', $listing->user_id)->first();
$event_types = [];
$standard_event_types = [];

// if (addon_status('calendly') == 1 && !empty($calendly->calendly_info)) 
if (!empty($calendly->calendly_info)) {
    $token = $calendly->calendly_info; 

    if (!empty($token)) {
        try {
            $httpOptions = [];
            if (app()->environment('local')) {
                $httpOptions['verify'] = false;
            }

            $userResponse = Http::withOptions($httpOptions)
                ->withToken($token)
                ->get('https://api.calendly.com/users/me');

            if ($userResponse->successful()) {
                $userUri = $userResponse->json('resource.uri');

                if ($userUri) {
                    $nextPage = "https://api.calendly.com/event_types?user={$userUri}";
                    while ($nextPage) {
                        $eventResponse = Http::withOptions($httpOptions)
                            ->withToken($token)
                            ->get($nextPage);

                        if ($eventResponse->successful()) {
                            $json = $eventResponse->json();
                            $event_types = array_merge($event_types, $json['collection'] ?? []);
                            $nextPage = $json['pagination']['next_page'] ?? null;
                        } else {
                            break;
                        }
                    }

                    $nextPage = "https://api.calendly.com/standard_event_types?user={$userUri}";
                    while ($nextPage) {
                        $standardResponse = Http::withOptions($httpOptions)
                            ->withToken($token)
                            ->get($nextPage);

                        if ($standardResponse->successful()) {
                            $json = $standardResponse->json();
                            $standard_event_types = array_merge($standard_event_types, $json['collection'] ?? []);
                            $nextPage = $json['pagination']['next_page'] ?? null;
                        } else {
                            break;
                        }
                    }
                }
            }
        } catch (\Exception $e) {
            \Log::error('Calendly API Exception', ['error' => $e->getMessage()]);
        }
    }
}
@endphp

@if(!empty($event_types) || !empty($standard_event_types))
<style>
    .event-card{
        box-shadow: 0 4px 40px 0 rgba(0, 0, 0, 0.1);
        background: var(--whiteColor);
        border-radius: 12px;
        padding: 5px;
        border: none;
    }
    .hidden { display: none !important; }
    .event-card:hover { box-shadow: 0 0.5rem 1rem rgba(0,0,0,.15); }
</style>

<div class="at-details-description">
     <h4 class="title mb-16">{{ get_phrase('Calendly') }}</h4>
     <p class="text-muted mb-2">{{get_phrase('Schedule your meetings easily using Calendly.')}}</p>
</div>

<div id="event-list" class="mb-3 row mt-3">

    {{-- Normal Event Types --}}
    @if(!empty($event_types))
        @foreach($event_types as $event)
            <div class="col-lg-6">
                <div class="card mb-3 event-card" data-url="{{ $event['scheduling_url'] ?? '#' }}" style="cursor:pointer;">
                    <div class="card-body d-flex align-items-start">
                        <div>
                            <h5 class="card-title" style="font-size: 16px; font-weight: 600;">{{ $event['name'] }}</h5>
                            <p class="card-subtitle mb-1 text-muted">
                                {{get_phrase('Duration')}}:
                                @if(!empty($event['duration']))
                                    @if($event['duration'] >= 60)
                                        {{ $event['duration'] / 60 }} hr{{ $event['duration'] / 60 > 1 ? 's' : '' }}
                                    @else
                                        {{ $event['duration'] }} min{{ $event['duration'] > 1 ? 's' : '' }}
                                    @endif
                                @endif
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    @endif

</div>

<div id="calendly-embed" class="position-relative mt-3 hidden" style="min-width:300px; height:970px;">
    <button id="calendly-back" class="white-btn1 position-absolute" style="top:-57px; right:0px; z-index:10; background: transparent;">{{get_phrase('← Back')}}</button>
    <div id="calendly-widget" class="w-100 h-100"></div>
</div>

 <script src="{{ asset('assets/frontend/js/widget.js') }}"></script>
<script>
window.isLoggedIn = "{{ auth()->check() ? 'true' : 'false' }}";

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.event-card');
    const eventList = document.getElementById('event-list');
    const embedBox = document.getElementById('calendly-embed');
    const widgetBox = document.getElementById('calendly-widget');
    const backBtn = document.getElementById('calendly-back');

    // Event card click → show widget
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if(!url || url === '#') return;

            eventList.classList.add('hidden');
            embedBox.classList.remove('hidden');

            widgetBox.innerHTML = '';
            Calendly.initInlineWidget({
                url: url,
                parentElement: widgetBox,
                prefill: {},
                utm: {}
            });

            embedBox.scrollIntoView({ behavior: 'smooth' });
        });
    });

    backBtn.addEventListener('click', function() {
        embedBox.classList.add('hidden');
        eventList.classList.remove('hidden');
        widgetBox.innerHTML = '';
        window.scrollTo({ top: eventList.offsetTop, behavior: 'smooth' });
    });

    // Booking complete → check login
    window.addEventListener("message", function(e) {
        if (e.data.event && e.data.event === "calendly.event_scheduled") {

            if(window.isLoggedIn !== 'true'){
                // Login  → warning, widget close
                warning("Please login first to schedule a meeting!");
                embedBox.classList.add('hidden');
                eventList.classList.remove('hidden');
                widgetBox.innerHTML = '';
                return;
            }
            success("Your meeting has been scheduled successfully!");
            
            }
    });
});
</script>

@endif
