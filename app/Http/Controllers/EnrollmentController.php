<?php

namespace App\Http\Controllers;

use App\Models\ClassQuiz;
use App\Models\Result;
use App\Models\StudentClasses;
use App\Models\StudentEnrollment;
use App\Http\Resources\ClassQuizResource;
use App\Http\Resources\ResultResource;
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
        $classes = $user->studentClasses()
            ->get();

        return StudentClassesResource::collection($classes);
    }

    /**
     * Get classes the logged-in student is NOT enrolled in
     */
    public function availableClasses(Request $request)
    {
        $user = $request->user();
        $enrolledClassIds = StudentEnrollment::where('user_id', $user->id)->pluck('student_class_id');

        $classes = StudentClasses::whereNotIn('id', $enrolledClassIds)->get();

        return StudentClassesResource::collection($classes);
    }

    /**
     * Combined endpoint: returns both enrolled and available classes in one request.
     * Used by the student Classes page to halve the number of API calls.
     */
    public function classesData(Request $request)
    {
        $user = $request->user();

        // Single query to get enrolled class IDs
        $enrolledClassIds = StudentEnrollment::where('user_id', $user->id)->pluck('student_class_id');

        $myClasses = StudentClasses::whereIn('id', $enrolledClassIds)->get();
        $availableClasses = StudentClasses::whereNotIn('id', $enrolledClassIds)->get();

        return response()->json([
            'my_classes'        => StudentClassesResource::collection($myClasses),
            'available_classes' => StudentClassesResource::collection($availableClasses),
        ]);
    }

    /**
     * Combined endpoint for the Student Dashboard.
     * Returns classes, quizzes, and results in a single request — replaces 3 separate calls.
     */
    public function studentDashboard(Request $request)
    {
        $user = $request->user();

        // Enrolled class IDs — reused for both classes and quizzes queries
        $enrolledClassIds = StudentEnrollment::where('user_id', $user->id)->pluck('student_class_id');

        $classes = StudentClasses::whereIn('id', $enrolledClassIds)->get();

        $quizzes = ClassQuiz::with('quiz', 'studentClass')
            ->whereIn('class_id', $enrolledClassIds)
            ->get();

        $results = Result::with(['classQuiz.quiz', 'classQuiz.studentClass'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'classes' => StudentClassesResource::collection($classes),
            'quizzes' => ClassQuizResource::collection($quizzes),
            'results' => ResultResource::collection($results),
        ]);
    }

    /**
     * Enroll the logged-in student into a class
     */
    public function enroll(Request $request, $classId)
    {
        $user = $request->user();

        // Check if already enrolled
        $alreadyEnrolled = StudentEnrollment::where('user_id', $user->id)
            ->where('student_class_id', $classId)
            ->exists();

        if ($alreadyEnrolled) {
            return response([
                'message' => 'You are already enrolled in this class.'
            ], 422);
        }

        StudentEnrollment::create([
            'user_id' => $user->id,
            'student_class_id' => $classId,
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
            ->where('student_class_id', $classId)
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

    public function myQuizzes(Request $request)
    {
        $user = $request->user();

        $classIds = $user->studentClasses()->pluck('student_classes.id');

        $quizzes = ClassQuiz::with('quiz', 'studentClass')
            ->whereIn('class_id', $classIds)
            ->get();

        return ClassQuizResource::collection($quizzes);
    }
}