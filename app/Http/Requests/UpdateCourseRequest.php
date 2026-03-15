<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'course_code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('courses', 'course_code')->ignore($this->route('course_code'), 'course_code'),
            ],
            'description' => ['nullable', 'string', 'max:1000'],
            'credit_hours' => ['required', 'integer', 'min:1', 'max:10'],
            'is_lab' => ['boolean'],
            'section_id' => ['nullable', 'exists:sections,id'],
            'prerequisites' => ['array'],
            'prerequisites.*' => ['exists:courses,id'],
            'majors' => ['array'],
            'majors.*.id' => ['required', 'exists:majors,id'],
            'majors.*.year' => ['required', 'integer', 'min:1', 'max:6'],
            'majors.*.semester' => ['required', 'integer', 'in:1,2'],
            'majors.*.course_major_type' => ['required', 'in:elective_university,elective_major,required_university,required_major,required_college'],
            'new_files' => ['array'],
            'new_files.*.title' => ['required', 'string', 'max:255'],
            'new_files.*.url' => ['required', 'string', 'max:500'],
            'delete_file_ids' => ['array'],
            'delete_file_ids.*' => ['integer'],
            'new_videos' => ['array'],
            'new_videos.*.title' => ['required', 'string', 'max:255'],
            'new_videos.*.url' => ['required', 'string', 'max:500'],
            'delete_video_ids' => ['array'],
            'delete_video_ids.*' => ['integer'],
            'new_past_year_questions' => ['array'],
            'new_past_year_questions.*.name' => ['required', 'in:first,second,mid,final,quizzes,comprehensive'],
            'new_past_year_questions.*.url' => ['required', 'string', 'max:500'],
            'delete_pyq_ids' => ['array'],
            'delete_pyq_ids.*' => ['integer'],
        ];
    }
}
