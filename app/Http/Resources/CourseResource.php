<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'sectionId' => $this->section_id,
            'name' => $this->name,
            'course_code' => $this->course_code,
            'credit_hours' => $this->credit_hours,
            'is_lab' => (bool) $this->is_lab,
            'course_type' => $this->course_type,
            'year' => (int) ($this->pivot?->year ?? 0),
            'semester' => (int) ($this->pivot?->semester ?? 1),
            'prerequisites' => $this->prerequisites->pluck('id'),

            'course_major_type' => $this->when(
                isset($this->pivot?->course_major_type),
                fn () => $this->pivot->course_major_type
            ),

            'files' => $this->whenLoaded('files', fn () => $this->files->pluck('id')),
            'videos' => $this->whenLoaded('videos', fn () => $this->videos->pluck('id')),
            'past_year_questions' => $this->whenLoaded('pastYearQuestions', fn () => $this->pastYearQuestions->pluck('id')),
        ];
    }
}
