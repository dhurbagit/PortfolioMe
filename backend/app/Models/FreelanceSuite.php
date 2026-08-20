<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FreelanceSuite extends Model
{
    protected $fillable = [
        'suite_number',
        'title',
        'subtitle',
        'description',
        'capabilities',
        'technologies',
        'accent_color',
        'display_order',
        'is_visible',
    ];

    protected $casts = [
        'capabilities' => 'array',
        'technologies' => 'array',
        'is_visible' => 'boolean',
        'display_order' => 'integer',
    ];
}
