<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for Work Experiences, Freelance Suites, Design Experience, and Education.
     */
    public function up(): void
    {
        // 1. Professional Work Experiences
        Schema::create('work_experiences', function (Blueprint $table) {
            $table->id();
            $table->string('role_number')->default('01');
            $table->string('company_name');
            $table->string('position');
            $table->string('status')->default('Currently Working'); // Currently Working / Previous Role
            $table->string('location')->default('Nepal');
            $table->text('overview');
            $table->json('responsibilities');
            $table->json('tech_stack');
            $table->string('accent_theme')->default('royal'); // royal, indigo, crimson
            $table->string('company_logo_url')->nullable();
            $table->integer('display_order')->default(0)->index();
            $table->boolean('is_visible')->default(true)->index();
            $table->timestamps();
        });

        // 2. Freelance Studio Suites
        Schema::create('freelance_suites', function (Blueprint $table) {
            $table->id();
            $table->string('suite_number')->default('01');
            $table->string('title');
            $table->string('subtitle');
            $table->text('description');
            $table->json('capabilities');
            $table->json('technologies');
            $table->string('accent_color')->default('blue');
            $table->integer('display_order')->default(0)->index();
            $table->boolean('is_visible')->default(true)->index();
            $table->timestamps();
        });

        // 3. Design Experience & UI/UX
        Schema::create('design_experiences', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category')->default('Visual & UI Engineering');
            $table->text('description');
            $table->json('tools_and_skills');
            $table->string('icon_key')->nullable();
            $table->integer('display_order')->default(0)->index();
            $table->boolean('is_visible')->default(true)->index();
            $table->timestamps();
        });

        // 4. Higher Education
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->string('degree')->default('BSc IT');
            $table->string('field_of_study')->default('Bachelor of Science in Information Technology');
            $table->string('institution')->default('Lord Buddha Education Foundation');
            $table->string('location')->default('Nepal');
            $table->string('duration')->default('Completed');
            $table->json('coursework');
            $table->text('academic_overview')->nullable();
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
        Schema::dropIfExists('educations');
        Schema::dropIfExists('design_experiences');
        Schema::dropIfExists('freelance_suites');
        Schema::dropIfExists('work_experiences');
    }
};
