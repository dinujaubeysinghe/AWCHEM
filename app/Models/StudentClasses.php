<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'batch', 'location', 'start_time', 'end_time'])]
class StudentClasses extends Model
{
    protected $table = 'student_classes';
}
