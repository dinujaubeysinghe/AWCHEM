<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'address' => $this->address,
            'whatsapp' => $this->whatsapp,
            'nic' => $this->nic,
            'guardian_name' => $this->guardian_name,
            'guardian_phone' => $this->guardian_phone,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}