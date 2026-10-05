@auth
    @if(
        auth()->user()->type === 'agent'
        && check_subscription(auth()->id())
    )
        @php
            $existingClaim = \App\Models\Claim::where('listing_id', $listing->id)
                ->where('listing_type', $listing->type)
                ->where('user_id', auth()->id())
                ->exists();
        @endphp

        @if(!$existingClaim)
            <a href="javascript:;"
               onclick="edit_modal(
                   'modal-md',
                   '{{ route('claimForm',['type'=>$listing->type ,'id'=>$listing->id]) }}',
                   '{{ get_phrase('Claim Listing') }}'
               )"
               class="submit-fluid-btn2 mt-2">
                {{ get_phrase('Claim Listing') }}
            </a>
        @else
            <button type="button" class="submit-fluid-btn mt-2" disabled>
                {{ get_phrase('Already Claimed') }}
            </button>
        @endif
    @endif
@else
    {{-- ... --}}
@endauth