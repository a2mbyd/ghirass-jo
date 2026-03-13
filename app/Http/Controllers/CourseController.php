<?php

namespace App\Http\Controllers;

use App\Models\Major;
use App\Services\CourseService;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(CourseService $courseService): \Inertia\Response
    {
        $majors = Major::all()->map(function ($major) use ($courseService) {
            return [
                'id' => $major->id,
                'name' => $major->name,
                'slug' => $major->slug,
                'description' => $major->description,
                'roadmap_image' => $major->roadmap_image,
                'required' => $courseService->getMajorCoursesByType($major, 'required_major'),
                'elective' => $courseService->getMajorCoursesByType($major, 'elective_major'),
                'graduationProject' => $courseService->getMajorCoursesByType($major, 'graduation_project'),
            ];
        });
        return Inertia::render('Courses', [
            'majors' => $majors,
            'uniRequired' => $courseService->getCoursesByInherentType('uni_required'),
            'uniElective' => $courseService->getCoursesByInherentType('uni_elective'),
            'collegeRequired' => $courseService->getCoursesByInherentType('college_required'),
        ]);
    }

    public function show(string $course_code, CourseService $courseService): \Inertia\Response
    {
        $course = $courseService->getCourseByCode($course_code);

        abort_if(! $course, 404);

        return Inertia::render('Course', [
            'course' => $course,
        ]);
    }
}
