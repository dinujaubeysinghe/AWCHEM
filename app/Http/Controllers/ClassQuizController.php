<?php

namespace App\Http\Controllers;

use App\Models\ClassQuiz;
use App\Http\Resources\ClassQuizResource;
use Illuminate\Http\Request;

class ClassQuizController extends Controller
{
    

public function index($classId)

{

    $classQuizzes = ClassQuiz::with('quiz')

        ->where('class_id', $classId)

        ->get();

    return ClassQuizResource::collection($classQuizzes);

}

public function store(Request $request, $classId)

{

    $data = $request->validate([

        'quiz_id' => 'required|exists:quizzes,id',

        'type' => 'required|in:physical,online',

        'date' => 'required|date|after_or_equal:today',

        'duration' => 'required|integer|min:1',

        'location' => 'required_if:type,physical|nullable|string|max:255',

        'start_time' => 'required_if:type,online|nullable|date_format:H:i',

        'end_time' => 'required_if:type,online|nullable|date_format:H:i|after:start_time',

        'quiz_link' => 'required_if:type,online|nullable|url',

    ]);

    $alreadyAssigned = ClassQuiz::where('class_id', $classId)

        ->where('quiz_id', $data['quiz_id'])

        ->exists();

    if ($alreadyAssigned) {

        return response()->json([

            'message' => 'This quiz is already assigned to this class.'

        ], 422);

    }

    $classQuiz = ClassQuiz::with('quiz')->create([

        ...$data,

        'class_id' => $classId,

    ]);

    return new ClassQuizResource($classQuiz);

}

public function update(Request $request, $classId, $quizId)

{

    $data = $request->validate([

        'type' => 'required|in:physical,online',

        'date' => 'required|date|after_or_equal:today',

        'duration' => 'required|integer|min:1',

        'location' => 'required_if:type,physical|nullable|string|max:255',

        'start_time' => 'required_if:type,online|nullable|date_format:H:i',

        'end_time' => 'required_if:type,online|nullable|date_format:H:i|after:start_time',

        'quiz_link' => 'required_if:type,online|nullable|url',

    ]);

    $classQuiz = ClassQuiz::where('class_id', $classId)

        ->where('id', $quizId)

        ->firstOrFail();

    $classQuiz->update($data);
    $classQuiz->load('quiz');
    return new ClassQuizResource($classQuiz);

}

public function destroy($classId, $quizId)

{

    $classQuiz = ClassQuiz::where('class_id', $classId)

        ->where('id', $quizId)

        ->first();

    if (!$classQuiz) {

        return response()->json([

            'message' => 'Quiz assignment not found.'

        ], 404);

    }

    $classQuiz->delete();

    return response()->json([

        'message' => 'Quiz removed successfully.'

    ], 200);

}
}
