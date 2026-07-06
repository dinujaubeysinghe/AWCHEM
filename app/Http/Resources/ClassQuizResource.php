<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassQuizResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quiz_id' => $this->quiz_id,
            'title' => $this->quiz->title,
            'description' => $this->quiz->description,
            'type' => $this->type,
            'date' => $this->date,
            'duration' => $this->formatDuration($this->duration),
            'location' => $this->location,
            'start_time' => $this->start_time ? date('g:i A', strtotime($this->start_time)) : null,
            'end_time' => $this->end_time ? date('g:i A', strtotime($this->end_time)) : null,
            'quiz_link' => $this->quiz_link,
            'class_name' => $this->studentClass?->name,
        ];
    }

    private function formatDuration($minutes): string
    {
        if ($minutes < 60) {
            return $minutes . ' mins';
        } elseif ($minutes === 60) {
            return '1 hour';
        } elseif ($minutes % 60 === 0) {
            return ($minutes / 60) . ' hours';
        } else {
            $hours = intdiv($minutes, 60);
            $remaining = $minutes % 60;
            return $hours . 'h ' . $remaining . 'mins';
        }
    }
}