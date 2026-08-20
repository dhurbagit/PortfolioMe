<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Philosophy extends Model
{
    protected $table = 'philosophies';

    protected $fillable = [
        'principle_number',
        'title',
        'tagline',
        'description',
        'icon_key',
        'display_order',
        'is_visible',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
        'display_order' => 'integer',
    ];
}
