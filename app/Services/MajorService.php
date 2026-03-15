<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Major;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;

class MajorService
{
    public function storeRoadmapImage(?UploadedFile $file): ?string
    {
        if (! $file) {
            return null;
        }

        return $file->store(config('major.roadmap_image.path'), config('major.roadmap_image.disk'));
    }

    public function deleteRoadmapImage(?string $path): void
    {
        if ($path) {
            Storage::disk(config('major.roadmap_image.disk'))->delete($path);
        }
    }

    /**
     * @param  array<int>  $courseIds
     * @return array<int>
     */
    public function getSectionIdsForCourseIds(array $courseIds): array
    {
        if (empty($courseIds)) {
            return [];
        }

        return Course::whereIn('id', $courseIds)
            ->whereNotNull('section_id')
            ->distinct()
            ->pluck('section_id')
            ->all();
    }

    /**
     * @param  array<int>  $courseIds
     * @return array<int, array{year: int, semester: int, course_major_type: string}>
     */
    public function buildCoursePivotForIds(array $courseIds): array
    {
        return array_fill_keys($courseIds, config('major.course_major_pivot'));
    }

    public function syncCoursesAndSections(Major $major, array $courseIds): void
    {
        $existingCourseIds = $major->courses()->pluck('courses.id')->all();
        $toDetach = array_diff($existingCourseIds, $courseIds);
        $toAttach = array_diff($courseIds, $existingCourseIds);

        if (! empty($toDetach)) {
            $major->courses()->detach($toDetach);
        }

        if (! empty($toAttach)) {
            $major->courses()->attach($this->buildCoursePivotForIds($toAttach));
        }

        $major->sections()->sync($this->getSectionIdsForCourseIds($courseIds));
    }

    public function attachCoursesAndSections(Major $major, array $courseIds): void
    {
        if (empty($courseIds)) {
            return;
        }

        $major->courses()->attach($this->buildCoursePivotForIds($courseIds));
        $major->sections()->sync($this->getSectionIdsForCourseIds($courseIds));
    }

    public function create(array $data, ?UploadedFile $roadmapImage = null): Major
    {
        $imagePath = $this->storeRoadmapImage($roadmapImage);

        try {
            return DB::transaction(function () use ($data, $imagePath) {
                $major = Major::create([
                    'name' => $data['name'],
                    'description' => $data['description'] ?? null,
                    'slug' => $data['slug'],
                    'roadmap_image' => $imagePath,
                ]);

                $courseIds = $data['courses'] ?? [];
                $this->attachCoursesAndSections($major, $courseIds);

                return $major;
            });
        } catch (Throwable $e) {
            $this->deleteRoadmapImage($imagePath);

            throw $e;
        }
    }

    public function update(Major $major, array $data, ?UploadedFile $roadmapImage = null, bool $removeRoadmapImage = false): void
    {
        DB::transaction(function () use ($major, $data, $roadmapImage, $removeRoadmapImage) {
            $updateData = [
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'slug' => $data['slug'],
            ];

            if ($removeRoadmapImage) {
                $this->deleteRoadmapImage($major->roadmap_image);
                $updateData['roadmap_image'] = null;
            } elseif ($roadmapImage) {
                $this->deleteRoadmapImage($major->roadmap_image);
                $updateData['roadmap_image'] = $this->storeRoadmapImage($roadmapImage);
            }

            $major->update($updateData);

            $courseIds = $data['courses'] ?? [];
            $this->syncCoursesAndSections($major, $courseIds);
        });
    }

    public function delete(Major $major): void
    {
        $this->deleteRoadmapImage($major->roadmap_image);
        $major->delete();
    }
}
