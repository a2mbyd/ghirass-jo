import MajorForm from '@/components/Admin/Majors/MajorForm';
import type { AdminCourse, MajorWithRelations } from "@/features/admin/majors/types/major";
import type { Section } from "@/features/doctors/types/section";
import { index as majorsIndex } from '@/routes/admin/majors';
import FormHeader from "@/shared/ui/admin/form/FormHeader";

interface EditProps {
    major: MajorWithRelations;
    allCourses: AdminCourse[];
    allSections: Section[];
}

const Edit = ({ major, allCourses, allSections }: EditProps) => {
    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            <FormHeader
                title="تعديل التخصص"
                subtitle={major.name}
                backLink={majorsIndex.url()}
            />

            <MajorForm
                mode="edit"
                major={major}
                allCourses={allCourses}
                allSections={allSections}
            />
        </div>
    );
};

export default Edit;
