<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Major;
use App\Models\Section;
use Illuminate\Database\Eloquent\Collection;

class CourseService
{
    public function majorsForForm(): Collection
    {
        return Major::orderBy('name')->get(['id', 'name', 'slug']);
    }

    public function coursesForAdminIndex(): Collection
    {
        return Course::orderBy('name')
            ->get(['id', 'name', 'course_code', 'credit_hours', 'is_lab', 'section_id']);
    }

    public function coursesForAdminCreateForm(): array
    {
        return [
            'sections' => $this->sectionsForForm(),
            'allCourses' => Course::where('course_type', '!=', 'elective_major')->orderBy('name')->get(['id', 'name', 'course_code', 'course_type', 'section_id']),
            'allMajors' => $this->majorsForForm(),
        ];
    }

    public function coursesForAdminEditForm(Course $course): array
    {
        return [
            'sections' => $this->sectionsForForm(),
            'allCourses' => Course::where('id', '!=', $course->id)
                ->where('course_type', '!=', 'elective_major')
                ->orderBy('name')
                ->get(['id', 'name', 'course_code', 'course_type', 'section_id']),
            'allMajors' => $this->majorsForForm(),
        ];
    }

    public function findCourseByCode(string $courseCode): Course
    {
        return Course::where('course_code', $courseCode)->firstOrFail();
    }

    public function getCourseForAdminEdit(string $courseCode): Course
    {
        return Course::where('course_code', $courseCode)
            ->with([
                'prerequisites:id,name,course_code',
                'majors:id,name,slug',
                'files',
                'videos',
                'pastYearQuestions',
            ])
            ->firstOrFail();
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function createFromAdminData(array $data): Course
    {
        $course = Course::create([
            'name' => $data['name'],
            'course_code' => $data['course_code'],
            'description' => $data['description'] ?? null,
            'credit_hours' => $data['credit_hours'],
            'course_type' => $data['course_type'],
            'is_lab' => $data['is_lab'] ?? false,
            'section_id' => $data['section_id'] ?? null,
        ]);

        $course->prerequisites()->sync($data['prerequisites'] ?? []);
        $course->majors()->sync($this->buildMajorSync($data['majors'] ?? []));
        foreach ($data['files'] ?? [] as $file) {
            $course->files()->create($file);
        }
        foreach ($data['videos'] ?? [] as $video) {
            $course->videos()->create($video);
        }
        foreach ($data['past_year_questions'] ?? [] as $pyq) {
            $course->pastYearQuestions()->create($pyq);
        }

        return $course;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function updateFromAdminData(Course $course, array $data): void
    {
        $course->update([
            'name' => $data['name'],
            'course_code' => $data['course_code'],
            'description' => $data['description'] ?? null,
            'credit_hours' => $data['credit_hours'],
            'is_lab' => $data['is_lab'] ?? false,
            'section_id' => $data['section_id'] ?? null,
        ]);

        $course->prerequisites()->sync($data['prerequisites'] ?? []);
        $course->majors()->sync($this->buildMajorSync($data['majors'] ?? []));

        if (! empty($data['delete_file_ids'])) {
            $course->files()->whereIn('id', $data['delete_file_ids'])->delete();
        }
        foreach ($data['new_files'] ?? [] as $file) {
            $course->files()->create($file);
        }

        if (! empty($data['delete_video_ids'])) {
            $course->videos()->whereIn('id', $data['delete_video_ids'])->delete();
        }
        foreach ($data['new_videos'] ?? [] as $video) {
            $course->videos()->create($video);
        }

        if (! empty($data['delete_pyq_ids'])) {
            $course->pastYearQuestions()->whereIn('id', $data['delete_pyq_ids'])->delete();
        }
        foreach ($data['new_past_year_questions'] ?? [] as $pyq) {
            $course->pastYearQuestions()->create($pyq);
        }
    }

    public function delete(Course $course): void
    {
        $course->delete();
    }

    /**
     * @param  array<int, array{id: int, year: int, semester: int, course_major_type: string}>  $majors
     * @return array<int, array{year: int, semester: int, course_major_type: string}>
     */
    private function buildMajorSync(array $majors): array
    {
        $sync = [];
        foreach ($majors as $major) {
            $sync[$major['id']] = [
                'year' => $major['year'],
                'semester' => $major['semester'],
                'course_major_type' => $major['course_major_type'],
            ];
        }

        return $sync;
    }

    public function getMajorCourses(Major $major): Collection
    {
        return $major->courses()
            ->where('courses.course_type', 'major_course')
            ->with(['prerequisites', 'files', 'videos', 'pastYearQuestions'])
            ->get()
            ->merge($this->getCoursesByInherentType('uni_required'))
            ->merge($this->getCoursesByInherentType('uni_elective'))
            ->merge($this->getCoursesByInherentType('college_required'));
    }

    public function getMajorRequiredCourses(Major $major): Collection
    {
        return $major->courses()
            ->wherePivotIn('course_major_type', ['required_major', 'graduation_project'])
            ->with(['prerequisites'])
            ->get();
    }

    public function getMajorCoursesByType(Major $major, string $type): Collection
    {
        return $major->courses()
            ->wherePivot('course_major_type', $type)
            ->with(['prerequisites'])
            ->get();
    }

    public function getCoursesByInherentType(string $type): Collection
    {
        return Course::where('course_type', $type)
            ->with(['prerequisites'])
            ->get();
    }

    public function getRemedialCourses(): Collection
    {
        return Course::where('course_type', 'remedial_course')
            ->with(['prerequisites'])
            ->get();
    }

    public function getCourseByCode(string $code): ?Course
    {
        return Course::where('course_code', $code)
            ->with(['files', 'videos', 'pastYearQuestions'])
            ->firstOrFail();
    }

    public function coursesForForm(): Collection
    {
        return Course::orderBy('name')
            ->whereIn('course_type', ['major_course', 'college_required'])
            ->get(['id', 'name', 'course_code', 'credit_hours', 'is_lab', 'section_id', 'course_type']);
    }

    public function sectionsForForm(): Collection
    {
        return Section::orderBy('name')->get(['id', 'name']);
    }

    /**
     * Courses eligible for assignment to a new section: unassigned, required_major type.
     */
    public function coursesForSectionForm(): Collection
    {
        return Course::with('majors')
            ->whereNull('section_id')
            ->whereHas('majors', fn ($q) => $q->where('course_major.course_major_type', 'required_major'))
            ->orderBy('name')
            ->get();
    }
}
