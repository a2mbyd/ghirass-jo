import { Stethoscope } from 'lucide-react';
import React from 'react';
import { index } from '@/actions/App/Http/Controllers/AdminDoctorController';
import DoctorsForm from '@/components/Admin/Doctors/DoctorsForm/DoctorsForm';
import type { Doctor } from "@/features/doctors/types/doctors";
import type { Section } from "@/features/doctors/types/section";
import FormHeader from "@/shared/ui/admin/form/FormHeader";

interface EditProps {
    doctor: Doctor;
    sections: Section[];
}

const Edit = ({ doctor, sections }: EditProps) => {
    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            <FormHeader
                backLink={index.url()}
                title="تعديل الدكتور"
                subtitle={doctor.name ?? ''}
                icon={Stethoscope}
            />
            <DoctorsForm mode="edit" doctor={doctor} sections={sections} />
        </div>
    );
};

export default Edit;
