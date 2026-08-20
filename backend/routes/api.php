<?php

use App\Http\Controllers\Api\V1\Admin\AuditLogController as AdminAuditLogController;
use App\Http\Controllers\Api\V1\Admin\DashboardController;
use App\Http\Controllers\Api\V1\Admin\DesignExperienceController as AdminDesignExperienceController;
use App\Http\Controllers\Api\V1\Admin\EducationController as AdminEducationController;
use App\Http\Controllers\Api\V1\Admin\FreelanceSuiteController as AdminFreelanceSuiteController;
use App\Http\Controllers\Api\V1\Admin\GlobalSettingsController as AdminGlobalSettingsController;
use App\Http\Controllers\Api\V1\Admin\HeroProfileController as AdminHeroProfileController;
use App\Http\Controllers\Api\V1\Admin\InboxController as AdminInboxController;
use App\Http\Controllers\Api\V1\Admin\MediaController as AdminMediaController;
use App\Http\Controllers\Api\V1\Admin\PhilosophyController as AdminPhilosophyController;
use App\Http\Controllers\Api\V1\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Api\V1\Admin\ReviewController as AdminReviewController;
use App\Http\Controllers\Api\V1\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Api\V1\Admin\SkillCategoryController as AdminSkillCategoryController;
use App\Http\Controllers\Api\V1\Admin\SkillController as AdminSkillController;
use App\Http\Controllers\Api\V1\Admin\SystemHealthController as AdminSystemHealthController;
use App\Http\Controllers\Api\V1\Admin\WorkExperienceController as AdminWorkExperienceController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BootstrapController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\ExperienceController;
use App\Http\Controllers\Api\V1\GlobalSettingsController;
use App\Http\Controllers\Api\V1\PhilosophyController;
use App\Http\Controllers\Api\V1\ProfileController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Controllers\Api\V1\ServiceController;
use App\Http\Controllers\Api\V1\SkillsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Dhurba Dhakal Portfolio CMS Engine
|--------------------------------------------------------------------------
|
| Versioned REST API endpoints for the public frontend and secure admin CMS.
|
*/

Route::prefix('v1')->group(function () {
    // 1. Health & System Status Endpoint
    Route::get('/health', function () {
        return response()->json([
            'success' => true,
            'service' => 'Dhurba Dhakal Portfolio CMS API',
            'version' => '1.0.0',
            'status' => 'operational',
            'timestamp' => now()->toIso8601String(),
        ]);
    });

    // High-Performance Consolidated Bootstrap Endpoint (1 single request for whole frontend)
    Route::get('/bootstrap', BootstrapController::class);

    // 2. Public Content Endpoints
    Route::get('/settings', [GlobalSettingsController::class, 'show']);
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::get('/skills', [SkillsController::class, 'index']);

    // Public Experience Endpoints
    Route::prefix('experience')->group(function () {
        Route::get('/work', [ExperienceController::class, 'work']);
        Route::get('/freelance', [ExperienceController::class, 'freelance']);
        Route::get('/design', [ExperienceController::class, 'design']);
        Route::get('/education', [ExperienceController::class, 'education']);
    });

    // Public Projects Endpoints
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{slug}', [ProjectController::class, 'show']);

    // Public Services, Philosophies & Reviews
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/philosophies', [PhilosophyController::class, 'index']);
    Route::get('/reviews', [ReviewController::class, 'index']);
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::post('/reviews/{id}/like', [ReviewController::class, 'like']);

    // Public Contact Submission
    Route::post('/contact', [ContactController::class, 'store']);

    // 3. Single-Admin Authentication Endpoints
    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);

        // Protected Auth Routes
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/me', [AuthController::class, 'me']);
            Route::post('/logout', [AuthController::class, 'logout']);
        });
    });

    // 4. Admin Protected CMS Endpoints
    Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index']);

        // Global Website Settings CMS
        Route::get('/settings', [AdminGlobalSettingsController::class, 'show']);
        Route::put('/settings', [AdminGlobalSettingsController::class, 'update']);

        // Hero & Profile CMS
        Route::get('/hero', [AdminHeroProfileController::class, 'show']);
        Route::put('/hero', [AdminHeroProfileController::class, 'update']);

        // Skills & Categories CMS
        Route::get('/skills', [AdminSkillCategoryController::class, 'index']);
        Route::post('/skills/categories', [AdminSkillCategoryController::class, 'store']);
        Route::put('/skills/categories/{id}', [AdminSkillCategoryController::class, 'update']);
        Route::delete('/skills/categories/{id}', [AdminSkillCategoryController::class, 'destroy']);

        Route::post('/skills', [AdminSkillController::class, 'store']);
        Route::put('/skills/{id}', [AdminSkillController::class, 'update']);
        Route::delete('/skills/{id}', [AdminSkillController::class, 'destroy']);
        Route::post('/skills/reorder', [AdminSkillController::class, 'reorder']);

        // Experience CMS Modules
        Route::apiResource('experience/work', AdminWorkExperienceController::class)->names('admin.work');
        Route::apiResource('experience/freelance', AdminFreelanceSuiteController::class)->names('admin.freelance');
        Route::apiResource('experience/design', AdminDesignExperienceController::class)->names('admin.design');
        Route::apiResource('experience/education', AdminEducationController::class)->names('admin.education');

        // Projects CMS Module
        Route::post('/projects/reorder', [AdminProjectController::class, 'reorder']);
        Route::patch('/projects/{id}/publish', [AdminProjectController::class, 'togglePublish']);
        Route::apiResource('projects', AdminProjectController::class)->names('admin.projects');

        // Services & Philosophy CMS Modules
        Route::apiResource('services', AdminServiceController::class)->names('admin.services');
        Route::apiResource('philosophies', AdminPhilosophyController::class)->names('admin.philosophies');

        // Client Reviews & Feedback Moderation CMS
        Route::patch('/reviews/{id}/approve', [AdminReviewController::class, 'toggleApproval']);
        Route::apiResource('reviews', AdminReviewController::class)->names('admin.reviews');

        // Contact Inquiries / Inbox CMS
        Route::get('/inbox', [AdminInboxController::class, 'index']);
        Route::get('/inbox/{id}', [AdminInboxController::class, 'show']);
        Route::patch('/inbox/{id}/status', [AdminInboxController::class, 'updateStatus']);
        Route::delete('/inbox/{id}', [AdminInboxController::class, 'destroy']);

        // Media Manager & Storage CMS
        Route::post('/media/upload', [AdminMediaController::class, 'store']);
        Route::apiResource('media', AdminMediaController::class)->names('admin.media');

        // Audit Logs & Security Telemetry
        Route::get('/audit-logs', [AdminAuditLogController::class, 'index']);
        Route::post('/audit-logs/purge', [AdminAuditLogController::class, 'purge']);
        Route::get('/system/status', [AdminSystemHealthController::class, 'status']);
    });
});
