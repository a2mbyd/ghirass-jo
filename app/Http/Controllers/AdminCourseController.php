<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Services\CourseService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminCourseController extends Controller
{
    public function __construct(
        protected CourseService $courseService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Courses/Index', [
            'courses' => $this->courseService->coursesForAdminIndex(),
            'sections' => $this->courseService->sectionsForForm(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Courses/Create', $this->courseService->coursesForAdminCreateForm());
    }

    public function store(StoreCourseRequest $request): RedirectResponse
    {
        $this->courseService->createFromAdminData($request->validated());

        return redirect()->route('admin.courses.index')
            ->with('success', config('course.messages.created'));
    }

    public function edit(string $course_code): Response
    {
        $course = $this->courseService->getCourseForAdminEdit($course_code);
        $formData = $this->courseService->coursesForAdminEditForm($course);

        return Inertia::render('Admin/Courses/Edit', [
            'course' => $course,
            ...$formData,
        ]);
    }

    public function update(UpdateCourseRequest $request, string $course_code): RedirectResponse
    {
        $course = $this->courseService->findCourseByCode($course_code);
        $this->courseService->updateFromAdminData($course, $request->validated());

        return redirect()->route('admin.courses.index')
            ->with('success', config('course.messages.updated'));
    }

    public function destroy(string $course_code): RedirectResponse
    {
        $course = $this->courseService->findCourseByCode($course_code);
        $this->courseService->delete($course);

        return redirect()->route('admin.courses.index')
            ->with('success', config('course.messages.deleted'));
    }
}
