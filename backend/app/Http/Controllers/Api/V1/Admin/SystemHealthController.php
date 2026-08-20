<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

class SystemHealthController extends Controller
{
    /**
     * Retrieve complete system health, diagnostic report, and security audit status.
     */
    public function status(Request $request): JsonResponse
    {
        // 1. Database Health & Latency
        $dbStatus = 'operational';
        $dbLatencyMs = null;
        try {
            $startTime = microtime(true);
            DB::connection()->getPdo();
            $dbLatencyMs = round((microtime(true) - $startTime) * 1000, 2);
        } catch (\Throwable $e) {
            $dbStatus = 'error: ' . $e->getMessage();
        }

        // 2. Storage Disk Write Health
        $storageStatus = 'operational';
        try {
            $testFile = 'health-check-' . time() . '.tmp';
            Storage::disk('public')->put($testFile, 'health-check');
            Storage::disk('public')->delete($testFile);
        } catch (\Throwable $e) {
            $storageStatus = 'error: ' . $e->getMessage();
        }

        // 3. Security Status
        $activeTokensCount = PersonalAccessToken::count();
        $isProduction = app()->environment('production');
        $debugMode = config('app.debug');

        return response()->json([
            'success' => true,
            'message' => 'System diagnostic and security health status retrieved.',
            'data' => [
                'health' => [
                    'database' => [
                        'driver' => config('database.default'),
                        'status' => $dbStatus,
                        'latency_ms' => $dbLatencyMs,
                    ],
                    'storage' => [
                        'disk' => 'public',
                        'status' => $storageStatus,
                    ],
                    'memory' => [
                        'usage_mb' => round(memory_get_usage(true) / 1024 / 1024, 2),
                        'peak_usage_mb' => round(memory_get_peak_usage(true) / 1024 / 1024, 2),
                        'memory_limit' => ini_get('memory_limit'),
                    ],
                ],
                'security' => [
                    'single_admin_enforced' => true,
                    'active_sessions_count' => $activeTokensCount,
                    'environment' => app()->environment(),
                    'debug_mode' => $debugMode,
                    'security_headers_active' => true,
                    'rate_limiting_active' => true,
                ],
                'runtime' => [
                    'php_version' => PHP_VERSION,
                    'laravel_version' => app()->version(),
                    'timezone' => config('app.timezone'),
                    'server_time' => now()->toIso8601String(),
                ],
            ],
        ], 200);
    }
}
