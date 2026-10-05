<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Session;

class BadgeController extends Controller
{
    // Badge Index 
    public function index()
    {
        $badges = Badge::all();
        
        return view('admin.setting.gamification', compact('badges'));
    }

    // Create modal index 
    public function create(){
        return view('admin.setting.gamification_create');
    }

    // Badge Store 
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'field' => 'required|string|max:255',
            'value_from' => 'required|numeric|min:0',
            'value_to' => 'required|numeric|gte:value_from',
            'description' => 'nullable|string',
            'icon' => 'required|image|mimes:png,jpg,jpeg,webp|max:2048',
        ]);

        // icon upload
        $iconPath = null;
        if ($request->hasFile('icon')) {
            $icon = $request->file('icon');
            $randomNumbers = mt_rand(1000, 9999);
            $iconName = 'icon' . time() . $randomNumbers . '.' . $icon->getClientOriginalExtension();
            $icon->move(public_path('uploads/badges'), $iconName);
            $iconPath = 'uploads/badges/' . $iconName;
        }

        Badge::create([
            'title' => $request->title,
            'field' => $request->field,
            'value_from' => $request->value_from,
            'value_to' => $request->value_to,
            'description' => $request->description,
            'icon' => $iconPath,
            'is_active' => 1, 
        ]);

        Session::flash('success', get_phrase('Badge added successfully!'));
        return redirect()->back();
    }

    public function edit($id)
    {
        $page_data["badge"] = Badge::find($id);
        return view("admin.setting.gamification_edit", $page_data);
    }
    
    public function update(Request $request, $id)
    {

        $badge = Badge::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'field' => 'required|string|max:255',
            'value_from' => 'required|numeric|min:0',
            'value_to' => 'required|numeric|gte:value_from',
            'description' => 'nullable|string',
            'icon' => 'nullable|image|mimes:png,jpg,jpeg,webp|max:2048',
        ]);

        // icon
        $oldIconPath = $badge->icon;
        $iconPath = $oldIconPath;
        if ($request->hasFile('icon')) {
            $icon = $request->file('icon');
            $randomNumbers = mt_rand(1000, 9999);
            $iconName = 'icon' . time() . $randomNumbers . '.' . $icon->getClientOriginalExtension();
            $icon->move(public_path('uploads/badges'), $iconName);
            $iconPath = 'uploads/badges/' . $iconName;
            if ($oldIconPath && File::exists(public_path($oldIconPath))) {
                File::delete(public_path($oldIconPath));
            }
        }

        $badge->update([
            'title' => $request->title,
            'field' => $request->field,
            'value_from' => $request->value_from,
            'value_to' => $request->value_to,
            'description' => $request->description,
            'icon' => $iconPath,
        ]);

        Session::flash('success', get_phrase('Badge updated successfully!'));
        return redirect()->back();
    }

    // Badge Status Update 
    public function status_toggle($id)
    {
        $badge = Badge::findOrFail($id);
        $badge->is_active = $badge->is_active == 1 ? 0 : 1;
        $badge->save();

        Session::flash('success', get_phrase('Badge status updated successfully!'));
        return redirect()->back();
    }

    // Badge Destroy
    public function destroy($id)
    {
        $badge = Badge::findOrFail($id);

        // icon delete
        if ($badge->icon && File::exists(public_path($badge->icon))) {
            File::delete(public_path($badge->icon));
        }

        $badge->delete();

        Session::flash('success', get_phrase('Badge deleted successfully!'));
        return redirect()->back();
    }

    public function agent_badges()
    {
        $page_data['active'] = 'badges';

        $agentId = auth()->user()->id;

        // USER STATS
        $reviewCount = Review::where('agent_id', $agentId)->count();

        $fiveStarReviewCount = Review::where('agent_id', $agentId)
            ->where('rating', 5)
            ->count();

        // Multiple listing tables
        $listingTables = [
            'beauty_listings',
            'car_listings',
            'hotel_listings',
            'real_estate_listings',
            'restaurant_listings',
            'custom_listings'
        ];

        $totalListings = 0;
        foreach ($listingTables as $table) {
            $totalListings += DB::table($table)
                ->where('user_id', $agentId)
                ->where('visibility', 'visible')
                ->count();
        }

        $articleCount = DB::table('blogs')
            ->where('user_id', $agentId)
            ->where('status', 1)
            ->count();

        // MAP USER VALUES BY FIELD
        $userStats = [
            'number_of_review'         => $reviewCount,
            'number_of_5_star_review'  => $fiveStarReviewCount,
            'number_of_listing'        => $totalListings,
            'number_of_article'        => $articleCount,
        ];

        // FETCH BADGES
        $allBadges = Badge::where('is_active', 1)
            ->orderBy('value_from')
            ->get();

        /* -----------------------------
        | FILTER + GROUP BY FIELD
        | userValue >= value_from
        |-----------------------------*/

        $page_data['agentBadges'] = $allBadges
            ->filter(function ($badge) use ($userStats) {

                if (!isset($userStats[$badge->field])) {
                    return false;
                }

                return $userStats[$badge->field] >= $badge->value_from;
            })
            ->sortBy('value_from')     // same field sorted
            ->groupBy('field');        // same field together

        return view('user.agent.badges', $page_data);
    }

}
