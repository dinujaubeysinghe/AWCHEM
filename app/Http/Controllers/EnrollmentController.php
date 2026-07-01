<?php

namespace App\Http\Controllers;

use App\Models\StudentClass;
use App\Models\StudentEnrollment;
use App\Http\Resources\StudentClassesResource;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    /**
     * Get classes the logged-in student is enrolled in
     */
    public function myClasses(Request $request)
    {
        $user = $request->user();
        $classes = $user->StudentClasses()
            ->get();

        return StudentClassesResource::collection($classes);
    }

    /**
     * Get classes the logged-in student is NOT enrolled in
     */
    public function availableClasses(Request $request)
    {
        $user = $request->user();
        $enrolledClassIds = $user->classes()->pluck('student_classes.id');

        $classes = StudentClass::whereNotIn('id', $enrolledClassIds)->get();

        return StudentClassesResource::collection($classes);
    }

    /**
     * Enroll the logged-in student into a class
     */
    public function enroll(Request $request, $classId)
    {
        $user = $request->user();

        // Check if already enrolled
        $alreadyEnrolled = StudentEnrollment::where('user_id', $user->id)
            ->where('class_id', $classId)
            ->exists();

        if ($alreadyEnrolled) {
            return response([
                'message' => 'You are already enrolled in this class.'
            ], 422);
        }

        StudentEnrollment::create([
            'user_id' => $user->id,
            'class_id' => $classId,
        ]);

        return response([
            'message' => 'Enrolled successfully.'
        ], 201);
    }

    /**
     * Unenroll the logged-in student from a class
     */
    public function unenroll(Request $request, $classId)
    {
        $user = $request->user();

        $enrollment = StudentEnrollment::where('user_id', $user->id)
            ->where('class_id', $classId)
            ->first();

        if (!$enrollment) {
            return response([
                'message' => 'Enrollment not found.'
            ], 404);
        }

        $enrollment->delete();

        return response([
            'message' => 'Unenrolled successfully.'
        ], 200);
    }
}