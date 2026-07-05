<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\ClassQuiz;

#[Fillable(['user_id', 'class_quiz_id', 'marks'])]
class Result extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function classQuiz()
    {
        return $this->belongsTo(ClassQuiz::class);
    }
}