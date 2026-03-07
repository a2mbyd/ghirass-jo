<?php

namespace App\Http\Controllers;

use App\Models\Major;
use App\Services\CourseService;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(CourseService $courseService)
    {
        $majors = Major::all()->map(function ($major) use ($courseService) {
            return [
                'id' => $major->id,
                'name' => $major->name,
                'slug' => $major->slug,
                'description' => $major->description,
                'roadmap_image' => $major->roadmap_image,

                'required' => $courseService->getMajorCoursesByType(
                    $major,
                    'required_major'
                ),

                'elective' => $courseService->getMajorCoursesByType(
                    $major,
                    'elective_major'
                ),
            ];
        });

        return Inertia::render('Courses', [
            'universityRequired' => $courseService->getGlobalCoursesByType(
                'required_university'
            ),

            'universityElective' => $courseService->getGlobalCoursesByType(
                'elective_university'
            ),

            'collegeRequired' => $courseService->getGlobalCoursesByType(
                'required_college'
            ),

            'majors' => $majors,
        ]);
    }

    public function show($course_code, CourseService $courseService)
    {
        $course = $courseService->getCourseByCode($course_code);

        abort_if(! $course, 404);

        return Inertia::render('Course', [
            'course' => $course,
        ]);
    }
}
