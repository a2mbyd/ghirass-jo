import { BookOpen } from 'lucide-react';
import AdminCourseController from '@/actions/App/Http/Controllers/AdminCourseController';
import CourseForm from '@/components/Admin/Courses/CourseForm';
import type { AdminCourseBasic } from "@/features/admin/courses/types/course";
import type { Section } from "@/features/doctors/types/section";
import FormHeader from "@/shared/ui/admin/form/FormHeader";

interface CreateProps {
    sections: Section[];
    allCourses: AdminCourseBasic[];
    allMajors: { id: number; name: string; slug: string }[];
}

const Create = ({ sections, allCourses, allMajors }: CreateProps) => {
    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            <FormHeader
                title="إضافة مادة جديدة"
                subtitle="أنشئ مادة دراسية جديدة وأضف تفاصيلها"
                backLink={AdminCourseController.index.url()}
                icon={BookOpen}
            />

            <CourseForm
                mode="create"
                sections={sections}
                allCourses={allCourses}
                allMajors={allMajors}
                cancelLink={AdminCourseController.index.url()}
            />
        </div>
    );
};

export default Create;
