<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GlobalSetting extends Model
{
    protected $fillable = [
        'site_title',
        'meta_description',
        'logo_url',
        'favicon_url',
        'primary_email',
        'secondary_email',
        'phone_whatsapp',
        'location',
        'timezone',
        'github_url',
        'linkedin_url',
        'facebook_url',
        'availability_status',
        'experience_badge',
        'copyright_text',
        'is_available_for_hire',
    ];

    protected $casts = [
        'is_available_for_hire' => 'boolean',
    ];
}
