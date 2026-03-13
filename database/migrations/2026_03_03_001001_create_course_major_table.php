<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
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

            $table->unsignedTinyInteger('year');
            $table->unsignedTinyInteger('semester')->default(1);

            // required_major | elective_major | graduation_project
            $table->string('course_major_type')
                ->check("course_major_type in ('required_major', 'elective_major', 'graduation_project')")
                ->default('required_major');

            $table->timestamps();

            $table->unique(['course_id', 'major_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_major');
    }
};
