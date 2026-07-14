<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WeekResource extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_week_id',
        'type',
        'label',
        'url',
    ];

    public function classWeek(): BelongsTo
    {
        return $this->belongsTo(ClassWeek::class);
    }
}