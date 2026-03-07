<?php

namespace Database\Factories;

use App\Models\Major;
use Illuminate\Database\Eloquent\Factories\Factory;

class MajorFactory extends Factory
{
    protected $model = Major::class;

    /**
     * CS is the only major with full plan data from database/data/cs_plan_2022.php.
     * Other majors have metadata only (no courses/sections from plan files).
     */
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
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ];
    }

    /** CS: علوم الحاسوب — full plan from cs_plan_2022.php (seeded by CsPlanSeeder). */
    public function cs(): static
    {
        return $this->state([
            'name' => 'علوم الحاسوب',
            'slug' => 'cs',
            'description' => 'أساسيات البرمجة، الخوارزميات، وهياكل البيانات.',
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ]);
    }

    public function des(): static
    {
        return $this->state([
            'name' => 'شبكات الحاسوب وأمن المعلومات',
            'slug' => 'des',
            'description' => 'تصميم وإدارة الشبكات والأمن السيبراني.',
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ]);
    }

    public function cy(): static
    {
        return $this->state([
            'name' => 'الأمن السيبراني',
            'slug' => 'cy',
            'description' => 'حماية الأنظمة والشبكات من التهديدات الإلكترونية.',
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ]);
    }

    public function cpe(): static
    {
        return $this->state([
            'name' => 'هندسة الحاسوب',
            'slug' => 'cpe',
            'description' => 'تصميم الأنظمة المدمجة وهندسة العتاد.',
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ]);
    }

    public function se(): static
    {
        return $this->state([
            'name' => 'هندسة البرمجيات',
            'slug' => 'se',
            'description' => 'تطوير وتصميم الأنظمة البرمجية بكفاءة وجودة عالية.',
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ]);
    }

    public function cis(): static
    {
        return $this->state([
            'name' => 'نظم المعلومات الحاسوبية',
            'slug' => 'cis',
            'description' => 'إدارة نظم المعلومات ودعم اتخاذ القرار.',
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ]);
    }

    public function ai(): static
    {
        return $this->state([
            'name' => 'الذكاء الاصطناعي',
            'slug' => 'ai',
            'description' => 'تعلم الآلة، معالجة اللغة الطبيعية، والأنظمة الذكية.',
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ]);
    }

    public function ds(): static
    {
        return $this->state([
            'name' => 'علم البيانات',
            'slug' => 'ds',
            'description' => 'تحليل البيانات والإحصاء والتنقيب عن المعرفة.',
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ]);
    }

    public function iot(): static
    {
        return $this->state([
            'name' => 'إنترنت الأشياء',
            'slug' => 'iot',
            'description' => 'ربط الأجهزة والأنظمة الذكية بالإنترنت.',
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ]);
    }

    public function gd(): static
    {
        return $this->state([
            'name' => 'تصميم وتطوير الألعاب',
            'slug' => 'gd',
            'description' => 'تصميم وتطوير الألعاب التفاعلية والواقع الافتراضي.',
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ]);
    }

    public function rob(): static
    {
        return $this->state([
            'name' => 'الروبوتات',
            'slug' => 'rob',
            'description' => 'تصميم وبرمجة الأنظمة الروبوتية والتحكم الآلي.',
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ]);
    }

    public function his(): static
    {
        return $this->state([
            'name' => 'نظم المعلومات الصحية',
            'slug' => 'his',
            'description' => 'إدارة المعلومات والأنظمة في القطاع الصحي.',
            'roadmap_image' => '/images/cs-major-roadmap-2022.png',
        ]);
    }
}
