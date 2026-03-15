import DoctorCard from '@/components/Admin/Doctors/DoctorCard';
import type { SectionWithDoctors } from '@/types/admin/doctor';
import { Stethoscope, User } from 'lucide-react';
import React from 'react';

interface Props {
    section: SectionWithDoctors;
    search: string;
    onDeleteClick: (id: number) => void;
}

const SectionCard = ({ section, search, onDeleteClick }: Props) => {
    return (
        <div className="animate-fade-in-up stagger-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
            {/* Section header */}
            <div className="flex items-center gap-3 border-b border-border bg-surface-alt px-6 py-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                    <Stethoscope className="h-4 w-4 text-primary-500" />
                </div>
                <h2 className="font-semibold text-text">{section.name}</h2>
                <span className="mr-auto rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-600">
                    {section.doctors.length} دكتور
                </span>
            </div>

            {/* Doctor cards or empty state */}
            {section.doctors.length > 0 ? (
                <div className="flex flex-wrap gap-6 p-6">
                    {section.doctors.map((doctor) => (
                        <DoctorCard
                            key={doctor.id}
                            doctor={doctor}
                            onDeleteClick={onDeleteClick}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2 py-10 text-center">
                    <User className="h-8 w-8 text-text-subtle" />
                    <p className="text-sm font-medium text-text-muted">
                        {search
                            ? 'لم يتطابق أي دكتور مع بحثك في هذا القسم'
                            : 'لا يوجد دكاترة في هذا القسم'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default SectionCard;
