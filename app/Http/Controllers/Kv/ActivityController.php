<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Services\Kv\Activity;
use App\Services\Kv\CompanyContext;
use Illuminate\Http\Request;

/** GET /kv/activity: the newest entries of the acting person's own company (route middleware kv.member:team). */
class ActivityController extends Controller
{
    public function index(Request $r)
    {
        $ctx = CompanyContext::forRequest($r);
        abort_unless($ctx, 403);
        $limit = max(1, (int) config('kervea.team.activity_limit', 100));
        $items = Activity::recent($ctx['company']->id, $limit);
        $me = $r->user()->id;
        foreach ($items as &$i) {
            $i['you'] = $i['user_id'] !== null && (int) $i['user_id'] === (int) $me;
            unset($i['user_id']);
        }
        unset($i);
        return response()->json(['items' => $items, 'limit' => $limit])->header('Cache-Control', 'no-store');
    }
}
