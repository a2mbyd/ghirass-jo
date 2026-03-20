import MajorForm from '@/components/Admin/Majors/MajorForm';
import type { AdminCourse } from "@/features/admin/majors/types/major";
import type { Section } from "@/features/doctors/types/section";
import { index as majorsIndex } from '@/routes/admin/majors';
import FormHeader from "@/shared/ui/admin/form/FormHeader";

interface CreateProps {
    allCourses: AdminCourse[];
    allSections: Section[];
}

const Create = ({ allCourses, allSections }: CreateProps) => {
    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            <FormHeader
                title="إنشاء تخصص جديد"
                subtitle="أدخل بيانات التخصص والمقررات الدراسية"
                backLink={majorsIndex.url()}
            />

            <MajorForm
                mode="create"
                allCourses={allCourses}
                allSections={allSections}
            />
        </div>
    );
};

export default Create;
