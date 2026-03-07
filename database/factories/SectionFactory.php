<?php

namespace Database\Factories;

use App\Models\Major;
use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Section>
 */
class SectionFactory extends Factory
{
    protected $model = Section::class;

    public function definition(): array
    {
        return [
            'name' => fake()->unique()->words(2, true),
        ];
    }

    public function forMajor(Major $major): static
    {
        return $this->afterCreating(function (Section $section) use ($major) {
            $major->sections()->syncWithoutDetaching([$section->id]);
        });
    }

    public function forCsMajor(): static
    {
        return $this->forMajor(
            Major::firstOrCreate(
                ['slug' => 'cs'],
                [
                    'name' => 'علوم الحاسوب',
                    'description' => 'أساسيات البرمجة، الخوارزميات، وهياكل البيانات.',
                    'roadmap_image' => '/images/cs-major-roadmap-2022.png',
                ]
            )
        );
    }
}
