<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('week_resources', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_week_id')->constrained('class_weeks')->onDelete('cascade');
            $table->enum('type', ['pdf', 'link']);
            $table->string('label');
            $table->string('url');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('week_resources');
    }
};