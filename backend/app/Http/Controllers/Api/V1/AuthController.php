<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Authenticate the single administrator and issue an API Bearer token.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $throttleKey = Str::transliterate(Str::lower($request->input('email')) . '|' . $request->ip());

        // Enforce Brute-Force Rate Limiting (5 attempts max per 15 minutes)
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);

            AuditLog::create([
                'user_id' => null,
                'action' => 'admin_login_rate_limited',
                'entity_type' => User::class,
                'description' => "Login throttled for email: {$request->input('email')}. Available in {$seconds}s.",
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => false,
                'message' => "Too many failed login attempts. Please try again in {$seconds} seconds.",
                'retry_after_seconds' => $seconds,
            ], 429);
        }

        $user = User::where('email', $request->input('email'))->first();

        // Verify Password with constant-time Hash::check
        if (! $user || ! Hash::check($request->input('password'), $user->password)) {
            RateLimiter::hit($throttleKey, 900); // 15 minutes decay

            AuditLog::create([
                'user_id' => $user?->id,
                'action' => 'admin_login_failed',
                'entity_type' => User::class,
                'description' => "Failed login attempt for email: {$request->input('email')}",
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Invalid email address or password provided.',
            ], 401);
        }

        // Clear throttle on successful login
        RateLimiter::clear($throttleKey);

        // Revoke old tokens to ensure single active administrator session
        $user->tokens()->delete();

        $deviceName = $request->input('device_name', 'Dhurba Portfolio CMS Admin Portal');
        $token = $user->createToken($deviceName, ['admin:full-access'])->plainTextToken;

        // Record Audit Log for successful login
        AuditLog::create([
            'user_id' => $user->id,
            'action' => 'admin_login_success',
            'entity_type' => User::class,
            'entity_id' => (string) $user->id,
            'description' => "Administrator {$user->name} successfully logged in.",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Administrator authenticated successfully.',
            'data' => [
                'token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ],
        ], 200);
    }

    /**
     * Retrieve the authenticated administrator's profile.
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'message' => 'Authenticated administrator profile retrieved.',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at->toIso8601String(),
            ],
        ], 200);
    }

    /**
     * Revoke current administrator session / tokens and log out.
     */
    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user) {
            // Revoke current access token
            $request->user()->currentAccessToken()->delete();

            // Record Audit Log for logout
            AuditLog::create([
                'user_id' => $user->id,
                'action' => 'admin_logout',
                'entity_type' => User::class,
                'entity_id' => (string) $user->id,
                'description' => "Administrator {$user->name} logged out.",
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Administrator logged out successfully.',
        ], 200);
    }
}
