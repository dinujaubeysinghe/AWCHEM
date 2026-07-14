<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClassWeek extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_class_id',
        'week_number',
        'lecture_name',
        'start_date',
    ];

    protected $casts = [
        'start_date' => 'date',
    ];

    public function studentClass(): BelongsTo
    {
        return $this->belongsTo(StudentClasses::class, 'student_class_id');
    }

    public function resources(): HasMany
    {
        return $this->hasMany(WeekResource::class);
    }

    // Computed, not stored — always start_date + 6 days
    protected function endDate(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->start_date
                ? Carbon::parse($this->start_date)->addDays(6)->toDateString()
                : null,
        );
    }
}