<?php

use App\Http\Controllers\NoticeController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\ClassQuizController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\StudentClassesController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClassWeekController;
use App\Http\Controllers\WeekResourceController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

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

    Route::apiResource('notices', NoticeController::class);

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

    Route::get('/classes/{classId}/weeks', [ClassWeekController::class, 'index']);
    Route::post('/class-weeks', [ClassWeekController::class, 'store']);
    Route::put('/class-weeks/{id}', [ClassWeekController::class, 'update']);
    Route::delete('/class-weeks/{id}', [ClassWeekController::class, 'destroy']);

    Route::post('/week-resources', [WeekResourceController::class, 'store']);
    Route::put('/week-resources/{id}', [WeekResourceController::class, 'update']);
    Route::delete('/week-resources/{id}', [WeekResourceController::class, 'destroy']);

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


// Forgot password
Route::post('/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);

    $status = Password::sendResetLink(
        $request->only('email')
    );

    if ($status === Password::RESET_LINK_SENT) {
        return response(['message' => 'Reset link sent to your email.'], 200);
    }

    return response(['message' => 'We could not find a user with that email.'], 404);
});

// Reset password
Route::post('/reset-password', function (Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed',
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));
            $user->save();
            event(new PasswordReset($user));
        }
    );

    if ($status === Password::PASSWORD_RESET) {
        return response(['message' => 'Password reset successfully.'], 200);
    }

    return response(['message' => 'Invalid or expired reset token.'], 400);
});