<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
{
    $credentials = $request->validated();

    $user = User::where('email', $credentials['email'])->first();

    if (!$user || !Hash::check($credentials['password'], $user->password)) {
        return response([
            'message' => 'The provided credentials are incorrect.'
        ], 422);
    }

    if (!$user->hasVerifiedEmail()) {
        return response([
            'message' => 'Please verify your email address before logging in.',
            'email_verified' => false,
        ], 403);
    }

    $token = $user->createToken('main')->plainTextToken;

    return response(compact('user', 'token'));
}

    public function signup(SignupRequest $request)
{
    $data = $request->validated();

    /** @var User $user */
    $user = User::create([
        'first_name' => $data['first_name'],
        'last_name' => $data['last_name'],
        'email' => $data['email'],
        'password' => bcrypt($data['password']),
        'address' => $data['address'],
        'whatsapp' => $data['whatsapp'],
        'nic' => $data['nic'],
        'guardian_name' => $data['guardian_name'],
        'guardian_phone' => $data['guardian_phone'],
    ]);

    $user->sendEmailVerificationNotification();

    return response([
        'message' => 'Registration successful. Please check your email to verify your account.',
    ], 201);
}

    public function logout(Request $request){

        /**  @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response([
            'message' => 'Logged out'
        ],204);

    }
}
