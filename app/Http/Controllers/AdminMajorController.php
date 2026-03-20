<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMajorRequest;
use App\Http\Requests\UpdateMajorRequest;
use App\Models\Major;
use App\Services\CourseService;
use App\Services\MajorService;
use Inertia\Inertia;

class AdminMajorController extends Controller
{
    public function __construct(
        protected MajorService $majorService,
        protected CourseService $courseService
    ) {}

    public function index()
    {
        return Inertia::render('Admin/Majors/Index', [
            'majors' => Major::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Majors/Create', [
            'allCourses' => $this->courseService->coursesForForm(),
            'allSections' => $this->courseService->sectionsForForm(),
        ]);
    }

    public function store(StoreMajorRequest $request)
    {
        $this->majorService->create(
            $request->validated(),
            $request->file('roadmap_image')
        );

        return redirect()->route('admin.majors.index')
            ->with('success', config('major.messages.created'));
    }

    public function edit(string $major_slug)
    {
        $major = Major::where('slug', $major_slug)
            ->with(['courses', 'sections'])
            ->firstOrFail();

        return Inertia::render('Admin/Majors/Edit', [
            'major' => $major,
            'allCourses' => $this->courseService->coursesForForm(),
            'allSections' => $this->courseService->sectionsForForm(),
        ]);
    }

    public function update(UpdateMajorRequest $request, string $major_slug)
    {
        $major = Major::where('slug', $major_slug)->firstOrFail();

        $this->majorService->update(
            $major,
            $request->validated(),
            $request->file('roadmap_image'),
            $request->boolean('remove_roadmap_image')
        );

        return redirect()->route('admin.majors.index')
            ->with('success', config('major.messages.updated'));
    }

    public function destroy(string $major_slug)
    {
        $major = Major::where('slug', $major_slug)->firstOrFail();
        $this->majorService->delete($major);

        return redirect()->route('admin.majors.index')
            ->with('success', config('major.messages.deleted'));
    }
}
