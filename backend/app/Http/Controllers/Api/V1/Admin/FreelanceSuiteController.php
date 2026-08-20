<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFreelanceSuiteRequest;
use App\Models\AuditLog;
use App\Models\FreelanceSuite;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FreelanceSuiteController extends Controller
{
    public function index(): JsonResponse
    {
        $suites = FreelanceSuite::orderBy('display_order')->get();

        return response()->json([
            'success' => true,
            'data' => $suites,
        ], 200);
    }

    public function store(StoreFreelanceSuiteRequest $request): JsonResponse
    {
        $suite = FreelanceSuite::create($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'created_freelance_suite',
            'entity_type' => FreelanceSuite::class,
            'entity_id' => (string) $suite->id,
            'description' => "Added freelance suite: {$suite->title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Freelance suite created successfully.',
            'data' => $suite,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $suite = FreelanceSuite::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $suite,
        ], 200);
    }

    public function update(StoreFreelanceSuiteRequest $request, $id): JsonResponse
    {
        $suite = FreelanceSuite::findOrFail($id);
        $suite->update($request->validated());

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated_freelance_suite',
            'entity_type' => FreelanceSuite::class,
            'entity_id' => (string) $suite->id,
            'description' => "Updated freelance suite: {$suite->title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Freelance suite updated successfully.',
            'data' => $suite->fresh(),
        ], 200);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        $suite = FreelanceSuite::findOrFail($id);
        $title = $suite->title;
        $suite->delete();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'deleted_freelance_suite',
            'entity_type' => FreelanceSuite::class,
            'entity_id' => (string) $id,
            'description' => "Deleted freelance suite: {$title}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Freelance suite deleted successfully.',
        ], 200);
    }
}
