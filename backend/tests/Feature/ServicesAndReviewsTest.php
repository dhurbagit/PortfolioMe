<?php

namespace Tests\Feature;

use App\Models\Philosophy;
use App\Models\Review;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServicesAndReviewsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_public_can_retrieve_services_and_philosophies(): void
    {
        $serviceResponse = $this->getJson('/api/v1/services');
        $serviceResponse->assertStatus(200);
        $this->assertEquals(8, count($serviceResponse->json('data')));

        $philosophyResponse = $this->getJson('/api/v1/philosophies');
        $philosophyResponse->assertStatus(200);
        $this->assertEquals(5, count($philosophyResponse->json('data')));
    }

    public function test_public_can_submit_review_and_like_existing_review(): void
    {
        // 1. Submit review
        $response = $this->postJson('/api/v1/reviews', [
            'name' => 'Bikash Adhikari',
            'role' => 'CTO',
            'company' => 'FinTech Nepal',
            'service_used' => 'Payment Gateway Integration & Core Engine',
            'rating' => 5,
            'comment' => 'Dhurba engineered our payment ledger reconciliation with exceptional security and zero errors.',
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'reviewer_name' => 'Bikash Adhikari',
                    'rating' => 5,
                ],
            ]);

        $this->assertDatabaseHas('reviews', ['reviewer_name' => 'Bikash Adhikari']);
        $this->assertDatabaseHas('audit_logs', ['action' => 'submitted_client_review']);

        // 2. Like review
        $review = Review::first();
        $initialLikes = $review->likes_count;

        $likeResponse = $this->postJson("/api/v1/reviews/{$review->id}/like");
        $likeResponse->assertStatus(200)
            ->assertJson(['data' => ['likes_count' => $initialLikes + 1]]);
    }

    public function test_admin_can_crud_services_and_philosophies(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        // 1. Create Service
        $res = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/admin/services', [
                'service_number' => '09',
                'title' => 'DevOps & High-Availability Server Hardening',
                'tagline' => 'Automated Zero-Downtime Infrastructure',
                'description' => 'Dockerized container orchestration and continuous integration pipelines.',
                'capabilities' => ['Docker Swarm', 'CI/CD Pipelines', 'Nginx Reverse Proxy'],
                'accent_color' => 'blue',
                'display_order' => 9,
                'is_visible' => true,
            ]);

        $res->assertStatus(201);
        $serviceId = $res->json('data.id');
        $this->assertDatabaseHas('services', ['id' => $serviceId]);

        // 2. Delete Service
        $del = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/v1/admin/services/{$serviceId}");
        $del->assertStatus(200);
        $this->assertDatabaseMissing('services', ['id' => $serviceId]);
    }

    public function test_admin_can_moderate_and_toggle_review_approval(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();
        $review = Review::first();

        // Toggle Approval
        $response = $this->actingAs($admin, 'sanctum')
            ->patchJson("/api/v1/admin/reviews/{$review->id}/approve");

        $response->assertStatus(200);
        $this->assertEquals(! $review->is_approved, $response->json('data.is_approved'));

        // Delete Review
        $delResponse = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/v1/admin/reviews/{$review->id}");

        $delResponse->assertStatus(200);
        $this->assertDatabaseMissing('reviews', ['id' => $review->id]);
    }
}
