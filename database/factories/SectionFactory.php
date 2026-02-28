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
        $major = Major::factory()->create();

        return [
            'major_id' => $major->id,
            'name' => strtoupper($major->slug),
        ];
    }
}
