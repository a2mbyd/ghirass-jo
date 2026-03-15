import { index } from '@/actions/App/Http/Controllers/AdminDoctorController';
import DoctorsForm from '@/components/Admin/Doctors/DoctorsForm/DoctorsForm';
import FormHeader from '@/components/ui/Admin/CreateAndEditForm/FormCard/FormHeader';
import { Section } from '@/types/section';
import { Stethoscope } from 'lucide-react';
import React from 'react';

const Create = ({ sections }: { sections: Section[] }) => {
    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            <FormHeader
                backLink={index.url()}
                title="إضافة دكتور"
                subtitle="إنشاء عضو هيئة تدريس جديد"
                icon={Stethoscope}
            />
            <DoctorsForm mode="create" sections={sections} />
        </div>
    );
};

export default Create;
