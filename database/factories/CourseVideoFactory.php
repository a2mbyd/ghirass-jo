<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\CourseVideo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseVideo>
 */
class CourseVideoFactory extends Factory
{
    protected $model = CourseVideo::class;

    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'title' => $this->faker->sentence(4),
            'url' => $this->faker->url(),
        ];
    }
}
