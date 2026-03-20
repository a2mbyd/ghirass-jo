import { BookMarked, GraduationCap, ImageIcon } from 'lucide-react';
import { useMajorForm } from "@/features/admin/majors/hooks/useMajorForm";
import type { AdminCourse, MajorWithRelations } from "@/features/admin/majors/types/major";
import type { Section } from "@/features/doctors/types/section";
import { index as majorsIndex } from '@/routes/admin/majors';
import Actions from "@/shared/ui/admin/form/Actions";
import FormCard from "@/shared/ui/admin/form/FormCard";
import MajorCoursesDnD from "@/shared/ui/admin/form/MajorCoursesDnD";
import FileInput from "@/shared/ui/admin/inputs/FileInput";
import TextAreaInput from "@/shared/ui/admin/inputs/TextAreaInput";
import TextInput from "@/shared/ui/admin/inputs/TextInput";

interface MajorFormProps {
    mode: 'create' | 'edit';
    major?: MajorWithRelations;
    allCourses: AdminCourse[];
    allSections: Section[];
}

export default function MajorForm({
    mode,
    major,
    allCourses,
    allSections,
}: MajorFormProps) {
    const {
        form,
        isEdit,
        imagePreview,
        handleNameChange,
        handleImageFile,
        handleSubmit,
    } = useMajorForm(mode, major);

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
            encType="multipart/form-data"
        >
            <FormCard
                title="المعلومات الأساسية"
                icon={<GraduationCap className="h-4 w-4 text-primary-500" />}
            >
                <div className="flex flex-col gap-5 p-6">
                    <div className="flex gap-5">
                        <TextInput
                            id="name"
                            label="الاسم"
                            value={form.data.name}
                            onChange={handleNameChange}
                            placeholder="مثال: هندسة الحاسوب"
                            error={form.errors.name}
                            required
                            dir="rtl"
                            className="flex-1"
                        />
                        <TextInput
                            id="slug"
                            label="الاسم المختصر"
                            value={form.data.slug}
                            onChange={(v) => form.setData('slug', v)}
                            placeholder="مثال: cs"
                            error={form.errors.slug}
                            required
                            dir="rtl"
                        />
                    </div>
                    <TextAreaInput
                        label="الوصف"
                        value={form.data.description}
                        onChange={(v) => form.setData('description', v)}
                        placeholder="أدخل وصفاً مختصراً للتخصص..."
                        error={form.errors.description}
                        className="md:col-span-2"
                    />
                </div>
            </FormCard>

            <FormCard
                title="صورة خارطة الطريق"
                icon={<ImageIcon className="h-4 w-4 text-primary-500" />}
            >
                <div className="p-6">
                    <FileInput
                        preview={imagePreview}
                        file={form.data.roadmap_image}
                        onFileChange={handleImageFile}
                        error={form.errors.roadmap_image}
                    />
                </div>
            </FormCard>

            <FormCard
                title="المقررات الدراسية"
                icon={<BookMarked className="h-4 w-4 text-accent-cyan" />}
            >
                <MajorCoursesDnD
                    allCourses={allCourses}
                    allSections={allSections}
                    assignedIds={form.data.courses}
                    onAssign={(id) =>
                        form.setData('courses', [...form.data.courses, id])
                    }
                    onUnassign={(id) =>
                        form.setData(
                            'courses',
                            form.data.courses.filter((c: number) => c !== id),
                        )
                    }
                    onAssignAll={(ids) => {
                        const assigned = new Set(form.data.courses);
                        const toAdd = ids.filter((id) => !assigned.has(id));
                        if (toAdd.length > 0)
                            form.setData('courses', [
                                ...form.data.courses,
                                ...toAdd,
                            ]);
                    }}
                    error={form.errors.courses}
                />
            </FormCard>

            <Actions
                cancelLink={majorsIndex.url()}
                submitText={isEdit ? 'حفظ التغييرات' : 'انشاء التخصص'}
                processing={form.processing}
            />
        </form>
    );
}
