<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\ContactSubmission;
use App\Models\Education;
use App\Models\FreelanceSuite;
use App\Models\MediaAsset;
use App\Models\Project;
use App\Models\Review;
use App\Models\Service;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\WorkExperience;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Retrieve aggregated vital statistics and operational metrics for the CMS Dashboard.
     */
    public function index(Request $request): JsonResponse
    {
        // 1. Projects Breakdown
        $projectsTotal = Project::count();
        $projectsPublished = Project::where('is_published', true)->count();
        $projectsFeatured = Project::where('is_featured', true)->where('is_published', true)->count();

        // 2. Experiences & Education
        $workExperiencesCount = WorkExperience::count();
        $freelanceSuitesCount = FreelanceSuite::count();
        $educationCount = Education::count();

        // 3. Skills Matrix
        $skillsTotal = Skill::count();
        $skillCategoriesCount = SkillCategory::count();

        // 4. Services & Offerings
        $servicesCount = Service::count();

        // 5. Client Reviews
        $reviewsTotal = Review::count();
        $reviewsApproved = Review::where('is_approved', true)->count();
        $reviewsPending = Review::where('is_approved', false)->count();

        // 6. Contact Inquiries
        $inquiriesTotal = ContactSubmission::count();
        $inquiriesUnread = ContactSubmission::where('status', 'unread')->count();

        // 7. Media Storage Usage
        $mediaTotalFiles = MediaAsset::count();
        $mediaTotalBytes = MediaAsset::sum('file_size_bytes');

        // 8. Recent Activity Logs (Last 5 records)
        $recentActivities = AuditLog::with('user:id,name,email')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'action' => $log->action,
                    'description' => $log->description,
                    'ip_address' => $log->ip_address,
                    'created_at' => $log->created_at->toIso8601String(),
                    'human_time' => $log->created_at->diffForHumans(),
                ];
            });

        // 9. Recent Unread Inquiries (Last 3)
        $recentInquiries = ContactSubmission::unread()
            ->latest()
            ->take(3)
            ->get(['id', 'sender_name', 'sender_email', 'subject', 'created_at']);

        return response()->json([
            'success' => true,
            'message' => 'CMS Dashboard vital metrics retrieved successfully.',
            'data' => [
                'summary' => [
                    'projects' => [
                        'total' => $projectsTotal,
                        'published' => $projectsPublished,
                        'featured' => $projectsFeatured,
                    ],
                    'experiences' => [
                        'work_roles' => $workExperiencesCount,
                        'freelance_suites' => $freelanceSuitesCount,
                        'education_records' => $educationCount,
                    ],
                    'skills' => [
                        'total_skills' => $skillsTotal,
                        'categories' => $skillCategoriesCount,
                    ],
                    'services' => [
                        'total' => $servicesCount,
                    ],
                    'reviews' => [
                        'total' => $reviewsTotal,
                        'approved' => $reviewsApproved,
                        'pending_moderation' => $reviewsPending,
                    ],
                    'inbox' => [
                        'total_messages' => $inquiriesTotal,
                        'unread_messages' => $inquiriesUnread,
                    ],
                    'media' => [
                        'total_files' => $mediaTotalFiles,
                        'total_bytes' => $mediaTotalBytes,
                    ],
                ],
                'system' => [
                    'php_version' => PHP_VERSION,
                    'laravel_version' => app()->version(),
                    'environment' => app()->environment(),
                    'timezone' => config('app.timezone', 'Asia/Kathmandu'),
                    'server_time' => now()->toIso8601String(),
                ],
                'recent_activities' => $recentActivities,
                'recent_inquiries' => $recentInquiries,
            ],
        ], 200);
    }
}
