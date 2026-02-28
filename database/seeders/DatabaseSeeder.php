<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Major;
use App\Models\Section;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * All majors mirroring the slugs and labels from resources/js/data/majors.ts.
     */
    private array $majors = [
        [
            'name' => 'هندسة وأمن شبكات الحاسوب',
            'slug' => 'des',
            'description' => 'تصميم وإدارة شبكات الحاسوب وحمايتها من الهجمات والاختراقات.',
        ],
        [
            'name' => 'الأمن السيبراني',
            'slug' => 'cy',
            'description' => 'حماية الأنظمة والشبكات من الهجمات والتهديدات الإلكترونية.',
        ],
        [
            'name' => 'هندسة الحاسوب',
            'slug' => 'cpe',
            'description' => 'تصميم وبناء العتاد والبرمجيات التي تشغّل الحواسيب.',
        ],
        [
            'name' => 'هندسة البرمجيات',
            'slug' => 'se',
            'description' => 'بناء أنظمة برمجية عالية الجودة وقابلة للتطوير.',
        ],
        [
            'name' => 'نظم المعلومات الحاسوبية',
            'slug' => 'cis',
            'description' => 'تحليل وتصميم نظم المعلومات لخدمة المؤسسات والأعمال.',
        ],
        [
            'name' => 'علوم الحاسوب',
            'slug' => 'cs',
            'description' => 'أساسيات البرمجة، الخوارزميات، وهياكل البيانات.',
        ],
        [
            'name' => 'الذكاء الاصطناعي',
            'slug' => 'ai',
            'description' => 'تطوير نماذج وخوارزميات الذكاء الاصطناعي والتعلم الآلي.',
        ],
        [
            'name' => 'علم البيانات',
            'slug' => 'ds',
            'description' => 'استخراج المعرفة من البيانات واتخاذ قرارات مبنية على التحليل.',
        ],
        [
            'name' => 'إنترنت الأشياء',
            'slug' => 'iot',
            'description' => 'ربط الأجهزة بالإنترنت وبناء أنظمة ذكية متصلة.',
        ],
        [
            'name' => 'تصميم وتطوير ألعاب الحاسوب',
            'slug' => 'gd',
            'description' => 'ابتكار عوالم تفاعلية وتجارب لعب ممتعة.',
        ],
        [
            'name' => 'علم الروبوتات',
            'slug' => 'rob',
            'description' => 'تصميم وبرمجة الروبوتات والتطبيقات الذكية للحركة والتحكم.',
        ],
        [
            'name' => 'نظم المعلومات الصحية',
            'slug' => 'his',
            'description' => 'إدارة وتحليل بيانات القطاع الصحي باستخدام تقنيات المعلومات.',
        ],
    ];

    /**
     * Independent sections (like CS, AI) — University Required, University Elective, Major Elective.
     * These belong to a "University" major since sections require major_id.
     */
    private array $independentSections = [
        'University Required',
        'University Elective',
        'Major Elective',
    ];

    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create "University" major for the 3 independent sections
        $universityMajor = Major::firstOrCreate(
            ['slug' => 'university'],
            [
                'name' => 'متطلبات الجامعة',
                'description' => 'المتطلبات العامة والاختيارية للجامعة.',
            ]
        );

        foreach ($this->independentSections as $sectionName) {
            $section = Section::firstOrCreate(
                ['name' => $sectionName],
                ['major_id' => $universityMajor->id]
            );

            Course::factory(fake()->numberBetween(4, 7))->create([
                'section_id' => $section->id,
            ]);
        }

        // Create 12 majors, each with one section named after the major (CS, AI, etc.)
        foreach ($this->majors as $majorData) {
            $major = Major::firstOrCreate(
                ['slug' => $majorData['slug']],
                [
                    'name' => $majorData['name'],
                    'description' => $majorData['description'],
                ]
            );

            $sectionName = strtoupper($major->slug);
            $section = Section::firstOrCreate(
                ['name' => $sectionName],
                ['major_id' => $major->id]
            );

            Course::factory(fake()->numberBetween(4, 7))->create([
                'section_id' => $section->id,
                'course_code' => strtoupper($major->slug) . fake()->numberBetween(100, 499),
            ]);
        }
    }
}
