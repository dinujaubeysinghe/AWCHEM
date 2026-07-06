<?php

namespace App\Models;

use App\Models\Quiz;
use App\Models\StudentClasses;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['class_id', 'quiz_id', 'type', 'date', 'duration', 'location', 'start_time', 'end_time', 'quiz_link'])]
class ClassQuiz extends Model
{
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function studentClass()
    {
    return $this->belongsTo(StudentClasses::class, 'class_id');
    }
}