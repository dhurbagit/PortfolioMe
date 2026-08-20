<?php

namespace Tests\Feature;

use App\Models\MediaAsset;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MediaManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
        Storage::fake('public');
    }

    public function test_admin_can_upload_valid_media_asset(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();
        $file = UploadedFile::fake()->create('portfolio-hero.jpg', 500, 'image/jpeg');

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/admin/media/upload', [
                'file' => $file,
                'folder' => 'projects',
                'alt_text' => 'Dhurba Dhakal Portfolio Hero Showcase',
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'original_name' => 'portfolio-hero.jpg',
                    'alt_text' => 'Dhurba Dhakal Portfolio Hero Showcase',
                ],
            ]);

        $assetId = $response->json('data.id');
        $filePath = $response->json('data.disk_path');

        Storage::disk('public')->assertExists($filePath);
        $this->assertDatabaseHas('media_assets', ['id' => $assetId]);
        $this->assertDatabaseHas('audit_logs', ['action' => 'uploaded_media_asset']);
    }

    public function test_invalid_file_extension_is_rejected(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();
        $file = UploadedFile::fake()->create('malicious-script.php', 50);

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/admin/media/upload', [
                'file' => $file,
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['file']);
    }

    public function test_admin_can_list_and_update_media_asset(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        $asset = MediaAsset::create([
            'filename' => 'ndpc-dashboard-test.png',
            'original_name' => 'ndpc-dashboard.png',
            'disk_path' => 'media/projects/ndpc-dashboard-test.png',
            'public_url' => '/storage/media/projects/ndpc-dashboard-test.png',
            'mime_type' => 'image/png',
            'file_size_bytes' => 102400,
            'alt_text' => 'NDPC Dashboard Preview',
        ]);

        // List
        $listResponse = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/v1/admin/media');

        $listResponse->assertStatus(200);
        $this->assertGreaterThanOrEqual(1, count($listResponse->json('data')));

        // Update
        $updateResponse = $this->actingAs($admin, 'sanctum')
            ->putJson("/api/v1/admin/media/{$asset->id}", [
                'alt_text' => 'Updated NDPC Dashboard Showcase Preview',
            ]);

        $updateResponse->assertStatus(200)
            ->assertJson(['data' => ['alt_text' => 'Updated NDPC Dashboard Showcase Preview']]);
    }

    public function test_admin_can_delete_media_asset_and_remove_from_disk(): void
    {
        $admin = User::where('email', 'dhurba179@gmail.com')->first();

        // Create fake file in disk
        $filePath = 'media/general/test-image.jpg';
        Storage::disk('public')->put($filePath, 'sample image content');

        $asset = MediaAsset::create([
            'filename' => 'test-image.jpg',
            'original_name' => 'test-image.jpg',
            'disk_path' => $filePath,
            'public_url' => '/storage/' . $filePath,
            'mime_type' => 'image/jpeg',
            'file_size_bytes' => 500,
            'alt_text' => 'Test Image',
        ]);

        Storage::disk('public')->assertExists($filePath);

        $deleteResponse = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/v1/admin/media/{$asset->id}");

        $deleteResponse->assertStatus(200);
        Storage::disk('public')->assertMissing($filePath);
        $this->assertDatabaseMissing('media_assets', ['id' => $asset->id]);
    }
}
