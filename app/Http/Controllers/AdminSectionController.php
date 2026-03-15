<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSectionRequest;
use App\Models\Section;
use App\Services\CourseService;
use App\Services\SectionService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class AdminSectionController extends Controller
{
    public function __construct(
        protected SectionService $sectionService,
        protected CourseService $courseService
    ) {}

    public function index(): \Inertia\Response
    {
        return Inertia::render('Admin/Sections/Index', [
            'sections' => $this->sectionService->getSectionsWithCourseCount(),
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Admin/Sections/Create', [
            'allCourses' => $this->courseService->coursesForSectionForm(),
        ]);
    }

    public function store(StoreSectionRequest $request): RedirectResponse
    {
        $this->sectionService->create($request->validated());

        return redirect()->route('admin.sections.index')
            ->with('success', config('section.messages.created'));
    }

    public function destroy(string $section_name): RedirectResponse
    {
        $section = Section::findOrFail($section_name);
        $this->sectionService->delete($section);

        return redirect()->route('admin.sections.index')
            ->with('success', config('section.messages.deleted'));
    }
}
