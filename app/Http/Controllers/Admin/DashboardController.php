<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Session;
use DB;

class DashboardController extends Controller
{
    public function index(){
        $page_data['users'] = User::where('role',2)->get();
        return view('admin.dashboard',$page_data);
    }


     public function markAllAsRead()
    {
      
        DB::table('notifications')->delete();

        return response()->json([
            'success' => true,
            'message' => 'All notifications marked as read'
        ]);
    }
}
