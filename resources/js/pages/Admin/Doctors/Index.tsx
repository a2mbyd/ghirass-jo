import AdminDoctorController from '@/actions/App/Http/Controllers/AdminDoctorController';
import DoctorsFilters from '@/components/Admin/Doctors/DoctorsFilters';
import SectionCard from '@/components/Admin/Doctors/SectionCard';
import IndexPageHeader from '@/components/ui/Admin/CreateAndEditForm/IndexPageHeader';
import DeleteItemAssertionModal from '@/components/ui/Admin/DeleteItemAssertionModal';
import { SectionWithDoctors } from '@/types/admin/doctor';
import { router } from '@inertiajs/react';
import { Stethoscope } from 'lucide-react';
import React, { useState } from 'react';

const Index = ({ sections }: { sections: SectionWithDoctors[] }) => {
    const [search, setSearch] = useState('');
    const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

    const handleDelete = () => {
        if (deleteTarget === null) {
            return;
        }
        router.delete(AdminDoctorController.destroy.url(deleteTarget));
        setDeleteTarget(null);
    };

    const filteredSections = sections.map((section) => ({
        ...section,
        doctors: search
            ? section.doctors.filter((doctor) => {
                  const q = search.toLowerCase();
                  return (
                      doctor.name.toLowerCase().includes(q) ||
                      doctor.email.toLowerCase().includes(q) ||
                      (doctor.department ?? '').toLowerCase().includes(q)
                  );
              })
            : section.doctors,
    }));

    const totalDoctors = sections.reduce((sum, s) => sum + s.doctors.length, 0);
    const filteredCount = filteredSections.reduce(
        (sum, s) => sum + s.doctors.length,
        0,
    );

    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            {deleteTarget !== null && (
                <DeleteItemAssertionModal
                    isOpen={deleteTarget !== null}
                    onClose={() => setDeleteTarget(null)}
                    onConfirm={handleDelete}
                    title="هل أنت متأكد من حذف الدكتور؟"
                    description="هذا الإجراء غير قابل للتراجع. سيتم حذف الدكتور بشكل دائم."
                />
            )}

            {/* Header */}
            <IndexPageHeader
                title="الدكاترة"
                subtitle="إدارة وعرض جميع أعضاء هيئة التدريس"
                icon={Stethoscope}
                link={AdminDoctorController.create.url()}
                linkText="إضافة دكتور"
            />

            {/* Search */}
            <DoctorsFilters
                search={search}
                setSearch={setSearch}
                filteredCount={filteredCount}
                totalDoctors={totalDoctors}
            />

            {/* Sections — always shown */}
            <div className="space-y-8">
                {filteredSections.map((section) => (
                    <SectionCard
                        key={section.id}
                        section={section}
                        search={search}
                        onDeleteClick={setDeleteTarget}
                    />
                ))}
            </div>
        </div>
    );
};

export default Index;
