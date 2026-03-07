<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Major;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class CourseService
{
    /**
     * @return Collection<int, array{id: int, sectionId: int|null, name: string, course_code: string, credit_hours: int, is_lab: bool, type: string, year: int, semester: int, prerequisites: array<int>, corequisites: array<int>}>
     */
    public function getMajorCourses(Major $major): Collection
    {
        $courses = $major->courses()->with(['prerequisites', 'corequisites'])->get();

        return $courses->map(function ($course) {
            return [
                'id' => $course->id,
                'sectionId' => $course->section_id,
                'name' => $course->name,
                'course_code' => $course->course_code,
                'credit_hours' => $course->credit_hours,
                'is_lab' => (bool) $course->is_lab,
                'type' => $course->pivot->type,
                'year' => (int) $course->pivot->year,
                'semester' => (int) ($course->pivot->semester ?? 1),
                'prerequisites' => $course->prerequisites->pluck('id')->toArray(),
                'corequisites' => $course->corequisites->pluck('id')->toArray(),
            ];
        });
    }

    /**
     * Get all courses globally that match the given type across any major, deduplicated by course id.
     *
     * @return Collection<int, array{id: int, sectionId: int|null, name: string, course_code: string, credit_hours: int, is_lab: bool, type: string, year: int, semester: int, prerequisites: array<int>, corequisites: array<int>}>
     */
    public function getGlobalCoursesByType(string $type): Collection
    {
        $courseIds = DB::table('course_major')
            ->where('type', $type)
            ->distinct()
            ->pluck('course_id');

        $courses = Course::whereIn('id', $courseIds)
            ->with(['prerequisites', 'corequisites'])
            ->get();

        $pivotByCourse = DB::table('course_major')
            ->where('type', $type)
            ->whereIn('course_id', $courseIds)
            ->get()
            ->groupBy('course_id')
            ->map(fn ($rows) => $rows->first());

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
                'type' => $type,
                'year' => $year,
                'semester' => $semester,
                'prerequisites' => $course->prerequisites->pluck('id')->toArray(),
                'corequisites' => $course->corequisites->pluck('id')->toArray(),
            ];
        });
    }

    /**
     * Get a major's courses filtered by a specific pivot type.
     *
     * @return Collection<int, array{id: int, sectionId: int|null, name: string, course_code: string, credit_hours: int, is_lab: bool, type: string, year: int, semester: int, prerequisites: array<int>, corequisites: array<int>}>
     */
    public function getMajorCoursesByType(Major $major, string $type): Collection
    {
        $courses = $major->courses()
            ->wherePivot('type', $type)
            ->with(['prerequisites', 'corequisites'])
            ->get();

        return $courses->map(function ($course) use ($type) {
            return [
                'id' => $course->id,
                'sectionId' => $course->section_id,
                'name' => $course->name,
                'course_code' => $course->course_code,
                'credit_hours' => $course->credit_hours,
                'is_lab' => (bool) $course->is_lab,
                'type' => $type,
                'year' => (int) $course->pivot->year,
                'semester' => (int) ($course->pivot->semester ?? 1),
                'prerequisites' => $course->prerequisites->pluck('id')->toArray(),
                'corequisites' => $course->corequisites->pluck('id')->toArray(),
            ];
        });
    }

    public function getCourseByCode(string $code): ?Course
    {
        // convert everything to camelcase
        return Course::where('course_code', $code)
            ->with(['files', 'videos', 'pastYearQuestions'])
            ->first();
    }
}
