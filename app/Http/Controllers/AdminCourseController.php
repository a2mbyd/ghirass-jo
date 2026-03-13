<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Major;
use App\Models\Section;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminCourseController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Courses/Index', [
            'courses' => Course::orderBy('name')
                ->get(['id', 'name', 'course_code', 'credit_hours', 'is_lab', 'section_id']),
            'sections' => Section::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Courses/Create', [
            'sections' => Section::orderBy('name')->get(['id', 'name']),
            'allCourses' => Course::orderBy('name')->get(['id', 'name', 'course_code']),
            'allMajors' => Major::orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'course_code' => 'required|string|max:50|unique:courses,course_code',
            'description' => 'nullable|string|max:1000',
            'credit_hours' => 'required|integer|min:1|max:10',
            'course_type' => 'required|in:major_course,required_college,required_university,elective_university',
            'is_lab' => 'boolean',
            'section_id' => 'nullable|exists:sections,id',
            'prerequisites' => 'array',
            'prerequisites.*' => 'exists:courses,id',
            'majors' => 'array',
            'majors.*.id' => 'required|exists:majors,id',
            'majors.*.year' => 'required|integer|min:1|max:6',
            'majors.*.semester' => 'required|integer|in:1,2',
            'majors.*.course_major_type' => 'required|in:elective_university,elective_major,required_university,required_major,required_college',
            'files' => 'array',
            'files.*.title' => 'required|string|max:255',
            'files.*.url' => 'required|string|max:500',
            'videos' => 'array',
            'videos.*.title' => 'required|string|max:255',
            'videos.*.url' => 'required|string|max:500',
            'past_year_questions' => 'array',
            'past_year_questions.*.name' => 'required|in:first,second,mid,final,quizzes,comprehensive',
            'past_year_questions.*.url' => 'required|string|max:500',
        ]);

        $course = Course::create([
            'name' => $validated['name'],
            'course_code' => $validated['course_code'],
            'description' => $validated['description'] ?? null,
            'credit_hours' => $validated['credit_hours'],
            'course_type' => $validated['course_type'],
            'is_lab' => $validated['is_lab'] ?? false,
            'section_id' => $validated['section_id'] ?? null,
        ]);

        $course->prerequisites()->sync($validated['prerequisites'] ?? []);

        $majorSync = [];
        foreach ($validated['majors'] ?? [] as $major) {
            $majorSync[$major['id']] = [
                'year' => $major['year'],
                'semester' => $major['semester'],
                'course_major_type' => $major['course_major_type'],
            ];
        }
        $course->majors()->sync($majorSync);

        foreach ($validated['files'] ?? [] as $file) {
            $course->files()->create($file);
        }

        foreach ($validated['videos'] ?? [] as $video) {
            $course->videos()->create($video);
        }

        foreach ($validated['past_year_questions'] ?? [] as $pyq) {
            $course->pastYearQuestions()->create($pyq);
        }

        return redirect()->route('admin.courses.index');
    }

    public function edit(string $course_code): Response
    {
        $course = Course::where('course_code', $course_code)
            ->with([
                'prerequisites:id,name,course_code',
                'majors:id,name,slug',
                'files',
                'videos',
                'pastYearQuestions',
            ])
            ->firstOrFail();

        return Inertia::render('Admin/Courses/Edit', [
            'course' => $course,
            'sections' => Section::orderBy('name')->get(['id', 'name']),
            'allCourses' => Course::where('id', '!=', $course->id)
                ->orderBy('name')
                ->get(['id', 'name', 'course_code']),
            'allMajors' => Major::orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function update(Request $request, string $course_code): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'credit_hours' => 'required|integer|min:1|max:10',
            'is_lab' => 'boolean',
            'section_id' => 'nullable|exists:sections,id',
            'prerequisites' => 'array',
            'prerequisites.*' => 'exists:courses,id',
            'majors' => 'array',
            'majors.*.id' => 'required|exists:majors,id',
            'majors.*.year' => 'required|integer|min:1|max:6',
            'majors.*.semester' => 'required|integer|in:1,2',
            'majors.*.course_major_type' => 'required|in:elective_university,elective_major,required_university,required_major,required_college',
            'new_files' => 'array',
            'new_files.*.title' => 'required|string|max:255',
            'new_files.*.url' => 'required|string|max:500',
            'delete_file_ids' => 'array',
            'delete_file_ids.*' => 'integer',
            'new_videos' => 'array',
            'new_videos.*.title' => 'required|string|max:255',
            'new_videos.*.url' => 'required|string|max:500',
            'delete_video_ids' => 'array',
            'delete_video_ids.*' => 'integer',
            'new_past_year_questions' => 'array',
            'new_past_year_questions.*.name' => 'required|in:first,second,mid,final,quizzes,comprehensive',
            'new_past_year_questions.*.url' => 'required|string|max:500',
            'delete_pyq_ids' => 'array',
            'delete_pyq_ids.*' => 'integer',
        ]);

        $course = Course::where('course_code', $course_code)->firstOrFail();

        $course->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'credit_hours' => $validated['credit_hours'],
            'is_lab' => $validated['is_lab'] ?? false,
            'section_id' => $validated['section_id'] ?? null,
        ]);

        $course->prerequisites()->sync($validated['prerequisites'] ?? []);

        $majorSync = [];
        foreach ($validated['majors'] ?? [] as $major) {
            $majorSync[$major['id']] = [
                'year' => $major['year'],
                'semester' => $major['semester'],
                'course_major_type' => $major['course_major_type'],
            ];
        }
        $course->majors()->sync($majorSync);

        if (! empty($validated['delete_file_ids'])) {
            $course->files()->whereIn('id', $validated['delete_file_ids'])->delete();
        }
        foreach ($validated['new_files'] ?? [] as $file) {
            $course->files()->create($file);
        }

        if (! empty($validated['delete_video_ids'])) {
            $course->videos()->whereIn('id', $validated['delete_video_ids'])->delete();
        }
        foreach ($validated['new_videos'] ?? [] as $video) {
            $course->videos()->create($video);
        }

        if (! empty($validated['delete_pyq_ids'])) {
            $course->pastYearQuestions()->whereIn('id', $validated['delete_pyq_ids'])->delete();
        }
        foreach ($validated['new_past_year_questions'] ?? [] as $pyq) {
            $course->pastYearQuestions()->create($pyq);
        }

        return redirect()->route('admin.courses.index');
    }

    public function destroy(string $course_code): RedirectResponse
    {
        $course = Course::where('course_code', $course_code)->firstOrFail();
        $course->delete();

        return redirect()->route('admin.courses.index');
    }
}
