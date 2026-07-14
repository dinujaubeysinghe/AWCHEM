<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassWeekResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student_class_id' => $this->student_class_id,
            'week_number' => $this->week_number,
            'lecture_name' => $this->lecture_name, 
            'start_date' => $this->start_date->toDateString(),
            'end_date' => $this->end_date,
            'resources' => $this->whenLoaded('resources', function () {
                return $this->resources->map(fn ($r) => [
                    'id' => $r->id,
                    'type' => $r->type,
                    'label' => $r->label,
                    'url' => $r->url,
                ]);
            }),
        ];
    }
}