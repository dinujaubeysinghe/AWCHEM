<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['student_class_id', 'title', 'content'])]
class Notice extends Model
{
    public function studentClass()
    {
        return $this->belongsTo(StudentClasses::class, 'student_class_id');
    }
}
