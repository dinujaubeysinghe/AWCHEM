<?php

use App\Http\Controllers\ResultController;
use App\Http\Controllers\ClassQuizController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\StudentClassesController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
    Route::apiResource('classes', StudentClassesController::class);

    Route::get('/quizzes/all', [QuizController::class, 'all']); 
    Route::apiResource('quizzes', QuizController::class);
    
    Route::get('/my/classes', [EnrollmentController::class, 'myClasses']);
    Route::get('/available/classes', [EnrollmentController::class, 'availableClasses']);
    Route::post('/enroll/{classId}', [EnrollmentController::class, 'enroll']);
    Route::delete('/unenroll/{classId}', [EnrollmentController::class, 'unenroll']);
    Route::delete('/classes/{classId}/users/{userId}', [StudentClassesController::class, 'removeStudent']);

    Route::get('/my/quizzes', [EnrollmentController::class, 'myQuizzes']);
    Route::get('/classes/{classId}/quizzes', [ClassQuizController::class, 'index']);
    Route::put('/classes/{classId}/quizzes/{quizId}', [ClassQuizController::class, 'update']);
    Route::post('/classes/{classId}/quizzes', [ClassQuizController::class, 'store']);
    Route::delete('/classes/{classId}/quizzes/{quizId}', [ClassQuizController::class, 'destroy']);

    Route::get('/my/results', [ResultController::class, 'myResults']);
    Route::get('/results', [ResultController::class, 'index']);
    Route::post('/results', [ResultController::class, 'store']);
    Route::put('/results/{result}', [ResultController::class, 'update']);
    Route::delete('/results/{result}', [ResultController::class, 'destroy']);

     Route::post('/email/verification-notification', function (Request $request) {
        if ($request->user()->hasVerifiedEmail()) {
            return response(['message' => 'Email already verified.'], 200);
        }
        $request->user()->sendEmailVerificationNotification();
        return response(['message' => 'Verification email sent.'], 200);
    })->name('verification.send');
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    $user = \App\Models\User::findOrFail($id);

    if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        return response(['message' => 'Invalid verification link.'], 403);
    }

    if ($user->hasVerifiedEmail()) {
        return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/login?verified=1');
    }

    if ($user->markEmailAsVerified()) {
        event(new \Illuminate\Auth\Events\Verified($user));
    }

    return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/login?verified=1');

})->middleware('signed')->name('verification.verify');