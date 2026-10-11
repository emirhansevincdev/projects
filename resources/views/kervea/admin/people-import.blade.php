@extends('kervea.admin.layout')
@section('title','Kişiler · CSV içe aktar')
@section('content')
<h1>Kişiler · CSV içe aktar</h1>
<p class="sub">Excel’de “CSV UTF-8” olarak kaydedin. Bir seferde en fazla {{ number_format($max) }} satır. Geçerli satırlar eklenir, hatalı satırlar aşağıda nedeniyle listelenir.</p>
<div class="filters">
 <a href="{{ route('admin.kervea.people') }}">Liste</a>
 <a href="{{ route('admin.kervea.people.import') }}" class="on">CSV içe aktar</a>
 <a href="{{ route('admin.kervea.people.removals') }}">KVKK kaldırma talepleri @if($newRemovals)<span class="n" style="background:#e0a100;color:#201500;border-radius:99px;font-size:11px;font-weight:700;padding:1px 8px">{{ $newRemovals }}</span>@endif</a>
</div>

@if($report)
 <div class="card" style="border-color:{{ $report['fatal'] ? '#f4b8b3' : '#b6e6d0' }}">
  <h3 style="margin:0 0 6px;color:var(--ink)">Son içe aktarma raporu</h3>
  @if($report['fatal'])
   <div class="err" style="margin:0">{{ $report['fatal'] }}</div>
  @else
   <p style="margin:0 0 8px"><b>{{ $report['imported'] }}</b> kişi eklendi · <b>{{ $report['duplicates'] }}</b> tekrar atlandı (aynı e-posta ya da ad+firma) · <b>{{ count(array_filter($report['errors'], fn($e) => $e['row'] > 0)) }}</b> satır hatalı @if($report['suppressed']) · <b>{{ $report['suppressed'] }}</b> kaldırma talebi nedeniyle atlandı @endif · toplam {{ $report['rows'] }} satır</p>
   @if($report['errors'])
    <table><thead><tr><th style="width:90px">Satır</th><th>Neden</th></tr></thead><tbody>
    @foreach($report['errors'] as $e)<tr><td>{{ $e['row'] ?: '—' }}</td><td>{{ $e['msg'] }}</td></tr>@endforeach
    </tbody></table>
   @endif
  @endif
 </div>
@endif

<div class="grid2" style="align-items:start">
 <div class="card">
  <h3 style="margin:0 0 6px;color:var(--ink)">Dosya yükle</h3>
  <form method="post" action="{{ route('admin.kervea.people.import.run') }}" enctype="multipart/form-data">@csrf
   <input type="file" name="file" accept=".csv,text/csv,text/plain" required>
   <p style="margin-top:12px"><button class="btn">İçe aktar</button> <a class="btn sec" href="{{ route('admin.kervea.people.import.template') }}">Şablonu indir (.csv)</a></p>
  </form>
  <h3 style="margin:18px 0 6px;color:var(--ink)">Sütunlar</h3>
  <table><thead><tr><th>Başlık</th><th>Zorunlu</th><th>Açıklama</th></tr></thead><tbody>
   <tr><td><code>name</code></td><td>evet</td><td>Ad soyad</td></tr>
   <tr><td><code>title</code></td><td></td><td>Ünvan</td></tr>
   <tr><td><code>department</code></td><td></td><td>ceo, purchasing, sales, export, ops, other (boşsa other)</td></tr>
   <tr><td><code>company_name</code></td><td>evet</td><td>Firma adı</td></tr>
   <tr><td><code>country</code></td><td>evet</td><td>2 harfli ülke kodu (de, fi, ae …)</td></tr>
   <tr><td><code>sector</code></td><td>evet</td><td>Sektör numarası, adı veya kısa adı (yanda)</td></tr>
   <tr><td><code>email</code>, <code>phone</code></td><td>biri</td><td>E-posta ve/veya telefon (<code>+90 212 …</code>)</td></tr>
   <tr><td><code>linkedin</code></td><td></td><td>https://…linkedin.com/…</td></tr>
  </tbody></table>
  <p class="k" style="text-transform:none;margin-top:10px">Güvenlik: <code>=</code> <code>@</code> ile başlayan hücreler (ve telefon dışındaki <code>+</code> / <code>-</code>) reddedilir; HTML etiketleri temizlenir; aynı e-posta (ya da ad + firma) atlanır; kaldırma talebi olan kişiler yeniden eklenmez.</p>
 </div>
 <div class="card">
  <h3 style="margin:0 0 6px;color:var(--ink)">Sektör numaraları</h3>
  <table><thead><tr><th style="width:60px">No</th><th>Türkçe</th><th>English</th></tr></thead><tbody>
   @foreach($sectorHelp as [$i, $tr, $en])<tr><td>{{ $i }}</td><td>{{ $tr }}</td><td>{{ $en }}</td></tr>@endforeach
  </tbody></table>
 </div>
</div>
@endsection
