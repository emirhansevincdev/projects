@php try { $kvOpenReports = \App\Models\Kv\MessageReport::where('status', 'open')->count(); } catch (\Throwable $e) { $kvOpenReports = 0; } @endphp
<a href="{{ route('admin.kervea.messages.reports') }}" class="{{ request()->routeIs('admin.kervea.messages.*') ? 'on' : '' }}">Mesaj Şikayetleri @if($kvOpenReports)<span class="n">{{ $kvOpenReports }}</span>@endif</a>
