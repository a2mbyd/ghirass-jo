import { Section } from '@/types';
import { router } from '@inertiajs/react';
import { Layers } from 'lucide-react';
import React, { useState } from 'react';
import DeleteItemAssertionModal from '@/components/ui/Admin/DeleteItemAssertionModal';
import AdminSectionController from '@/actions/App/Http/Controllers/AdminSectionController';
import IndexPageHeader from '@/components/ui/Admin/CreateAndEditForm/IndexPageHeader';
import SectionFilters from '@/components/Admin/Sections/SectionFilters';
import EmptyStateSearch from '@/components/Admin/Sections/EmptyStateSearch';
import SectionCard from '@/components/Admin/Sections/SectionCard';

const Index = ({ sections }: { sections: Section[] }) => {
    const [search, setSearch] = useState('');
    const [showDeleteAssertionModal, setShowDeleteAssertionModal] = useState<
        number | null
    >(null);

    const filtered = sections.filter((section) =>
        section.name.toLowerCase().includes(search.toLowerCase()),
    );

    const handleDelete = (id: number) => {
        router.delete(AdminSectionController.destroy.url(id));
        setShowDeleteAssertionModal(null);
    };

    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            {showDeleteAssertionModal !== null && (
                <DeleteItemAssertionModal
                    isOpen={true}
                    onClose={() => setShowDeleteAssertionModal(null)}
                    onConfirm={() => handleDelete(showDeleteAssertionModal)}
                    title="هل أنت متأكد من حذف هذا القسم؟"
                    description="هذا الإجراء غير قابل للتراجع. سيتم حذف القسم بشكل دائم."
                />
            )}

            {/* Header */}
            <IndexPageHeader
                title="القسم"
                subtitle="إدارة وعرض جميع القسم الدراسية"
                link={AdminSectionController.create.url()}
                linkText="إضافة قسم"
                icon={Layers}
            />

            {/* Search + Count */}
            <SectionFilters
                search={search}
                setSearch={setSearch}
                filtered={filtered.length}
                sections={sections.length}
            />

            {/* Cards Grid */}
            {filtered.length > 0 ? (
                <div className="animate-fade-in-up stagger-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((section, index) => (
                        <SectionCard
                            key={index}
                            section={section}
                            index={index}
                            setShowDeleteAssertionModal={
                                setShowDeleteAssertionModal
                            }
                        />
                    ))}
                </div>
            ) : (
                <EmptyStateSearch search={search} setSearch={setSearch} />
            )}
        </div>
    );
};

export default Index;
