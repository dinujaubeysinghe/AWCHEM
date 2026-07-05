<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResultResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'marks' => $this->marks,
            'student_id' => $this->user_id,
            'student_name' => $this->user->first_name . ' ' . $this->user->last_name,
            'quiz_title' => $this->classQuiz->quiz->title,
            'class_name' => $this->classQuiz->studentClass->name,
            'quiz_date' => $this->classQuiz->date,
            'class_quiz_id' => $this->class_quiz_id,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}