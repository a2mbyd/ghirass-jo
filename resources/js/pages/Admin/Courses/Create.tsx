import AdminCourseController from '@/actions/App/Http/Controllers/AdminCourseController';
import CourseForm from '@/components/Admin/Courses/CourseForm';
import FormHeader from '@/components/ui/Admin/CreateAndEditForm/FormCard/FormHeader';
import { AdminCourseBasic } from '@/types/admin/course';
import { Section } from '@/types/section';
import { BookOpen } from 'lucide-react';

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
