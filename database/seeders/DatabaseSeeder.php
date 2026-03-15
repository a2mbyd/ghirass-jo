<?php

namespace Database\Seeders;

use App\Models\Major;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed CS major (with full plan from cs_plan_2022) + other majors (metadata only).
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(CsPlanSeeder::class);
        $this->call(CalculusOneResourcesSeeder::class);
        $this->call(DoctorSeeder::class);

        $otherSlugs = ['des', 'cy', 'cpe', 'se', 'cis', 'ai', 'ds', 'iot', 'gd', 'rob', 'his'];
        foreach ($otherSlugs as $slug) {
            Major::firstOrCreate(
                ['slug' => $slug],
                Major::factory()->{$slug}()->raw()
            );
        }
    }
}
