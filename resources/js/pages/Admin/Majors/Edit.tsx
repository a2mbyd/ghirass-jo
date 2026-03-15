import { AdminCourse, MajorWithRelations } from '@/types/admin/major';
import { Section } from '@/types/section';
import FormHeader from '@/components/ui/Admin/CreateAndEditForm/FormCard/FormHeader';
import MajorForm from '@/components/Admin/Majors/MajorForm';
import { index as majorsIndex } from '@/routes/admin/majors';

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
