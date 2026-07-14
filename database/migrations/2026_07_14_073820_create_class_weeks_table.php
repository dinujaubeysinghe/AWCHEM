<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('class_weeks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_class_id')->constrained('student_classes')->onDelete('cascade');
            $table->unsignedInteger('week_number');
            $table->string('lecture_name')->nullable();
            $table->date('start_date');
            $table->timestamps();

            $table->unique(['student_class_id', 'week_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('class_weeks');
    }
};