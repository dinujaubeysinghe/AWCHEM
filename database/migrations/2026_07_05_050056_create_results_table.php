<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('class_quiz_id')->constrained('class_quizzes')->onDelete('cascade');
            $table->decimal('marks', 5, 2);
            $table->timestamps();
            $table->unique(['user_id', 'class_quiz_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};