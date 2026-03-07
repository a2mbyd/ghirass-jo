<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    protected $model = Course::class;

    protected $prefixes = ['CS', 'CIS', 'DS', 'AI', 'IOT', 'GD', 'ROB', 'HIS', 'CY', 'CPE', 'SE', 'DES'];

    public function definition(): array
    {
        $prefix = $this->faker->randomElement($this->prefixes);

        return [
            'name' => $this->faker->unique()->sentence(3),
            'description' => $this->faker->paragraph(),
            'course_code' => $prefix.$this->faker->numberBetween(100, 499),
            'credit_hours' => $this->faker->numberBetween(2, 5),
            'is_lab' => $this->faker->boolean(25),
            'section_id' => Section::factory()->forCsMajor(),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Course $course) {
            $section = $course->section;
            if ($section) {
                foreach ($section->majors as $major) {
                    $major->courses()->syncWithoutDetaching([
                        $course->id => [
                            'year' => $this->faker->numberBetween(1, 4),
                            'semester' => $this->faker->randomElement([1, 2]),
                            'type' => $this->faker->randomElement(['required_major', 'required_college', 'elective_major']),
                        ],
                    ]);
                }
            }
        });
    }

    public function lab(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_lab' => true,
        ]);
    }
}
