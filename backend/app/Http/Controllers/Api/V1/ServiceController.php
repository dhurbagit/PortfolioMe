<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    /**
     * Retrieve all active services and capabilities.
     */
    public function index(): JsonResponse
    {
        $services = Service::where('is_visible', true)
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $services,
        ], 200);
    }
}
