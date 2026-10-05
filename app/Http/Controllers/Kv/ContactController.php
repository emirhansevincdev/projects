<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Mail\Kv\KvMail;
use App\Models\Kv\ContactMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $r)
    {
        // Honeypot: real users never fill the hidden "website" field.
        if ($r->filled('website')) {
            return response()->json(['ok' => true]);
        }
        $v = $r->validate([
            'name' => 'required|string|max:200',
            'email' => 'required|email:rfc|max:254',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|min:5|max:5000',
        ]);
        $msg = ContactMessage::create([
            'name' => strip_tags($v['name']),
            'email' => $v['email'],
            'subject' => isset($v['subject']) ? strip_tags($v['subject']) : null,
            'message' => strip_tags($v['message']),
            'ip' => $r->ip(),
        ]);
        try {
            $to = config('kervea.admin_email') ? [config('kervea.admin_email')] : User::where('role', 1)->pluck('email')->all();
            foreach ($to as $a) {
                Mail::to($a)->send(new KvMail('Yeni iletişim mesajı', 'admin_contact', ['msg' => $msg]));
            }
        } catch (\Throwable $e) {
            Log::warning('kv: contact mail failed', ['err' => $e->getMessage()]);
        }
        return response()->json(['ok' => true]);
    }
}
