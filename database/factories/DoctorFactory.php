<?php

namespace Database\Factories;

use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'department' => fake()->randomElement(['M2', 'A3', 'C4', 'P2', 'PH1']),
            'image' => null,
            'section_id' => Section::factory(),
        ];
    }

    public function withPlaceholderImage(string $path): static
    {
        return $this->state(fn (array $attributes) => ['image' => $path]);
    }
}
