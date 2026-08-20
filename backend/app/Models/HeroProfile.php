<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroProfile extends Model
{
    protected $fillable = [
        'full_name',
        'primary_title',
        'secondary_title',
        'short_bio',
        'full_bio',
        'avatar_url',
        'cover_url',
        'highlights',
        'is_active',
    ];

    protected $casts = [
        'highlights' => 'array',
        'is_active' => 'boolean',
    ];
}
