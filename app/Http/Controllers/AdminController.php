<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Doctor;
use App\Models\Major;
use App\Models\Section;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'majors' => Major::query()->count(),
                'courses' => Course::query()->count(),
                'sections' => Section::query()->count(),
                'doctors' => Doctor::query()->count(),
            ],
        ]);
    }
}
