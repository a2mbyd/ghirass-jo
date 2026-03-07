<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Section;
use Illuminate\Database\Seeder;

class DoctorSeeder extends Seeder
{
    /**
     * Sections to exclude (uni and graduation projects - not IT field).
     */
    protected array $excludedSections = [
        'متطلبات الجامعة العامة',
        'مشروع التخرج',
        'متطلب جامعة اختياري',
    ];

    /**
     * Section name -> department code (short form: M2, A3, C4, P2, PH1).
     *
     * @var array<string, string>
     */
    protected array $sectionToDepartment = [
        'الرياضيات' => 'M2',
        'علوم الحاسوب' => 'C4',
        'هندسة الحاسوب' => 'A3',
        'نظم المعلومات' => 'A3',
        'هندسة البرمجيات' => 'P2',
        'اختياري قسم' => 'C4',
    ];

    /**
     * Section name -> email prefix for unique doctor emails.
     *
     * @var array<string, string>
     */
    protected array $sectionEmailPrefix = [
        'الرياضيات' => 'math',
        'علوم الحاسوب' => 'cs',
        'هندسة الحاسوب' => 'ce',
        'نظم المعلومات' => 'is',
        'هندسة البرمجيات' => 'se',
        'اختياري قسم' => 'elective',
    ];

    /**
     * Number of doctors to create per section.
     */
    protected int $doctorsPerSection = 3;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Doctor::query()->delete();

        $sections = Section::query()
            ->whereNotIn('name', $this->excludedSections)
            ->get();

        $placeholderImage = '/images/placeholders/avatar.svg';

        $names = [
            ['Dr. Ahmad Hassan', 'Dr. Sara Mahmoud', 'Dr. Omar Khalil'],
            ['Dr. Layla Fadi', 'Dr. Karim Nasser', 'Dr. Rania Saleh'],
            ['Dr. Tariq Jawad', 'Dr. Hala Zaki', 'Dr. Faisal Amin'],
            ['Dr. Nadia Rashed', 'Dr. Youssef Hamdi', 'Dr. Lina Fawzi'],
            ['Dr. Bassam Kareem', 'Dr. Dina Sami', 'Dr. Waleed Nabil'],
            ['Dr. Mona Hisham', 'Dr. Jamal Riad', 'Dr. Sana Tarek'],
        ];

        foreach ($sections as $section) {
            $department = $this->sectionToDepartment[$section->name] ?? 'C4';
            $prefix = $this->sectionEmailPrefix[$section->name] ?? 'dept';
            $sectionNames = $names[array_rand($names)];

            for ($i = 1; $i <= $this->doctorsPerSection; $i++) {
                $email = "{$prefix}{$i}@university.edu";
                Doctor::firstOrCreate(
                    ['email' => $email],
                    [
                        'name' => $sectionNames[$i - 1],
                        'department' => $department,
                        'image' => $placeholderImage,
                        'section_id' => $section->id,
                    ]
                );
            }
        }
    }
}
