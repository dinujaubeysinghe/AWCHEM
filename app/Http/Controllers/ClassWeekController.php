<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClassWeekResource;
use App\Models\ClassWeek;
use App\Models\StudentClasses;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ClassWeekController extends Controller
{
    // Used by both admin and student — returns weeks newest-first
    public function index($classId)
    {
        $weeks = ClassWeek::where('student_class_id', $classId)
            ->with('resources')
            ->orderByDesc('week_number')
            ->get();

        return ClassWeekResource::collection($weeks);
    }

    // Admin: adds the "next" week for a class, auto-computing week_number and start_date
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_class_id' => 'required|exists:student_classes,id',
        ]);

        $studentClass = StudentClasses::findOrFail($validated['student_class_id']);

        $lastWeek = ClassWeek::where('student_class_id', $studentClass->id)
            ->orderByDesc('week_number')
            ->first();

        if ($lastWeek) {
            $weekNumber = $lastWeek->week_number + 1;
            $startDate = Carbon::parse($lastWeek->start_date)->addDays(7);
        } else {
            if (!$studentClass->start_date) {
                return response()->json([
                    'message' => 'This class has no start date set. Please set a start date first.',
                ], 422);
            }
            $weekNumber = 1;
            $startDate = Carbon::parse($studentClass->start_date);
        }

        $week = ClassWeek::create([
            'student_class_id' => $studentClass->id,
            'week_number' => $weekNumber,
            'lecture_name' => $validated['lecture_name'] ?? null,
            'start_date' => $startDate->toDateString(),
        ]);

        return response()->json(new ClassWeekResource($week->load('resources')), 201);
    }

    public function update(Request $request, $id)
    {
    $week = ClassWeek::findOrFail($id);

    $validated = $request->validate([
        'lecture_name' => 'nullable|string|max:100',
    ]);

    $week->update($validated);

    return response()->json(new ClassWeekResource($week->load('resources')));
    }

    // Admin: delete a week (cascades its resources)
    public function destroy($id)
    {
        $week = ClassWeek::findOrFail($id);
        $week->delete();

        return response()->json(['message' => 'Week deleted successfully.']);
    }
}