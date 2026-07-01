<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\StudentClasses;

class StudentEnrollment extends Model
{
    protected $fillable = [
        'user_id',
        'student_class_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function studentClass()
    {
        return $this->belongsTo(StudentClasses::class, 'student_class_id');
    }
}
