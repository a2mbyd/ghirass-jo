<?php

namespace App\Http\Controllers;

use App\Models\Major;
use App\Services\CourseService;
use Inertia\Inertia;

class MajorController extends Controller
{
    public function show($major_slug, CourseService $courseService)
    {
        $major = Major::where('slug', $major_slug)->firstOrFail();

        return Inertia::render('Major', [
            'major' => $major,
            'sections' => $major->sections,
            'courses' => $courseService->getMajorCourses($major),
        ]);
    }
}
