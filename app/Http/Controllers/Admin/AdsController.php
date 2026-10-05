<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ads;
use Carbon\Carbon;
use Illuminate\Support\Facades\Session;

class AdsController extends Controller
{
    public function ads_list()
    {
        $page_data['ads'] = Ads::orderBy('id', 'DESC')->get();
        return view('admin.ads.list', $page_data);
    }

    public function ads_add()
    {
        return view('admin.ads.add');
    }

    public function ads_store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'type' => 'required',
            'status' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $add = new Ads();
        $add->title = $request->title;
        $add->type = $request->type;
        $add->status = $request->status;
        $add->description = $request->description;
        $add->start_date = $request->start_date;
        $add->end_date = $request->end_date;
        $add->url = $request->url;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/ads'), $imageName);
            $add->image = 'uploads/ads/' . $imageName;
        }

        $add->created_at = Carbon::now();
        $add->updated_at = Carbon::now();
        $add->save();

        Session::flash('success', get_phrase('Ads created successfully'));
        return redirect()->route('admin.ads');
    }

    public function ads_edit($id){
        $page_date['editAds'] = Ads::findOrFail($id);
        return view('admin.ads.edit', $page_date);
    }

    public function ads_update(Request $request, $id){
        $request->validate([
            'title' => 'required',
            'type' => 'required',
            'status' => 'required',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $add = Ads::findOrFail($id);
        $add->title = $request->title;
        $add->type = $request->type;
        $add->status = $request->status;
        $add->description = $request->description;
        $add->start_date = $request->start_date;
        $add->end_date = $request->end_date;
        $add->url = $request->url;

        if ($request->hasFile('image')) {
            if ($add->image && file_exists(public_path($add->image))) {
                unlink(public_path($add->image));
            }

            // Upload new image
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/ads'), $imageName);
            $add->image = 'uploads/ads/' . $imageName;
        }

        $add->updated_at = Carbon::now();
        $add->save();

        Session::flash('success', get_phrase('Ads updated successfully'));
        return redirect()->route('admin.ads');
    }

    public function ads_delete($id){
        $add = Ads::findOrFail($id);
        if ($add->image && file_exists(public_path($add->image))) {
            unlink(public_path($add->image));
        }
        $add->delete();

        Session::flash('success', get_phrase('Ads deleted successfully'));
        return redirect()->route('admin.ads');
    }





}
