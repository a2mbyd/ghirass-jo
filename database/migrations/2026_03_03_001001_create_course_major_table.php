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
        Schema::create('course_major', function (Blueprint $table) {
            $table->id();

            $table->foreignId('course_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('major_id')
                ->constrained()
                ->onDelete('cascade');

            // Year of study (1 = First year, 2 = Second year, etc.)
            $table->unsignedTinyInteger('year');

            // Semester within year (1 or 2 only)
            $table->unsignedTinyInteger('semester')->default(1);

            // Type of course (elective_university, elective_major, required_university, required_major, required_college)
            $table->string('type')
                ->check("type in ('elective_university', 'elective_major', 'required_university', 'required_major', 'required_college')")->default('required_major');
            $table->timestamps();

            $table->unique(['course_id', 'major_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_major');
    }
};
