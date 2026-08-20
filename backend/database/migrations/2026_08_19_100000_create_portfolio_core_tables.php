<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for Global Settings, Hero Profiles, and Skills.
     */
    public function up(): void
    {
        // 1. Global Settings & Metadata
        Schema::create('global_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_title')->default('Dhurba Dhakal | Full Stack Developer');
            $table->text('meta_description')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('favicon_url')->nullable();
            $table->string('primary_email')->default('dhurba179@gmail.com');
            $table->string('secondary_email')->default('sharvikatech@gmail.com');
            $table->string('phone_whatsapp')->default('+9779800000000');
            $table->string('location')->default('Nepal');
            $table->string('timezone')->default('UTC+5:45 (NPT)');
            $table->string('github_url')->default('https://github.com/dhurbagit');
            $table->string('linkedin_url')->default('https://linkedin.com');
            $table->string('facebook_url')->default('https://facebook.com');
            $table->string('availability_status')->default('Full-Time • Remote • Freelance Ready');
            $table->string('experience_badge')->default('2+ Years Experience');
            $table->text('copyright_text')->nullable();
            $table->boolean('is_available_for_hire')->default(true);
            $table->timestamps();
        });

        // 2. Hero & Profile Story
        Schema::create('hero_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->default('Dhurba Dhakal');
            $table->string('primary_title')->default('Full Stack Developer | Laravel & PHP Developer');
            $table->string('secondary_title')->default('Web Designer • Freelancer • Software Developer');
            $table->text('short_bio');
            $table->longText('full_bio')->nullable();
            $table->string('avatar_url')->nullable();
            $table->string('cover_url')->nullable();
            $table->json('highlights')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 3. Skill Categories (Backend, Frontend, Database, DevOps & Tools)
        Schema::create('skill_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('icon_key')->nullable();
            $table->text('description')->nullable();
            $table->json('philosophy_highlights')->nullable();
            $table->integer('display_order')->default(0)->index();
            $table->boolean('is_visible')->default(true)->index();
            $table->timestamps();
        });

        // 4. Skills
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('skill_category_id')->constrained('skill_categories')->onDelete('cascade');
            $table->string('name');
            $table->string('level_label')->default('Core Professional');
            $table->enum('proficiency_type', ['primary', 'working', 'tool'])->default('primary')->index();
            $table->string('icon_key')->nullable();
            $table->string('context')->nullable();
            $table->integer('display_order')->default(0)->index();
            $table->boolean('is_visible')->default(true)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
        Schema::dropIfExists('skill_categories');
        Schema::dropIfExists('hero_profiles');
        Schema::dropIfExists('global_settings');
    }
};
