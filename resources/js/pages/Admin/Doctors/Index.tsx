import AdminDoctorController from '@/actions/App/Http/Controllers/AdminDoctorController';
import DeleteItemAssertionModal from '@/components/ui/Admin/DeleteItemAssertionModal';
import { getImageUrl } from '@/lib/utils';
import { SectionWithDoctors } from '@/types/admin/doctor';
import { Link, router } from '@inertiajs/react';
import {
    Pencil,
    Plus,
    Search,
    Stethoscope,
    Trash2,
    User,
    X,
} from 'lucide-react';
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
            <div className="animate-fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-accent-violet">
                        <Stethoscope className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-text">
                            الدكاترة
                        </h1>
                        <p className="text-sm text-text-muted">
                            إدارة وعرض جميع أعضاء هيئة التدريس
                        </p>
                    </div>
                </div>

                <Link
                    href={AdminDoctorController.create.url()}
                    className="flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md"
                >
                    <Plus className="h-4 w-4" />
                    إضافة دكتور
                </Link>
            </div>

            {/* Search */}
            <div className="animate-fade-in-up stagger-1 mb-8 flex flex-wrap items-center gap-3">
                <div className="relative min-w-[220px] flex-1">
                    <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث بالاسم أو البريد أو القسم..."
                        className="w-full rounded-xl border border-border bg-surface py-2.5 pr-9 pl-9 text-sm text-text placeholder-text-subtle shadow-(--shadow-soft) transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute top-1/2 left-3 -translate-y-1/2 text-text-subtle hover:text-text"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <span className="text-xs text-text-muted">
                    {filteredCount} من {totalDoctors} دكتور
                </span>
            </div>

            {/* Sections — always shown */}
            <div className="space-y-8">
                {filteredSections.map((section) => (
                    <div
                        key={section.id}
                        className="animate-fade-in-up stagger-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)"
                    >
                        {/* Section header */}
                        <div className="flex items-center gap-3 border-b border-border bg-surface-alt px-6 py-4">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                                <Stethoscope className="h-4 w-4 text-primary-500" />
                            </div>
                            <h2 className="font-semibold text-text">
                                {section.name}
                            </h2>
                            <span className="mr-auto rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-600">
                                {section.doctors.length} دكتور
                            </span>
                        </div>

                        {/* Doctor cards or empty state */}
                        {section.doctors.length > 0 ? (
                            <div className="flex flex-wrap gap-6 p-6">
                                {section.doctors.map((doctor) => (
                                    <div
                                        key={doctor.id}
                                        className="group flex w-28 flex-col items-center gap-2"
                                    >
                                        {/* Avatar */}
                                        <div className="relative">
                                            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-border bg-surface-alt transition-all group-hover:border-primary-300 group-hover:shadow-md">
                                                {doctor.image ? (
                                                    <img
                                                        src={
                                                            getImageUrl(
                                                                doctor.image,
                                                            ) ?? ''
                                                        }
                                                        alt={doctor.name}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display =
                                                                'none';
                                                            e.currentTarget.nextElementSibling?.removeAttribute(
                                                                'hidden',
                                                            );
                                                        }}
                                                    />
                                                ) : null}
                                                <div
                                                    className="flex h-full w-full items-center justify-center"
                                                    hidden={!!doctor.image}
                                                >
                                                    <User className="h-9 w-9 text-text-subtle" />
                                                </div>
                                            </div>

                                            {/* Action buttons overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center gap-1 rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                                                <div className="flex gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
                                                    <Link
                                                        href={AdminDoctorController.edit.url(
                                                            doctor.id,
                                                        )}
                                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-text-muted transition hover:bg-accent-amber hover:text-white"
                                                        title="تعديل"
                                                    >
                                                        <Pencil className="h-3 w-3" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            setDeleteTarget(
                                                                doctor.id,
                                                            )
                                                        }
                                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-text-muted transition hover:bg-accent-rose hover:text-white"
                                                        title="حذف"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Name & location */}
                                        <div className="w-full text-center">
                                            <p className="truncate text-xs font-semibold text-text">
                                                {doctor.name}
                                            </p>
                                            {doctor.department && (
                                                <p className="truncate text-xs text-text-muted">
                                                    موقع الدكتور في{' '}
                                                    {doctor.department}
                                                </p>
                                            )}
                                        </div>
                                    </div>
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
                ))}
            </div>
        </div>
    );
};

export default Index;
