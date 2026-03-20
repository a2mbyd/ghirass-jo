<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\MajorResource;
use App\Models\Major;
use App\Services\CourseService;
use Inertia\Inertia;

class MajorController extends Controller
{
    public function show(string $major_slug, CourseService $courseService): \Inertia\Response
    {
        $major = Major::where('slug', $major_slug)->firstOrFail();

        return Inertia::render('Major', [
            'major' => new MajorResource($major),
            'sections' => $major->sections,
            'majorCourses' => CourseResource::collection($courseService->getMajorRequiredCourses($major)),
            'uniRequired' => CourseResource::collection($courseService->getCoursesByInherentType('uni_required')),
            'collegeRequired' => CourseResource::collection($courseService->getCoursesByInherentType('college_required')),
            'remedialCourses' => CourseResource::collection($courseService->getRemedialCourses()),
        ]);
    }
}
