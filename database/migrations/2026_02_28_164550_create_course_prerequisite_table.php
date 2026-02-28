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
        Schema::create('course_prerequisite', function (Blueprint $table) {
            $table->id();

            $table->foreignId('course_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('prerequisite_id')
                ->constrained('courses')
                ->onDelete('cascade');

            $table->string('requirement_type')
                ->check("requirement_type in ('studied_before', 'succeeded_before')")
                ->default('studied_before');

            $table->timestamps();

            $table->unique(['course_id', 'prerequisite_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_prerequisite');
    }
};
