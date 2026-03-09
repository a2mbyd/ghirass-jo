<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMajorRequest extends FormRequest
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
            'description' => ['nullable', 'string'],
            'slug' => ['required', 'string', 'max:255'],
            'roadmap_image' => ['nullable', 'image', 'max:4096'],
            'courses' => ['nullable', 'array'],
            'courses.*' => ['integer', 'exists:courses,id'],
            'sections' => ['nullable', 'array'],
            'sections.*' => ['integer', 'exists:sections,id'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'الاسم مطلوب.',
            'slug.required' => 'الرابط مطلوب.',
            'roadmap_image.image' => 'يجب أن يكون الملف صورة.',
            'roadmap_image.max' => 'يجب أن لا يتجاوز حجم الصورة 4 ميغابايت.',
            'courses.*.exists' => 'أحد المقررات المحددة غير موجود.',
            'sections.*.exists' => 'أحد الأقسام المحددة غير موجود.',
        ];
    }
}
