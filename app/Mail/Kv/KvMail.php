<?php

namespace App\Mail\Kv;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

/** One small mailable for all transactional Kervea e-mails (views live in kervea/mail/*). */
class KvMail extends Mailable
{
    public function __construct(public string $mailSubject, public string $template, public array $data = [])
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: $this->mailSubject);
    }

    public function content(): Content
    {
        return new Content(view: 'kervea.mail.'.$this->template, with: $this->data);
    }
}
