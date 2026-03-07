<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Major;
use App\Models\Section;
use Illuminate\Database\Seeder;

class CsPlanSeeder extends Seeder
{
    /**
     * Seed the CS major (علوم الحاسوب) with full 2022 plan:
     * sections, courses, prerequisites, corequisites,
     * and course_major pivot with the correct type for each course.
     */
    public function run(): void
    {
        $plan = require database_path('data/cs_plan_2022.php');

        $major = Major::firstOrCreate(
            ['slug' => $plan['major']['slug']],
            [
                'name' => $plan['major']['name'],
                'description' => $plan['major']['description'],
                'roadmap_image' => $plan['major']['roadmap_image'],
            ]
        );

        // Create sections and attach all to the CS major
        $sections = [];
        foreach ($plan['sections'] as $i => $sectionData) {
            $section = Section::firstOrCreate(
                ['name' => $sectionData['name']]
            );
            $major->sections()->syncWithoutDetaching([$section->id]);
            $sections[$i] = $section;
        }

        // Create courses (indexed by course_code for prerequisite/corequisite lookup)
        $courseByCode = [];
        foreach ($plan['courses'] as $courseData) {
            $sectionIdx = $courseData['section'];
            $section = $sections[$sectionIdx] ?? $sections[0];

            $course = Course::firstOrCreate(
                ['course_code' => $courseData['course_code']],
                [
                    'section_id' => $section->id,
                    'name' => $courseData['name'],
                    'description' => $courseData['description'] ?? null,
                    'credit_hours' => $courseData['credit_hours'],
                    'is_lab' => $courseData['is_lab'],
                ]
            );

            $courseByCode[$courseData['course_code']] = $course;
        }

        // Attach prerequisites and corequisites
        foreach ($plan['courses'] as $courseData) {
            $course = $courseByCode[$courseData['course_code']] ?? null;
            if (! $course) {
                continue;
            }

            foreach ($courseData['prerequisites'] ?? [] as $prereq) {
                $prereqCourse = $courseByCode[$prereq['course_code']] ?? null;
                if ($prereqCourse && $prereqCourse->id !== $course->id) {
                    $course->prerequisites()->syncWithoutDetaching([
                        $prereqCourse->id => ['requirement_type' => $prereq['type'] ?? 'succeeded_before'],
                    ]);
                }
            }

            foreach ($courseData['corequisites'] ?? [] as $coreqCode) {
                $coreqCourse = $courseByCode[$coreqCode] ?? null;
                if ($coreqCourse && $coreqCourse->id !== $course->id) {
                    $course->corequisites()->syncWithoutDetaching([$coreqCourse->id]);
                }
            }
        }

        // Attach all courses to course_major with year, semester, and type
        $courseMajorPivot = [];
        foreach ($plan['courses'] as $courseData) {
            $course = $courseByCode[$courseData['course_code']] ?? null;
            if (! $course) {
                continue;
            }
            $courseMajorPivot[$course->id] = [
                'year' => $courseData['year'],
                'semester' => $courseData['semester'] ?? 1,
                'type' => $courseData['type'] ?? 'required_major',
            ];
        }
        $major->courses()->sync($courseMajorPivot);
    }
}
