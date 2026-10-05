<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    public function reports()
    {
        return $this->hasMany(ReviewsReport::class, 'review_id');
    }

    protected static function booted()
    {
        static::deleting(function ($review) {
            $review->reports()->delete();
        });
    }
}
