<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, array<string>> */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:sections,name'],
            'courses' => ['nullable', 'array'],
            'courses.*' => ['integer', 'exists:courses,id'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'name.required' => 'اسم الشعبة مطلوب.',
            'name.unique' => 'يوجد شعبة بهذا الاسم مسبقاً.',
            'courses.*.exists' => 'إحدى المواد المحددة غير موجودة.',
        ];
    }
}
