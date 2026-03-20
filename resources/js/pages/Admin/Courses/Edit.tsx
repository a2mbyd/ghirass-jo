import { BookOpen } from 'lucide-react';
import AdminCourseController from '@/actions/App/Http/Controllers/AdminCourseController';
import CourseForm from '@/components/Admin/Courses/CourseForm';
import type {
    AdminCourseBasic,
    AdminCourseWithRelations,
} from "@/features/admin/courses/types/course";
import type { Major, Section } from "@/shared/types/index";
import FormHeader from "@/shared/ui/admin/form/FormHeader";

interface EditProps {
    course: AdminCourseWithRelations;
    sections: Section[];
    allCourses: AdminCourseBasic[];
    allMajors: Major[];
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
