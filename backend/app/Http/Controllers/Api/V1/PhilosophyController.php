<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Philosophy;
use Illuminate\Http\JsonResponse;

class PhilosophyController extends Controller
{
    /**
     * Retrieve all active development philosophy principles.
     */
    public function index(): JsonResponse
    {
        $philosophies = Philosophy::where('is_visible', true)
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $philosophies,
        ], 200);
    }
}
