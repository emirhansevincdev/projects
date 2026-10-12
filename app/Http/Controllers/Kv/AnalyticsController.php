<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Services\Kv\AnalyticsReport;
use App\Services\Kv\CompanyContext;
use App\Services\Kv\FirmPresenter;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    /**
     * GET /kv/analytics?range=7|30|90|365
     * The company is ALWAYS the acting one from CompanyContext (route middleware kv.member:analytics); nothing in the request
     * can select another company. Premium is the OWNER's subscription (FirmPresenter::isPro resolves team members to it).
     */
    public function show(Request $r)
    {
        $v = $r->validate(['range' => 'nullable|integer|in:'.implode(',', AnalyticsReport::RANGES)]);
        $ctx = CompanyContext::forRequest($r);
        abort_unless($ctx, 403);

        $report = AnalyticsReport::build($ctx['company'], FirmPresenter::isPro($r->user()), (int) ($v['range'] ?? 30));
        return response()->json($report)->header('Cache-Control', 'no-store');
    }
}
