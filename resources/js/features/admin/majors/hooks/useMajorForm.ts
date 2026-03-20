import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminMajorController from '@/actions/App/Http/Controllers/AdminMajorController';
import type { MajorWithRelations } from "@/features/admin/majors/types/major";
import { getImageUrl } from "@/shared/lib/utils";

interface FormData {
    name: string;
    description: string;
    slug: string;
    roadmap_image: File | null;
    courses: number[];
    sections: number[];
}

export function useMajorForm(
    mode: 'create' | 'edit',
    major?: MajorWithRelations,
) {
    const isEdit = mode === 'edit';

    const [imagePreview, setImagePreview] = useState<string | null>(
        isEdit ? (getImageUrl(major!.roadmap_image) ?? null) : null,
    );

    const form = useForm<FormData>({
        name: isEdit ? major!.name : '',
        description: isEdit ? (major!.description ?? '') : '',
        slug: isEdit ? major!.slug : '',
        roadmap_image: null,
        courses: isEdit ? major!.courses.map((c) => c.id) : [],
        sections: isEdit ? major!.sections.map((s) => s.id) : [],
    });

    const handleNameChange = (value: string) => {
        form.setData('name', value);
        const words = value.trim().split(/\s+/).filter(Boolean);
        const slug =
            words.length > 0
                ? words.map((w) => w[0].toLowerCase()).join('')
                : '';
        form.setData('slug', slug);
    };

    const handleImageFile = (file: File) => {
        form.setData('roadmap_image', file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            form.put(AdminMajorController.update.url(major!.slug), {
                forceFormData: true,
            });
        } else {
            form.post(AdminMajorController.store.url(), {
                forceFormData: true,
            });
        }
    };

    return {
        form,
        isEdit,
        imagePreview,
        handleNameChange,
        handleImageFile,
        handleSubmit,
    };
}
