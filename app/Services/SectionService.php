<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Section;
use Illuminate\Database\Eloquent\Collection;

class SectionService
{
    public function getSectionsWithCourseCount(): Collection
    {
        return Section::withCount('courses')->get();
    }

    /**
     * @param  array<int>  $courseIds
     */
    public function create(array $data): Section
    {
        $section = Section::create(['name' => $data['name']]);

        $courseIds = $data['courses'] ?? [];
        if (! empty($courseIds)) {
            Course::query()
                ->whereIn('id', $courseIds)
                ->update(['section_id' => $section->id]);
        }

        return $section;
    }

    public function delete(Section $section): void
    {
        Course::query()
            ->where('section_id', $section->id)
            ->update(['section_id' => null]);
        $section->delete();
    }
}
