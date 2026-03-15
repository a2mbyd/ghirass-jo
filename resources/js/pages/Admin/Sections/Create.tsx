import { store } from '@/actions/App/Http/Controllers/AdminSectionController';
import CourseSelector from '@/components/ui/Admin/CreateAndEditForm/CourseSelector';
import FormCard from '@/components/ui/Admin/CreateAndEditForm/FormCard';
import Actions from '@/components/ui/Admin/CreateAndEditForm/Actions';
import FormHeader from '@/components/ui/Admin/CreateAndEditForm/FormCard/FormHeader';
import TextInput from '@/components/ui/Admin/CreateAndEditForm/Inputs/TextInput';
import { AdminCourse } from '@/types/admin/major';
import { useForm } from '@inertiajs/react';
import { BookMarked, GraduationCap, Layers } from 'lucide-react';
import React from 'react';
import { index as sectionsIndex } from '@/routes/admin/sections';

interface CreateProps {
    allCourses: AdminCourse[];
}

interface FormData {
    name: string;
    courses: number[];
}

const Create = ({ allCourses }: CreateProps) => {
    const form = useForm<FormData>({
        name: '',
        courses: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.submit(store());
    };

    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            <FormHeader
                title="إضافة قسم"
                subtitle="إنشاء قسم دراسي جديد"
                backLink={sectionsIndex.url()}
                icon={Layers}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormCard
                    title="معلومات القسم"
                    icon={
                        <GraduationCap className="h-4 w-4 text-primary-500" />
                    }
                >
                    <div className="p-6">
                        <TextInput
                            id="name"
                            label="الاسم"
                            value={form.data.name}
                            onChange={(value) => form.setData('name', value)}
                            placeholder="مثال: علوم الحاسوب"
                            error={form.errors.name}
                            required
                        />
                    </div>
                </FormCard>

                <FormCard
                    title="المواد الدراسية"
                    icon={<BookMarked className="h-4 w-4 text-primary-500" />}
                >
                    <div className="p-6">
                        <CourseSelector
                            allCourses={allCourses}
                            assignedIds={form.data.courses}
                            onAssign={(id) =>
                                form.setData('courses', [
                                    ...form.data.courses,
                                    id,
                                ])
                            }
                            onUnassign={(id) =>
                                form.setData(
                                    'courses',
                                    form.data.courses.filter((c) => c !== id),
                                )
                            }
                            emptyAssignedLabel="اسحب مواد هنا أو اضغط +"
                        />
                        {form.errors.courses && (
                            <p className="mt-2 text-xs text-danger">
                                {form.errors.courses}
                            </p>
                        )}
                    </div>
                </FormCard>

                <Actions
                    cancelLink={sectionsIndex.url()}
                    submitText="حفظ القسم"
                    processing={form.processing}
                />
            </form>
        </div>
    );
};

export default Create;
