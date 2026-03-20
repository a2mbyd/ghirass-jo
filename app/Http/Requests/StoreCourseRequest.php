<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
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
            'course_code' => ['required', 'string', 'max:50', 'unique:courses,course_code'],
            'description' => ['nullable', 'string', 'max:1000'],
            'credit_hours' => ['required', 'integer', 'min:1', 'max:10'],
            'course_type' => ['required', 'in:major_course,uni_elective,uni_required,college_required,remedial_course'],
            'is_lab' => ['boolean'],
            'section_id' => ['nullable', 'exists:sections,id'],
            'prerequisites' => ['array'],
            'prerequisites.*' => ['exists:courses,id'],
            'majors' => ['array'],
            'majors.*.id' => ['required', 'exists:majors,id'],
            'majors.*.year' => ['required', 'integer', 'min:1', 'max:6'],
            'majors.*.semester' => ['required', 'integer', 'in:1,2'],
            'majors.*.course_major_type' => ['required', 'in:uni_elective,uni_required,college_required,remedial_course'],
            'files' => ['array'],
            'files.*.title' => ['required', 'string', 'max:255'],
            'files.*.url' => ['required', 'string', 'max:500'],
            'videos' => ['array'],
            'videos.*.title' => ['required', 'string', 'max:255'],
            'videos.*.url' => ['required', 'string', 'max:500'],
            'past_year_questions' => ['array'],
            'past_year_questions.*.name' => ['required', 'in:first,second,mid,final,quizzes,comprehensive'],
            'past_year_questions.*.url' => ['required', 'string', 'max:500'],
        ];
    }
}
