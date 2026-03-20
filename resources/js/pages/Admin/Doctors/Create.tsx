import { Stethoscope } from 'lucide-react';
import React from 'react';
import { index } from '@/actions/App/Http/Controllers/AdminDoctorController';
import DoctorsForm from '@/components/Admin/Doctors/DoctorsForm/DoctorsForm';
import type { Section } from "@/features/doctors/types/section";
import FormHeader from "@/shared/ui/admin/form/FormHeader";

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
