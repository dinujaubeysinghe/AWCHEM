<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request){

    $credentials = $request->validated();

    if(!Auth::attempt($credentials)){
        return response([
            'message' => 'The provided credentials are incorrect'
        ], 422);
    }
    /**  @var User $user */
    $user = Auth::user();
    $token = $user->createToken('main')->plainTextToken;
     return response(compact('user', 'token'));
        
    }

    public function signup(SignupRequest $request){

        $data = $request->validated();

        /**  @var User $user */
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'address' => $data['address'],
            'whatsapp' => $data['whatsapp'],
            'nic' => $data['nic'],
            'guardian_name' => $data['guardian_name'],
            'guardian_phone' => $data['guardian_phone'],
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
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
