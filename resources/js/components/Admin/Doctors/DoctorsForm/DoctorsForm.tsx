import { Stethoscope, User } from 'lucide-react';
import React from 'react';
import { index } from '@/actions/App/Http/Controllers/AdminDoctorController';
import { useDoctorsForm } from "@/features/admin/doctors/hooks/useDoctorsForm";
import type { Doctor } from "@/features/doctors/types/doctors";
import type { Section } from "@/features/doctors/types/section";
import Actions from "@/shared/ui/admin/form/Actions";
import FormCard from "@/shared/ui/admin/form/index";
import FileInput from "@/shared/ui/admin/inputs/FileInput";
import SelectInput from "@/shared/ui/admin/inputs/SelectInput";
import TextInput from "@/shared/ui/admin/inputs/TextInput";

interface DoctorsFormProps {
    mode: 'create' | 'edit';
    doctor?: Doctor;
    sections: Section[];
}

const DoctorsForm = ({ mode, doctor, sections }: DoctorsFormProps) => {
    const { form, imagePreview, handleImageChange, handleSubmit } =
        useDoctorsForm({ mode, doctor });

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
            encType="multipart/form-data"
        >
            <FormCard
                title="المعلومات الأساسية"
                icon={<Stethoscope className="h-4 w-4 text-primary-500" />}
                allowOverflow
            >
                <div className="flex flex-col gap-5 p-6">
                    <div className="flex gap-5">
                        <TextInput
                            id="name"
                            label="الاسم"
                            value={form.data.name}
                            onChange={(v) => form.setData('name', v)}
                            placeholder="مثال: Dr. Ahmad Hassan"
                            error={form.errors.name}
                            required
                            className="flex-1"
                        />
                        <TextInput
                            id="email"
                            label="البريد الإلكتروني"
                            type="email"
                            value={form.data.email}
                            onChange={(v) => form.setData('email', v)}
                            placeholder="example@university.edu"
                            error={form.errors.email}
                            required
                            dir="ltr"
                            className="flex-1"
                        />
                    </div>

                    <div className="flex gap-5">
                        <TextInput
                            id="department"
                            label="الموقع (القسم)"
                            value={form.data.department}
                            onChange={(v) => form.setData('department', v)}
                            placeholder="مثال: C4"
                            error={form.errors.department}
                            className="flex-1"
                        />
                        <SelectInput
                            id="section_id"
                            label="القسم"
                            value={form.data.section_id}
                            onChange={(v) => form.setData('section_id', v)}
                            options={sections.map((s) => ({
                                value: String(s.id),
                                label: s.name,
                            }))}
                            error={form.errors.section_id}
                            className="flex-1"
                        />
                    </div>
                </div>
            </FormCard>

            <FormCard
                title="الصورة الشخصية"
                icon={<User className="h-4 w-4 text-primary-500" />}
            >
                <div className="p-6">
                    <FileInput
                        variant="avatar"
                        preview={imagePreview}
                        file={form.data.image}
                        onFileChange={handleImageChange}
                        hint="اختر صورة بصيغة JPG أو PNG بحجم أقصاه 2 ميغابايت"
                        error={form.errors.image}
                    />
                </div>
            </FormCard>

            <Actions
                cancelLink={index.url()}
                submitText={mode === 'edit' ? 'حفظ التعديلات' : 'إضافة الدكتور'}
                processing={form.processing}
            />
        </form>
    );
};

export default DoctorsForm;
