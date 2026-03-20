<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\MajorWithCoursesResource;
use App\Models\Major;
use App\Services\CourseService;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(CourseService $courseService): \Inertia\Response
    {
        return Inertia::render('Courses', [
            'majors' => MajorWithCoursesResource::collection(Major::all()),
            'uniRequired' => CourseResource::collection($courseService->getCoursesByInherentType('uni_required')),
            'uniElective' => CourseResource::collection($courseService->getCoursesByInherentType('uni_elective')),
            'collegeRequired' => CourseResource::collection($courseService->getCoursesByInherentType('college_required')),
            'remedialCourses' => CourseResource::collection($courseService->getRemedialCourses()),
        ]);
    }

    public function show(string $course_code, CourseService $courseService): \Inertia\Response
    {
        return Inertia::render('Course', [
            'course' => new CourseResource($courseService->getCourseByCode($course_code)),
        ]);
    }
}
