<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkillCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'icon_key',
        'description',
        'philosophy_highlights',
        'display_order',
        'is_visible',
    ];

    protected $casts = [
        'philosophy_highlights' => 'array',
        'is_visible' => 'boolean',
        'display_order' => 'integer',
    ];

    public function skills()
    {
        return $this->hasMany(Skill::class)->orderBy('display_order');
    }
}
