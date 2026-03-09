<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSectionRequest;
use App\Models\Course;
use App\Models\Section;
use Inertia\Inertia;

class AdminSectionController extends Controller
{
    public function index(): \Inertia\Response
    {
        $sections = Section::withCount('courses')->get();

        return Inertia::render('Admin/Sections/Index', [
            'sections' => $sections,
        ]);
    }

    public function create(): \Inertia\Response
    {
        $allCourses = Course::query()->whereNull('section_id')->orderBy('name')->get();

        return Inertia::render('Admin/Sections/Create', [
            'allCourses' => $allCourses,
        ]);
    }

    public function store(StoreSectionRequest $request): \Illuminate\Http\RedirectResponse
    {
        $section = Section::create(['name' => $request->validated('name')]);

        $courseIds = $request->validated('courses') ?? [];

        if (! empty($courseIds)) {
            Course::query()
                ->whereIn('id', $courseIds)
                ->update(['section_id' => $section->id]);
        }

        return redirect()->route('admin.sections.index');
    }

    public function destroy(string $section_name): \Illuminate\Http\RedirectResponse
    {
        $section = Section::findOrFail($section_name);
        Course::query()
            ->where('section_id', $section->id)
            ->update(['section_id' => null]);
        $section->delete();

        return redirect()->route('admin.sections.index');
    }
}
