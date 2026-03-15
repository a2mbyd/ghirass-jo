import AdminCourseController from '@/actions/App/Http/Controllers/AdminCourseController';
import CourseForm from '@/components/Admin/Courses/CourseForm';
import FormHeader from '@/components/ui/Admin/CreateAndEditForm/FormCard/FormHeader';
import { BookOpen } from 'lucide-react';
import {
    AdminCourseBasic,
    AdminCourseWithRelations,
} from '@/types/admin/course';
import { Section } from '@/types/section';

interface EditProps {
    course: AdminCourseWithRelations;
    sections: Section[];
    allCourses: AdminCourseBasic[];
    allMajors: { id: number; name: string; slug: string }[];
}

const Edit = ({ course, sections, allCourses, allMajors }: EditProps) => {
    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            <FormHeader
                title="تعديل المادة"
                subtitle={`${course.course_code} — ${course.name}`}
                backLink={AdminCourseController.index.url()}
                icon={BookOpen}
            />

            <CourseForm
                mode="edit"
                course={course}
                sections={sections}
                allCourses={allCourses}
                allMajors={allMajors}
                cancelLink={AdminCourseController.index.url()}
            />
        </div>
    );
};

export default Edit;
