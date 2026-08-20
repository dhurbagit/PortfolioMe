<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for Projects, Services, and Development Philosophies.
     */
    public function up(): void
    {
        // 1. Projects & Software Showcase
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->default('Enterprise & Web Application')->index();
            $table->string('role_title')->default('Full Stack Developer');
            $table->text('summary');
            $table->longText('full_description')->nullable();
            $table->text('challenge')->nullable();
            $table->text('solution')->nullable();
            $table->json('key_deliverables');
            $table->json('tech_stack');
            $table->string('metrics_label')->nullable();
            $table->string('metrics_value')->nullable();
            $table->string('thumbnail_url')->nullable();
            $table->json('gallery_urls')->nullable();
            $table->string('demo_url')->nullable();
            $table->string('github_url')->nullable();
            $table->string('accent_theme')->default('royal'); // royal, emerald, purple, indigo, crimson
            $table->boolean('is_featured')->default(false)->index();
            $table->boolean('is_published')->default(true)->index();
            $table->integer('display_order')->default(0)->index();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->timestamps();
        });

        // 2. Services & Technical Capabilities
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('service_number')->default('01');
            $table->string('title');
            $table->string('tagline')->nullable();
            $table->text('description');
            $table->string('icon_key')->nullable();
            $table->json('capabilities')->nullable();
            $table->string('accent_color')->default('blue');
            $table->integer('display_order')->default(0)->index();
            $table->boolean('is_visible')->default(true)->index();
            $table->timestamps();
        });

        // 3. Guiding Development Philosophy
        Schema::create('philosophies', function (Blueprint $table) {
            $table->id();
            $table->string('principle_number')->default('01');
            $table->string('title');
            $table->string('tagline');
            $table->text('description');
            $table->string('icon_key')->nullable();
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
        Schema::dropIfExists('philosophies');
        Schema::dropIfExists('services');
        Schema::dropIfExists('projects');
    }
};
