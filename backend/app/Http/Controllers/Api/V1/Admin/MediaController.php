<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UploadMediaRequest;
use App\Models\AuditLog;
use App\Models\MediaAsset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    /**
     * Retrieve all media assets.
     */
    public function index(Request $request): JsonResponse
    {
        $query = MediaAsset::latest();

        $assets = $query->get();

        return response()->json([
            'success' => true,
            'data' => $assets,
        ], 200);
    }

    /**
     * Upload and store a new media asset.
     */
    public function store(UploadMediaRequest $request): JsonResponse
    {
        $file = $request->file('file');
        $folder = $request->input('folder', 'general');

        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension() ?: 'jpg';
        $safeBaseName = Str::slug(pathinfo($originalName, PATHINFO_FILENAME));
        $uniqueFileName = "{$safeBaseName}-" . Str::random(8) . ".{$extension}";

        $storagePath = "media/{$folder}";
        $filePath = $file->storeAs($storagePath, $uniqueFileName, 'public');
        $publicUrl = Storage::disk('public')->url($filePath);

        $asset = MediaAsset::create([
            'original_name' => $originalName,
            'filename' => $uniqueFileName,
            'disk_path' => $filePath,
            'public_url' => $publicUrl,
            'mime_type' => $file->getClientMimeType() ?: 'image/jpeg',
            'file_size_bytes' => $file->getSize(),
            'alt_text' => $request->input('alt_text', $safeBaseName),
        ]);

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'uploaded_media_asset',
            'entity_type' => MediaAsset::class,
            'entity_id' => $asset->id,
            'description' => "Uploaded media file: {$originalName} to {$storagePath}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Media file uploaded successfully.',
            'data' => $asset,
        ], 201);
    }

    /**
     * Retrieve single media asset detail.
     */
    public function show($id): JsonResponse
    {
        $asset = MediaAsset::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $asset,
        ], 200);
    }

    /**
     * Update media asset metadata (alt text).
     */
    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'alt_text' => ['nullable', 'string', 'max:255'],
        ]);

        $asset = MediaAsset::findOrFail($id);
        $asset->update($request->only(['alt_text']));

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_media_asset',
            'entity_type' => MediaAsset::class,
            'entity_id' => $asset->id,
            'description' => "Updated media asset: {$asset->original_name}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Media asset metadata updated successfully.',
            'data' => $asset->fresh(),
        ], 200);
    }

    /**
     * Delete media asset from database and physical disk storage.
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        $asset = MediaAsset::findOrFail($id);

        // Remove from physical disk
        if (Storage::disk('public')->exists($asset->disk_path)) {
            Storage::disk('public')->delete($asset->disk_path);
        }

        $filename = $asset->original_name;
        $asset->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'deleted_media_asset',
            'entity_type' => MediaAsset::class,
            'entity_id' => (string) $id,
            'description' => "Deleted media file: {$filename}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Media asset deleted successfully.',
        ], 200);
    }
}
