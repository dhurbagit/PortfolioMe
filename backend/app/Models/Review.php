<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'reviewer_name',
        'reviewer_role',
        'company_or_context',
        'service_used',
        'rating',
        'comment',
        'display_date',
        'is_verified',
        'is_approved',
        'likes_count',
        'display_order',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_verified' => 'boolean',
        'is_approved' => 'boolean',
        'likes_count' => 'integer',
        'display_order' => 'integer',
    ];

    public function scopeApproved($query)
    {
        return $query->where('is_approved', true)->orderBy('display_order');
    }
}
