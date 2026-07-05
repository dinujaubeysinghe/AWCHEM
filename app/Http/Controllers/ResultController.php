<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\User;
use App\Models\ClassQuiz;
use App\Models\StudentEnrollment;
use App\Http\Resources\ResultResource;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    /**
     * Get all results for a specific class
     * Admin use: GET /results?class_id=1
     */
    public function index(Request $request)
    {
        $classId = $request->query('class_id');

        $query = Result::with(['user', 'classQuiz.quiz', 'classQuiz.studentClass']);

        if ($classId) {
            $query->whereHas('classQuiz', function ($q) use ($classId) {
                $q->where('class_id', $classId);
            });
        }

        return ResultResource::collection($query->orderBy('created_at', 'desc')->get());
    }

    /**
     * Store a new result
     * Admin use: POST /results
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'class_quiz_id' => 'required|exists:class_quizzes,id',
            'marks' => 'required|numeric|min:0|max:100',
        ]);

        // Check student is enrolled in the class
        $classQuiz = ClassQuiz::findOrFail($data['class_quiz_id']);
        $isEnrolled = StudentEnrollment::where('user_id', $data['user_id'])
            ->where('student_class_id', $classQuiz->class_id)
            ->exists();

        if (!$isEnrolled) {
            return response()->json([
                'message' => 'This student is not enrolled in this class.'
            ], 422);
        }

        // Check if result already exists
        $alreadyExists = Result::where('user_id', $data['user_id'])
            ->where('class_quiz_id', $data['class_quiz_id'])
            ->exists();

        if ($alreadyExists) {
            return response()->json([
                'message' => 'A result already exists for this student and quiz.'
            ], 422);
        }

        $result = Result::create($data);
        $result->load(['user', 'classQuiz.quiz', 'classQuiz.studentClass']);

        return response(new ResultResource($result), 201);
    }

    /**
     * Update a result
     * Admin use: PUT /results/{id}
     */
    public function update(Request $request, Result $result)
    {
        $data = $request->validate([
            'marks' => 'required|numeric|min:0|max:100',
        ]);

        $result->update($data);
        $result->load(['user', 'classQuiz.quiz', 'classQuiz.studentClass']);

        return new ResultResource($result);
    }

    /**
     * Delete a result
     * Admin use: DELETE /results/{id}
     */
    public function destroy(Result $result)
    {
        $result->delete();
        return response()->json([
            'message' => 'Result deleted successfully.'
        ], 200);
    }

    /**
     * Get results for the logged-in student only
     * Student use: GET /my-results
     */
    public function myResults(Request $request)
    {
        $user = $request->user();

        $results = Result::with(['classQuiz.quiz', 'classQuiz.studentClass'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return ResultResource::collection($results);
    }
}