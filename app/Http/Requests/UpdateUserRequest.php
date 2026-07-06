<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
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
            'first_name'     => 'required|string|max:55',
            'last_name'      => 'required|string|max:55',
            'email'          => ['required', 'email', Rule::unique('users', 'email')->ignore($this->route('user')->id)],
            'password'       => [
                'nullable',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols(),
            ],
            'address'        => 'required|string|max:255',
            'whatsapp'       => 'required|string|max:20',
            'nic'            => ['required', 'string', 'max:20', Rule::unique('users', 'nic')->ignore($this->route('user')->id)],
            'guardian_name'  => 'required|string|max:55',
            'guardian_phone' => 'required|string|max:20',
        ];
    }
}