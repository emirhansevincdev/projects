<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReviewsReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class ReviewsReportsController extends Controller
{
    // Reviews Index
    public function reviews_index(){
        return view('admin.reviews-reports.reviews');
    }

    // Index
    public function index(){
        $page_data['reports'] = ReviewsReport::latest()->get();
        return view('admin.reviews-reports.index', $page_data);
    }

    // Report Delete 
    public function report_delete($id){
        ReviewsReport::where('id',$id)->delete();
        Session::flash('success', get_phrase('Report deleted successfully!'));
        return redirect()->back();
    }
}
