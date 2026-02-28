<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('section_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('course_code')->nullable();
            $table->tinyInteger('credit_hours')->default(3);
            $table->boolean('is_lab')->default(false);
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
