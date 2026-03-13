import { Major } from '@/types';
import { Link, router } from '@inertiajs/react';
import { GraduationCap, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import AdminMajorController from '@/actions/App/Http/Controllers/AdminMajorController';
import DeleteItemAssertionModal from '@/components/ui/Admin/DeleteItemAssertionModal';

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
            {/* Header */}
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
            <div className="animate-fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-accent-violet">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-text">
                            التخصصات
                        </h1>
                        <p className="text-sm text-text-muted">
                            إدارة وعرض جميع التخصصات الأكاديمية
                        </p>
                    </div>
                </div>

                <Link
                    href="/admin/majors/create"
                    className="flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md"
                >
                    <Plus className="h-4 w-4" />
                    إضافة تخصص
                </Link>
            </div>

            {/* Filters */}
            <div className="animate-fade-in-up stagger-1 mb-6 flex flex-wrap items-center gap-3">
                <div className="relative min-w-[220px] flex-1">
                    <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث بالاسم أو الرابط أو الوصف..."
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
                    {filtered.length} من {majors.length} تخصص
                </span>
            </div>

            {/* Table */}
            <div className="animate-fade-in-up stagger-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-surface-alt">
                                <th className="px-5 py-3.5 text-right text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                    #
                                </th>
                                <th className="px-5 py-3.5 text-right text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                    الاسم
                                </th>
                                <th className="px-5 py-3.5 text-right text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                    الرابط
                                </th>
                                <th className="px-5 py-3.5 text-right text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                    الوصف
                                </th>
                                <th className="px-5 py-3.5 text-right text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filtered.length > 0 ? (
                                filtered.map((major, index) => (
                                    <tr
                                        key={major.id}
                                        className="group transition-colors hover:bg-surface-alt"
                                    >
                                        <td className="px-5 py-4 text-text-subtle">
                                            {index + 1}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                                                    <GraduationCap className="h-4 w-4 text-primary-500" />
                                                </div>
                                                <span className="font-medium text-text">
                                                    {major.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <code className="rounded-md bg-surface-alt px-2 py-1 font-mono text-xs text-text-muted">
                                                {major.slug}
                                            </code>
                                        </td>
                                        <td className="max-w-xs px-5 py-4">
                                            <p className="truncate text-text-muted">
                                                {major.description || '—'}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={AdminMajorController.edit.url(
                                                        major.slug,
                                                    )}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent-amber hover:text-accent-amber"
                                                    title="تعديل"
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Link>
                                                <button
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent-rose hover:text-accent-rose"
                                                    title="حذف"
                                                    onClick={() =>
                                                        setShowDeleteAssertionModal(
                                                            major.slug,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-5 py-16 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt">
                                                <GraduationCap className="h-7 w-7 text-text-subtle" />
                                            </div>
                                            <p className="font-semibold text-text">
                                                لا توجد تخصصات
                                            </p>
                                            <p className="text-sm text-text-muted">
                                                {search
                                                    ? 'لم يتطابق أي تخصص مع بحثك'
                                                    : 'ابدأ بإضافة تخصص جديد'}
                                            </p>
                                            {search && (
                                                <button
                                                    onClick={() =>
                                                        setSearch('')
                                                    }
                                                    className="mt-1 text-xs font-medium text-primary-500 hover:underline"
                                                >
                                                    مسح الفلتر
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Index;
