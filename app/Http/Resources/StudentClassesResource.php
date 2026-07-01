<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentClassesResource extends JsonResource


{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'batch' => $this->batch,
            'day' => $this->day,
            'location' => $this->location,
            'start_time' => $this->start_time ? date('h:i A', strtotime($this->start_time)) : null,
            'end_time' => $this->end_time ? date('h:i A', strtotime($this->end_time)) : null,
            'ong_unit' => $this->ong_unit,
        ];
    }
}
