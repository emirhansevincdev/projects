<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Calendly;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Session;

class AdminCalendlyController extends Controller
{
    public function calendly_settings(){
        $page_data['calendlies'] = Calendly::where('user_id', Auth::user()->id)->first();
        return view('admin.setting.calendly', $page_data);
    }

 
    public function calendly_settings_update(Request $request){
        $validated = $request->validate([
            'calendly_info' => 'required',
        ]);
        $data['calendly_info'] = $request->calendly_info;
        $data['user_id'] = Auth::user()->id;
        $existing = Calendly::where('user_id', Auth::user()->id)->first();
        if($existing){
            Calendly::where('user_id', Auth::user()->id)->update($data);
        }else{
            Calendly::insert($data);
        }

        Session::flash('success', get_phrase('Calendly settings updated successfully.'));
        return redirect()->back();
        
    }

  





}
