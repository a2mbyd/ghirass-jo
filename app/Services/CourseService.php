<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Major;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class CourseService
{
    /**
     * @return Collection<int, array{id: int, sectionId: int|null, name: string, course_code: string, credit_hours: int, is_lab: bool, course_type: string, year: int, semester: int, prerequisites: array<int>}>
     */
    public function getMajorCourses(Major $major): Collection
    {
        $majorCourses = $major->courses()
            ->where('courses.course_type', 'major_course')
            ->with(['prerequisites'])
            ->get()
            ->map(function ($course) {
                return [
                    'id' => $course->id,
                    'sectionId' => $course->section_id,
                    'name' => $course->name,
                    'course_code' => $course->course_code,
                    'credit_hours' => $course->credit_hours,
                    'is_lab' => (bool) $course->is_lab,
                    'course_type' => $course->pivot->course_type,
                    'year' => (int) $course->pivot->year,
                    'semester' => (int) ($course->pivot->semester ?? 1),
                    'prerequisites' => $course->prerequisites->pluck('id')->toArray(),
                ];
            });

        return $majorCourses
            ->merge($this->getCoursesByInherentType('uni_required'))
            ->merge($this->getCoursesByInherentType('uni_elective'))
            ->merge($this->getCoursesByInherentType('college_required'))
            ->values();
    }

    /**
     * Major courses required for the roadmap main graph (required_major + graduation_project).
     *
     * @return Collection<int, array{id: int, sectionId: int|null, name: string, course_code: string, credit_hours: int, is_lab: bool, course_type: string, year: int, semester: int, prerequisites: array<int>}>
     */
    public function getMajorRequiredCourses(Major $major): Collection
    {
        $courses = $major->courses()
            ->wherePivotIn('course_major_type', ['required_major', 'graduation_project'])
            ->with(['prerequisites'])
            ->get();

        return $courses->map(function ($course) {
            return [
                'id' => $course->id,
                'sectionId' => $course->section_id,
                'name' => $course->name,
                'course_type' => $course->course_type,
                'course_code' => $course->course_code,
                'credit_hours' => $course->credit_hours,
                'is_lab' => (bool) $course->is_lab,
                'course_major_type' => $course->pivot->course_major_type,
                'year' => (int) $course->pivot->year,
                'semester' => (int) ($course->pivot->semester ?? 1),
                'prerequisites' => $course->prerequisites->pluck('id')->toArray(),
            ];
        });
    }

    /**
     * Get all courses globally that match the given type across any major, deduplicated by course id.
     *
     * @return Collection<int, array{id: int, sectionId: int|null, name: string, course_code: string, credit_hours: int, is_lab: bool, course_type: string, year: int, semester: int, prerequisites: array<int>}>
     */
    public function getGlobalCoursesByType(string $type): Collection
    {
        $courseIds = DB::table('course_major')
            ->where('course_major_type', $type)
            ->distinct()
            ->pluck('course_id');

        $courses = Course::whereIn('id', $courseIds)
            ->with(['prerequisites'])
            ->get();

        $pivotByCourse = DB::table('course_major')
            ->where('course_major_type', $type)
            ->whereIn('course_id', $courseIds)
            ->get()
            ->groupBy('course_id')
            ->map(fn($rows) => $rows->first());

        return $courses->map(function ($course) use ($type, $pivotByCourse) {
            $pivot = $pivotByCourse->get($course->id);
            $year = (int) ($pivot?->year ?? 0);
            $semester = (int) ($pivot?->semester ?? 1);

            return [
                'id' => $course->id,
                'sectionId' => $course->section_id,
                'name' => $course->name,
                'course_code' => $course->course_code,
                'credit_hours' => $course->credit_hours,
                'is_lab' => (bool) $course->is_lab,
                'course_type' => $type,
                'year' => $year,
                'semester' => $semester,
                'prerequisites' => $course->prerequisites->pluck('id')->toArray(),
            ];
        });
    }

    /**
     * Get a major's courses filtered by a specific pivot type.
     *
     * @return Collection<int, array{id: int, sectionId: int|null, name: string, course_code: string, credit_hours: int, is_lab: bool, course_type: string, year: int, semester: int, prerequisites: array<int>}>
     */
    public function getMajorCoursesByType(Major $major, string $type): Collection
    {
        $courses = $major->courses()
            ->wherePivot('course_major_type', $type)
            ->with(['prerequisites'])
            ->get();

        return $courses->map(function ($course) use ($type) {
            return [
                'id' => $course->id,
                'sectionId' => $course->section_id,
                'name' => $course->name,
                'course_code' => $course->course_code,
                'credit_hours' => $course->credit_hours,
                'is_lab' => (bool) $course->is_lab,
                'course_type' => $type,
                'year' => (int) $course->pivot->year,
                'semester' => (int) ($course->pivot->semester ?? 1),
                'prerequisites' => $course->prerequisites->pluck('id')->toArray(),
            ];
        });
    }

    /**
     * Get all global (non-major-specific) courses by their inherent type column.
     * Covers uni_required, uni_elective, and college_required.
     *
     * @return Collection<int, array{id: int, sectionId: int|null, name: string, course_code: string, credit_hours: int, is_lab: bool, course_type: string, year: int, semester: int, prerequisites: array<int>}>
     */
    public function getCoursesByInherentType(string $type): Collection
    {
        $courses = Course::where('course_type', $type)
            ->with(['prerequisites'])
            ->get();

        return $courses->map(function ($course) use ($type) {
            return [
                'id' => $course->id,
                'sectionId' => $course->section_id,
                'name' => $course->name,
                'course_code' => $course->course_code,
                'credit_hours' => $course->credit_hours,
                'is_lab' => (bool) $course->is_lab,
                'course_type' => $type,
                'year' => 0,
                'semester' => 0,
                'prerequisites' => $course->prerequisites->pluck('id')->toArray(),
            ];
        });
    }

    public function getCourseByCode(string $code): ?Course
    {
        return Course::where('course_code', $code)
            ->with(['files', 'videos', 'pastYearQuestions'])
            ->first();
    }
}
