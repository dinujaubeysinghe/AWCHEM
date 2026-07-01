<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

use App\Models\StudentEnrollment;
use App\Models\User;

#[Fillable(['name', 'batch', 'location', 'day', 'start_time', 'end_time', 'ong_unit'])]
class StudentClasses extends Model
{ 

    public function studentEnrollments()
    {
        return $this->hasMany(StudentEnrollment::class, 'student_class_id');
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'student_enrollments', 'student_class_id', 'user_id');
    }
    
    protected $table = 'student_classes';
}
