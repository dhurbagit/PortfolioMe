<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiHealthTest extends TestCase
{
    /**
     * Test that the API health check endpoint returns 200 and operational status.
     */
    public function test_api_health_endpoint_returns_operational_status(): void
    {
        $response = $this->getJson('/api/v1/health');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'service' => 'Dhurba Dhakal Portfolio CMS API',
                'status' => 'operational',
            ])
            ->assertJsonStructure([
                'success',
                'service',
                'version',
                'status',
                'timestamp',
            ]);
    }
}
