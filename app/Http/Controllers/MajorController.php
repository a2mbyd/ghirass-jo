<?php

namespace App\Http\Controllers;

use App\Models\Major;
use App\Services\CourseService;
use Inertia\Inertia;

class MajorController extends Controller
{
    public function show(string $major_slug, CourseService $courseService): \Inertia\Response
    {
        $major = Major::where('slug', $major_slug)->firstOrFail();
        return Inertia::render('Major', [
            'major' => $major,
            'sections' => $major->sections,
            'majorCourses' => $courseService->getMajorRequiredCourses($major),
            'majorElectives' => $courseService->getMajorCoursesByType($major, 'elective_major'),
            'uniRequired' => $courseService->getCoursesByInherentType('uni_required'),
            'collegeRequired' => $courseService->getCoursesByInherentType('college_required'),
            'uniElective' => $courseService->getCoursesByInherentType('uni_elective'),
            'allCourses' => $courseService->getMajorCourses($major),
        ]);
    }
}
