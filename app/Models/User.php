<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;                
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\StudentEnrollment;
use App\Models\StudentClasses;

class User extends Authenticatable implements MustVerifyEmail 
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'is_admin',
        'address', 'whatsapp', 'nic', 'guardian_name', 'guardian_phone',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }

    public function studentEnrollments()
    {
        return $this->hasMany(StudentEnrollment::class, 'user_id');
    }

    public function studentClasses()
    {
        return $this->belongsToMany(StudentClasses::class, 'student_enrollments', 'user_id', 'student_class_id');
    }
}