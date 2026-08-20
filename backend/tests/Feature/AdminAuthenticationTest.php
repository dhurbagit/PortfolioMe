<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class AdminAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
        RateLimiter::clear('dhurba179@gmail.com|127.0.0.1');
    }

    public function test_admin_can_login_with_valid_credentials(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'dhurba179@gmail.com',
            'password' => env('ADMIN_DEFAULT_PASSWORD', '123456789'),
            'device_name' => 'Automated Test Client',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Administrator authenticated successfully.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'token',
                    'token_type',
                    'user' => ['id', 'name', 'email'],
                ],
            ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'admin_login_success',
            'user_id' => 1,
        ]);
    }

    public function test_admin_login_fails_with_invalid_credentials(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'dhurba179@gmail.com',
            'password' => 'WrongPassword123!',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'success' => false,
                'message' => 'Invalid email address or password provided.',
            ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'admin_login_failed',
        ]);
    }

    public function test_admin_login_is_rate_limited_after_excessive_failures(): void
    {
        // Simulate 5 failed attempts
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/v1/auth/login', [
                'email' => 'dhurba179@gmail.com',
                'password' => 'WrongPassword' . $i,
            ]);
        }

        // 6th attempt must be throttled with HTTP 429
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'dhurba179@gmail.com',
            'password' => 'PortfolioSecureAdmin2026!',
        ]);

        $response->assertStatus(429)
            ->assertJsonStructure([
                'success',
                'message',
                'retry_after_seconds',
            ]);
    }

    public function test_authenticated_admin_can_retrieve_me_profile(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();
        $token = $admin->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/auth/me');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $admin->id,
                    'name' => 'Dhurba Dhakal',
                    'email' => 'dhurba179@gmail.com',
                ],
            ]);
    }

    public function test_unauthenticated_request_to_me_is_rejected(): void
    {
        $response = $this->getJson('/api/v1/auth/me');

        $response->assertStatus(401);
    }

    public function test_admin_can_logout_and_revoke_token(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();
        $token = $admin->createToken('test-session')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/v1/auth/logout');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Administrator logged out successfully.',
            ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'admin_logout',
            'user_id' => $admin->id,
        ]);

        // Clear auth guard cache for clean subsequent request
        $this->app['auth']->forgetGuards();

        // Attempting to use the revoked token must fail with 401
        $subsequent = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/auth/me');

        $subsequent->assertStatus(401);
    }
}
