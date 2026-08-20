<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for Reviews, Contact Submissions, Media Assets, and Audit Logs.
     */
    public function up(): void
    {
        // 1. Client & Visitor Reviews
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->string('reviewer_name');
            $table->string('reviewer_role')->nullable();
            $table->string('company_or_context')->nullable();
            $table->string('service_used')->default('Laravel Development');
            $table->unsignedTinyInteger('rating')->default(5); // 1-5
            $table->text('comment');
            $table->string('display_date')->default('Verified Client');
            $table->boolean('is_verified')->default(true);
            $table->boolean('is_approved')->default(true)->index();
            $table->unsignedInteger('likes_count')->default(0);
            $table->integer('display_order')->default(0)->index();
            $table->timestamps();
        });

        // 2. Contact Submissions / Inquiries
        Schema::create('contact_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('sender_name');
            $table->string('sender_email');
            $table->string('subject')->nullable();
            $table->text('message');
            $table->string('sender_ip')->nullable();
            $table->string('user_agent')->nullable();
            $table->enum('status', ['unread', 'read', 'replied', 'archived'])->default('unread')->index();
            $table->timestamp('replied_at')->nullable();
            $table->timestamps();
        });

        // 3. Media Assets Library
        Schema::create('media_assets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('original_name');
            $table->string('filename')->unique();
            $table->string('mime_type');
            $table->unsignedBigInteger('file_size_bytes');
            $table->string('disk_path');
            $table->string('public_url');
            $table->string('alt_text')->nullable();
            $table->timestamps();
        });

        // 4. Audit & Activity Logs
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('action'); // e.g. "created_project", "updated_settings", "admin_login"
            $table->string('entity_type')->nullable(); // e.g. "App\Models\Project"
            $table->string('entity_id')->nullable();
            $table->text('description');
            $table->json('payload')->nullable();
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('media_assets');
        Schema::dropIfExists('contact_submissions');
        Schema::dropIfExists('reviews');
    }
};
