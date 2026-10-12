<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kv\NewsletterSubscriber;
use Illuminate\Http\Request;

/** Admin list and CSV export of newsletter sign-ups (routes: routes/kv/admin-frontend.php, role 1 only). */
class NewsletterAdminController extends Controller
{
    public function index(Request $r)
    {
        $q = trim((string) $r->query('q', ''));
        $rows = $this->query($q)->paginate(50)->withQueryString();
        $total = NewsletterSubscriber::count();
        $active = NewsletterSubscriber::whereNull('unsubscribed_at')->count();

        return view('kervea.admin.newsletter', compact('rows', 'q', 'total', 'active'));
    }

    /**
     * GET export: every address that has not unsubscribed, with its consent proof.
     * Built in memory and returned as a plain response (the legacy PreventBackHistory middleware calls
     * ->header() on the response, which Symfony's streamed responses do not have).
     */
    public function export(Request $r)
    {
        $q = trim((string) $r->query('q', ''));
        $name = 'kervea-bulten-'.now()->format('Ymd-His').'.csv';

        $out = fopen('php://temp', 'w+');
        fputcsv($out, ['e-posta', 'dil', 'onay zamani', 'onay IP', 'onay tarayici']);
        $this->query($q)->whereNull('unsubscribed_at')->reorder('id')->chunkById(500, function ($chunk) use ($out) {
            foreach ($chunk as $s) {
                fputcsv($out, array_map([$this, 'cell'], [
                    $s->email, $s->locale, optional($s->consented_at)->format('Y-m-d H:i:s'),
                    $s->consent_ip, $s->consent_user_agent,
                ]));
            }
        });
        rewind($out);
        $csv = "\xEF\xBB\xBF".stream_get_contents($out);     // UTF-8 BOM so Excel opens Turkish characters correctly
        fclose($out);

        return response($csv, 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="'.$name.'"',
            'Cache-Control' => 'no-store',
        ]);
    }

    public function destroy(NewsletterSubscriber $subscriber)
    {
        $subscriber->delete();

        return back()->with('ok', 'Kayıt silindi.');
    }

    private function query(string $q)
    {
        $query = NewsletterSubscriber::query()->orderByDesc('id');
        if ($q !== '') {
            // "!" as the LIKE escape character works the same on MySQL and SQLite.
            $query->whereRaw("email like ? escape '!'", ['%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], mb_strtolower($q)).'%']);
        }

        return $query;
    }

    /** Spreadsheet formula injection: a cell that starts with = + - @ (or a control character) is opened as text. */
    private function cell($v): string
    {
        $v = (string) $v;

        return $v !== '' && strpbrk($v[0], "=+-@\t\r") !== false ? "'".$v : $v;
    }
}
