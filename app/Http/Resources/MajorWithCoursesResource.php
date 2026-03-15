<?php

namespace App\Http\Resources;

use App\Services\CourseService;

class MajorWithCoursesResource extends MajorResource
{
    public function toArray($request): array
    {
        $service = app(CourseService::class);

        return array_merge(parent::toArray($request), [
            'required' => CourseResource::collection($service->getMajorCoursesByType($this->resource, 'required_major')),
            'elective' => CourseResource::collection($service->getMajorCoursesByType($this->resource, 'elective_major')),
            'graduationProject' => CourseResource::collection($service->getMajorCoursesByType($this->resource, 'graduation_project')),
        ]);
    }
}
