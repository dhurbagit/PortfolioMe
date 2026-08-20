<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'service_number',
        'title',
        'tagline',
        'description',
        'icon_key',
        'capabilities',
        'accent_color',
        'display_order',
        'is_visible',
    ];

    protected $casts = [
        'capabilities' => 'array',
        'is_visible' => 'boolean',
        'display_order' => 'integer',
    ];
}
