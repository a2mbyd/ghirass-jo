import { Major } from '@/types';
import { router } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';
import { useState } from 'react';
import DeleteItemAssertionModal from '@/components/ui/Admin/DeleteItemAssertionModal';
import AdminMajorController from '@/actions/App/Http/Controllers/AdminMajorController';
import MajorsFilters from '@/components/Admin/Majors/MajorsFilters';
import MajorsTable from '@/components/Admin/Majors/MajorsTable';
import IndexPageHeader from '@/components/ui/Admin/CreateAndEditForm/IndexPageHeader';

const Index = ({ majors }: { majors: Major[] }) => {
    const [search, setSearch] = useState('');
    const [showDeleteAssertionModal, setShowDeleteAssertionModal] = useState<
        string | null
    >(null);

    const filtered = majors.filter((major) => {
        const q = search.toLowerCase();
        return (
            major.name.toLowerCase().includes(q) ||
            major.slug.toLowerCase().includes(q) ||
            (major.description ?? '').toLowerCase().includes(q)
        );
    });

    const handleDeleteAssertionModal = (slug: string) => {
        router.delete(AdminMajorController.destroy.url(slug));
    };

    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            {/* ── Delete Assertion Modal ─────────────────────────── */}
            {showDeleteAssertionModal && (
                <DeleteItemAssertionModal
                    isOpen={showDeleteAssertionModal !== null}
                    onClose={() => setShowDeleteAssertionModal(null)}
                    onConfirm={() => {
                        handleDeleteAssertionModal(showDeleteAssertionModal);
                    }}
                    title="هل أنت متأكد من حذف التخصص؟"
                    description="هذا الإجراء غير قابل للتراجع. سيتم حذف التخصص بشكل دائم."
                />
            )}
            {/* ── Header ─────────────────────────────────────────── */}
            <IndexPageHeader
                title="التخصصات"
                subtitle="إدارة وعرض جميع التخصصات الأكاديمية"
                link={AdminMajorController.create.url()}
                linkText="إضافة تخصص"
                icon={GraduationCap}
            />

            {/* ── Filters ─────────────────────────────────────────── */}
            <MajorsFilters
                search={search}
                setSearch={setSearch}
                filtered={filtered}
                majors={majors}
            />

            {/* ── Table ─────────────────────────────────────────── */}
            <MajorsTable
                filteredMajors={filtered}
                search={search}
                setSearch={setSearch}
                setShowDeleteAssertionModal={setShowDeleteAssertionModal}
            />
        </div>
    );
};

export default Index;
