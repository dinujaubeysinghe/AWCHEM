<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_name' => 'required'|'string'|'max:20',
            'last_name' => 'required'|'string'|'max:20',
            'email' => 'required'|'email'|'max:100'|'unique:users,email',
            'password' => [
                'required', 
                'confirmed', 
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                ],
                'address' => 'required'|'string'| 'max:255',
                'whatsapp' => 'required'|'string'|'max:15',
                'nic' => 'required'|'string'|'max:12',
                'guardian_name' => 'required'|'string'|'max:30',
                'guardian_contact' => 'required'|'integer'|'max:10',
        ];
    }
}