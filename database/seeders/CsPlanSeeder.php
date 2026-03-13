<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Major;
use App\Models\Section;
use Illuminate\Database\Seeder;

class CsPlanSeeder extends Seeder
{
    /**
     * Seed the CS major with its full 2022 plan:
     * sections, courses (with course_type), prerequisites,
     * and course_major pivot (with pivot_type, year, semester).
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

        /* Create sections */
        $sections = [];
        foreach ($plan['sections'] as $i => $sectionData) {
            $section = Section::firstOrCreate(['name' => $sectionData['name']]);
            $major->sections()->syncWithoutDetaching([$section->id]);
            $sections[$i] = $section;
        }

        /* Create courses */
        $courseByCode = [];
        foreach ($plan['courses'] as $courseData) {
            $sectionIdx = $courseData['section'];
            $sectionId = isset($sections[$sectionIdx]) ? $sections[$sectionIdx]->id : null;

            $course = Course::firstOrCreate(
                ['course_code' => $courseData['course_code']],
                [
                    'section_id' => $sectionId,
                    'course_type' => $courseData['course_type'],
                    'name' => $courseData['name'],
                    'description' => $courseData['description'] ?? null,
                    'credit_hours' => $courseData['credit_hours'],
                    'is_lab' => $courseData['is_lab'],
                ]
            );

            $courseByCode[$courseData['course_code']] = $course;
        }

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
        }

        // Only attach courses that have a pivot_type — uni_required and uni_elective
        // are globally shared and do not belong to any specific major's curriculum.
        $courseMajorPivot = [];
        foreach ($plan['courses'] as $courseData) {
            if (! isset($courseData['pivot_type'])) {
                continue;
            }
            $course = $courseByCode[$courseData['course_code']] ?? null;
            if (! $course) {
                continue;
            }
            $courseMajorPivot[$course->id] = [
                'year' => $courseData['year'],
                'semester' => $courseData['semester'] ?? 1,
                'course_major_type' => $courseData['pivot_type'],
            ];
        }
        $major->courses()->sync($courseMajorPivot);
    }
}
