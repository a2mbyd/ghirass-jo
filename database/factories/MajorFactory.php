<?php

namespace Database\Factories;

use App\Models\Major;
use Illuminate\Database\Eloquent\Factories\Factory;

class MajorFactory extends Factory
{
    protected $model = Major::class;

    protected $majors = [
        ['name' => 'Computer Networks & Security Engineering', 'slug' => 'des'],
        ['name' => 'Cybersecurity', 'slug' => 'cy'],
        ['name' => 'Computer Engineering', 'slug' => 'cpe'],
        ['name' => 'Software Engineering', 'slug' => 'se'],
        ['name' => 'Computer Information Systems', 'slug' => 'cis'],
        ['name' => 'Computer Science', 'slug' => 'cs'],
        ['name' => 'Artificial Intelligence', 'slug' => 'ai'],
        ['name' => 'Data Science', 'slug' => 'ds'],
        ['name' => 'Internet of Things', 'slug' => 'iot'],
        ['name' => 'Game Design & Development', 'slug' => 'gd'],
        ['name' => 'Robotics', 'slug' => 'rob'],
        ['name' => 'Health Information Systems', 'slug' => 'his'],
    ];

    public function definition(): array
    {
        $major = $this->faker->unique()->randomElement($this->majors);

        return [
            'name' => $major['name'],
            'slug' => $major['slug'],
            'description' => $this->faker->sentence(10),
        ];
    }
}
