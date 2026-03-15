import { AdminCourse } from '@/types/admin/major';
import { Section } from '@/types/section';
import FormHeader from '@/components/ui/Admin/CreateAndEditForm/FormCard/FormHeader';
import MajorForm from '@/components/Admin/Majors/MajorForm';
import { index as majorsIndex } from '@/routes/admin/majors';

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
