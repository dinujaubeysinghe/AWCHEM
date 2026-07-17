<?php

namespace App\Http\Controllers;

use App\Models\ClassQuiz;
use App\Models\StudentClasses;
use App\Http\Resources\ClassQuizResource;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;

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

    $studentClass = StudentClasses::findOrFail($classId);
    $this->checkQuizDayMatchesClass($data['date'], $studentClass);

    $alreadyAssigned = ClassQuiz::where('class_id', $classId)
        ->where('quiz_id', $data['quiz_id'])
        ->where('date', $data['date'])
        ->exists();

    if ($alreadyAssigned) {
        throw ValidationException::withMessages([
            'quiz_id' => 'This quiz is already assigned to this class on this date.',
        ]);
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

    $studentClass = StudentClasses::findOrFail($classId);
    $this->checkQuizDayMatchesClass($data['date'], $studentClass);

    $classQuiz = ClassQuiz::where('class_id', $classId)
        ->where('id', $quizId)
        ->firstOrFail();

    $alreadyAssigned = ClassQuiz::where('class_id', $classId)
        ->where('quiz_id', $classQuiz->quiz_id)
        ->where('date', $data['date'])
        ->where('id', '!=', $quizId)
        ->exists();

    if ($alreadyAssigned) {
        throw ValidationException::withMessages([
            'date' => 'This quiz is already assigned to this class on this date.',
        ]);
    }

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

    /**
     * Ensure the quiz's date falls on the same weekday as the class
     * itself (e.g. can't assign a Wednesday-dated quiz to a Monday class).
     */
    private function checkQuizDayMatchesClass(string $date, StudentClasses $studentClass): void
    {
        $quizDay = Carbon::parse($date)->format('l'); 

        if ($quizDay !== $studentClass->day) {
            throw ValidationException::withMessages([
                'date' => "This class runs on {$studentClass->day}s, but the selected date is a {$quizDay}. Please pick a {$studentClass->day} date.",
            ]);
        }
    }
}