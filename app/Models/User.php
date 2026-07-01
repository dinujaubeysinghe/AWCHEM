<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Models\StudentEnrollment;
use App\Models\StudentClasses;

#[Fillable(['first_name', 'last_name', 'email', 'password', 'is_admin', 'address', 'whatsapp', 'nic', 'guardian_name', 'guardian_phone'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    public function studentEnrollments()
    {
        return $this->hasMany(StudentEnrollment::class, 'user_id');
    }
    public function studentClasses()
    {
        return $this->belongsToMany(StudentClasses::class, 'student_enrollments', 'user_id', 'student_class_id');
    }


    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }
}