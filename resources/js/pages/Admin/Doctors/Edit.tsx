import { index } from '@/actions/App/Http/Controllers/AdminDoctorController';
import DoctorsForm from '@/components/Admin/Doctors/DoctorsForm/DoctorsForm';
import FormHeader from '@/components/ui/Admin/CreateAndEditForm/FormCard/FormHeader';
import { Doctor } from '@/types/doctors';
import { Section } from '@/types/section';
import { Stethoscope } from 'lucide-react';
import React from 'react';

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
