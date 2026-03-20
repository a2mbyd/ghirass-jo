import {
    store,
    update,
} from '@/actions/App/Http/Controllers/AdminDoctorController';
import { getImageUrl } from '@/lib/utils';
import { Doctor } from '@/types/doctors';
import { useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react';

interface UseDoctorsFormParams {
    mode: 'create' | 'edit';
    doctor?: Doctor;
}

interface DoctorFormData {
    name: string;
    email: string;
    department: string;
    section_id: string;
    image: File | null;
    _method: string;
}

export function useDoctorsForm({ mode, doctor }: UseDoctorsFormParams) {
    const isEdit = mode === 'edit';

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(
        isEdit ? (getImageUrl(doctor?.image ?? null) ?? null) : null,
    );

    const form = useForm<DoctorFormData>({
        name: isEdit ? (doctor?.name ?? '') : '',
        email: isEdit ? (doctor?.email ?? '') : '',
        department: isEdit ? (doctor?.department ?? '') : '',
        section_id: isEdit
            ? doctor?.section_id
                ? String(doctor.section_id)
                : ''
            : '',
        image: null,
        _method: isEdit ? 'PUT' : '',
    });

    const handleImageChange = (file: File) => {
        form.setData('image', file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && doctor) {
            form.post(update.url(doctor.id), { forceFormData: true });
        } else {
            form.post(store.url(), { forceFormData: true });
        }
    };

    return {
        form,
        fileInputRef,
        imagePreview,
        handleImageChange,
        handleSubmit,
    };
}
