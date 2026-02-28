<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\CourseFile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseFile>
 */
class CourseFileFactory extends Factory
{
    protected $model = CourseFile::class;

    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'title' => $this->faker->sentence(4),
            'url' => $this->faker->url(),
        ];
    }
}
