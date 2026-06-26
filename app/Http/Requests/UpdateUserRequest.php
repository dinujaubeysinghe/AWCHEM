<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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
            'first_name' => 'required|string|max:55',
            'last_name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email,'.$this->id,
            'password' => [
                'nullable',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols(),
            ],
            'address' => 'required|string|max:255',
            'whatsapp' => 'required|string|max:20',
            'nic' => 'required|string|max:20|unique:users,nic,'.$this->id,
            'guardian_name' => 'required|string|max:55',
            'guardian_phone' => 'required|string|max:20',
        ];
    }
}