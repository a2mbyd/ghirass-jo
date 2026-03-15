<?php

namespace Database\Factories;

use App\Models\Major;
use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

class SectionFactory extends Factory
{
    protected $model = Section::class;

    public function definition(): array
    {
        // Example types of sections
        $sectionTypes = [
            'university_required',
            'university_elective',
            'cs',
            'cis',
            'ds',
            'ai',
            'iot',
            'game-dev',
            'robotics',
            'his',
            'cy',
            'cpe',
            'se',
            'des',
        ];

        return [
            'major_id' => Major::factory(), // create a Major if not provided
            'name' => $this->faker->unique()->randomElement($sectionTypes),
        ];
    }

    /**
     * Optionally define a specific section type.
     */
    public function universityRequired(): Factory
    {
        return $this->state(fn () => [
            'name' => 'university_required',
            'slug' => 'university-required',
        ]);
    }

    public function universityElective(): Factory
    {
        return $this->state(fn () => [
            'name' => 'university_elective',
            'slug' => 'university-elective',
        ]);
    }
}
