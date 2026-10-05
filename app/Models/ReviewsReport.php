<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReviewsReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'listing_type',
        'agent_id',
        'listing_id',
        'review_id',
    ];

    public function review()
    {
        return $this->belongsTo(Review::class, 'review_id');
    }
}
