import { Section } from '@/types';
import { Link, router } from '@inertiajs/react';
import {
    BookOpen,
    GraduationCap,
    Hash,
    Plus,
    Search,
    Trash2,
    X,
} from 'lucide-react';
import React, { useState } from 'react';
import DeleteItemAssertionModal from '@/components/ui/Admin/DeleteItemAssertionModal';
import AdminSectionController from '@/actions/App/Http/Controllers/AdminSectionController';
import { ACCENT_COLORS } from './colors';

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
            <div className="animate-fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-accent-violet">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-text">
                            القسم
                        </h1>
                        <p className="text-sm text-text-muted">
                            إدارة وعرض جميع القسم الدراسية
                        </p>
                    </div>
                </div>

                <Link
                    href="/admin/sections/create"
                    className="flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md"
                >
                    <Plus className="h-4 w-4" />
                    إضافة قسم
                </Link>
            </div>

            {/* Search + Count */}
            <div className="animate-fade-in-up stagger-1 mb-6 flex flex-wrap items-center gap-3">
                <div className="relative min-w-[220px] flex-1">
                    <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث بالاسم..."
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
                    {filtered.length} من {sections.length} قسم
                </span>
            </div>

            {/* Cards Grid */}
            {filtered.length > 0 ? (
                <div className="animate-fade-in-up stagger-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((section, index) => (
                        <div
                            key={section.id}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft) transition-all hover:border-primary-200 hover:shadow-md"
                        >
                            {/* Gradient accent bar */}
                            <div
                                className={`h-1.5 w-full bg-linear-to-r ${ACCENT_COLORS[index % ACCENT_COLORS.length]}`}
                            />

                            <div className="flex flex-1 flex-col p-5">
                                {/* Icon + Name */}
                                <div className="mb-5 flex items-start gap-3">
                                    <div
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${ACCENT_COLORS[index % ACCENT_COLORS.length]}`}
                                    >
                                        <GraduationCap className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="min-w-0 pt-1">
                                        <h3 className="truncate font-semibold text-text">
                                            {section.name}
                                        </h3>
                                        <div className="mt-0.5 flex items-center gap-1 text-xs text-text-subtle">
                                            <Hash className="h-3 w-3" />
                                            <span>{section.id}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Courses count badge */}
                                <div className="mb-5 flex items-center gap-2">
                                    <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-alt px-3 py-2">
                                        <BookOpen className="h-4 w-4 text-primary-500" />
                                        <span className="text-sm font-semibold text-text">
                                            {section.courses_count ?? 0}
                                        </span>
                                        <span className="text-xs text-text-muted">
                                            مادة دراسية
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-auto flex items-center justify-end border-t border-border pt-4">
                                    <button
                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent-rose hover:bg-accent-rose/5 hover:text-accent-rose"
                                        title="حذف"
                                        onClick={() =>
                                            setShowDeleteAssertionModal(
                                                section.id,
                                            )
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="animate-fade-in-up stagger-2 flex flex-col items-center justify-center rounded-2xl border border-border bg-surface py-20 shadow-(--shadow-soft)">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt">
                        <GraduationCap className="h-8 w-8 text-text-subtle" />
                    </div>
                    <p className="mt-4 font-semibold text-text">
                        لا يتطابق أي قسم مع بحثك
                    </p>

                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="mt-3 text-xs font-medium text-primary-500 hover:underline"
                        >
                            مسح الفلتر
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Index;
