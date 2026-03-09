<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMajorRequest;
use App\Http\Requests\UpdateMajorRequest;
use App\Models\Course;
use App\Models\Major;
use App\Models\Section;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminMajorController extends Controller
{
    public function index()
    {
        $majors = Major::all();

        return Inertia::render('Admin/Majors/Index', [
            'majors' => $majors,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Majors/Create', [
            'allCourses' => Course::orderBy('name')
                ->get(['id', 'name', 'course_code', 'credit_hours', 'is_lab', 'section_id']),
            'allSections' => Section::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StoreMajorRequest $request)
    {
        $data = [
            'name' => $request->validated('name'),
            'description' => $request->validated('description'),
            'slug' => $request->validated('slug'),
        ];

        $data['roadmap_image'] = $request->hasFile('roadmap_image')
            ? $request->file('roadmap_image')->store('roadmap-images', 'public')
            : '';

        $major = Major::create($data);

        $courseIds = $request->validated('courses') ?? [];
        if (! empty($courseIds)) {
            $attachData = collect($courseIds)->mapWithKeys(fn($id) => [
                $id => ['year' => 1, 'semester' => 1, 'type' => 'required'],
            ])->all();
            $major->courses()->attach($attachData);
        }

        $sectionIds = Course::whereIn('id', $major->courses()->pluck('courses.id'))
            ->whereNotNull('section_id')
            ->distinct()
            ->pluck('section_id')
            ->values()
            ->all();

        $major->sections()->sync($sectionIds);

        return redirect()->route('admin.majors')->with('success', 'تم إنشاء التخصص بنجاح');
    }

    public function edit(string $major_slug)
    {
        $major = Major::where('slug', $major_slug)
            ->with(['courses', 'sections'])
            ->firstOrFail();

        return Inertia::render('Admin/Majors/Edit', [
            'major' => $major,
            'allCourses' => Course::orderBy('name')
                ->get(['id', 'name', 'course_code', 'credit_hours', 'is_lab', 'section_id']),
            'allSections' => Section::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(UpdateMajorRequest $request, string $major_slug)
    {
        $major = Major::where('slug', $major_slug)->firstOrFail();

        /* ── Update Major Data ─────────────────────────────────────── */
        $data = [
            'name' => $request->validated('name'),
            'description' => $request->validated('description'),
            'slug' => $request->validated('slug'),
        ];

        /* ── Update Roadmap Image ─────────────────────────────────────── */
        if ($request->hasFile('roadmap_image')) {
            if ($major->roadmap_image) {
                Storage::disk('public')->delete($major->roadmap_image);
            }
            $data['roadmap_image'] = $request->file('roadmap_image')->store('roadmap-images', 'public');
        }
        $major->update($data);

        /* ── Update Courses ─────────────────────────────────────── */
        $newCourseIds = $request->validated('courses') ?? [];
        $assignedCourseIds = $major->courses()->pluck('courses.id')->toArray();

        $toDetach = array_diff($assignedCourseIds, $newCourseIds);
        $toAttach = array_diff($newCourseIds, $assignedCourseIds);

        if (count($toDetach) > 0) {
            $major->courses()->detach($toDetach);
        }

        if (count($toAttach) > 0) {
            $attachData = collect($toAttach)->mapWithKeys(fn($id) => [
                $id => ['year' => 1, 'semester' => 1, 'type' => 'required'],
            ])->all();
            $major->courses()->attach($attachData);
        }

        /* ── Update Sections ─────────────────────────────────────── */
        $sectionIds = Course::whereIn('id', $major->courses()->pluck('courses.id'))
            ->whereNotNull('section_id')
            ->distinct()
            ->pluck('section_id')
            ->values()
            ->all();

        $major->sections()->sync($sectionIds);

        return redirect()->route('admin.majors')->with('success', 'تم تحديث التخصص بنجاح');
    }

    public function destroy(string $major_slug)
    {
        $major = Major::where('slug', $major_slug)->firstOrFail();
        $major->delete();

        return redirect()->route('admin.majors')->with('success', 'تم حذف التخصص بنجاح');
    }
}
