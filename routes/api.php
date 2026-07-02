<?php

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
    Route::apiResource('quizzes', QuizController::class);
    
    Route::get('/my/classes', [EnrollmentController::class, 'myClasses']);
    Route::get('/available/classes', [EnrollmentController::class, 'availableClasses']);
    Route::post('/enroll/{classId}', [EnrollmentController::class, 'enroll']);
    Route::delete('/unenroll/{classId}', [EnrollmentController::class, 'unenroll']);
    Route::delete('/classes/{classId}/users/{userId}', [StudentClassesController::class, 'removeStudent']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);