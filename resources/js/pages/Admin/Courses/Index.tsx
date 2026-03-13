import { AdminCourse } from '@/types/admin/major';
import { Section } from '@/types/section';
import AdminCourseController from '@/actions/App/Http/Controllers/AdminCourseController';
import DeleteItemAssertionModal from '@/components/ui/Admin/DeleteItemAssertionModal';
import { Link, router } from '@inertiajs/react';
import {
    BookMarked,
    BookOpen,
    ChevronDown,
    FlaskConical,
    Hash,
    Layers,
    Pencil,
    Plus,
    Search,
    Trash2,
    X,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { ACCENT_COLORS } from '../Sections/colors';

interface IndexProps {
    courses: AdminCourse[];
    sections: Section[];
}

const Index = ({ courses, sections }: IndexProps) => {
    const [search, setSearch] = useState('');
    const [collapsed, setCollapsed] = useState<Set<number | string>>(new Set());
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    const toggleCollapse = (key: number | string) => {
        setCollapsed((prev) => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    };

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        if (!q) return courses;
        return courses.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                (c.course_code?.toLowerCase().includes(q) ?? false),
        );
    }, [courses, search]);

    const grouped = useMemo(() => {
        const map = new Map<
            number | 'uncategorized',
            { label: string; courses: AdminCourse[] }
        >();
        for (const s of sections) {
            map.set(s.id, {
                label: s.name,
                courses: filtered.filter((c) => c.section_id === s.id),
            });
        }
        const uncategorized = filtered.filter((c) => c.section_id == null);
        if (uncategorized.length > 0) {
            map.set('uncategorized', {
                label: 'غير مصنف',
                courses: uncategorized,
            });
        }
        return map;
    }, [filtered, sections]);

    const handleDelete = (code: string) => {
        router.delete(AdminCourseController.destroy.url(code));
        setDeleteTarget(null);
    };

    const totalLabs = courses.filter((c) => c.is_lab).length;
    const visibleGroupCount = Array.from(grouped.values()).filter(
        (g) => g.courses.length > 0,
    ).length;

    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            {deleteTarget !== null && (
                <DeleteItemAssertionModal
                    isOpen
                    onClose={() => setDeleteTarget(null)}
                    onConfirm={() => handleDelete(deleteTarget)}
                    title="هل أنت متأكد من حذف هذه المادة؟"
                    description="هذا الإجراء غير قابل للتراجع. سيتم حذف المادة الدراسية بشكل دائم."
                />
            )}

            {/* ── Header ─────────────────────────────────────────── */}
            <div className="animate-fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-accent-violet">
                        <BookMarked className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-text">
                            المقررات الدراسية
                        </h1>
                        <p className="text-sm text-text-muted">
                            إدارة وعرض جميع المقررات الدراسية
                        </p>
                    </div>
                </div>
                <Link
                    href={AdminCourseController.create.url()}
                    className="flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md"
                >
                    <Plus className="h-4 w-4" />
                    إضافة مادة
                </Link>
            </div>

            {/* ── Stats Strip ────────────────────────────────────── */}
            <div className="animate-fade-in-up stagger-1 mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-(--shadow-soft)">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                        <BookOpen className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                        <p className="text-xs text-text-muted">إجمالي المواد</p>
                        <p className="text-2xl font-bold text-text">
                            {courses.length}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-(--shadow-soft)">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                        <Layers className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                        <p className="text-xs text-text-muted">الأقسام</p>
                        <p className="text-2xl font-bold text-text">
                            {sections.length}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-(--shadow-soft)">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                        <FlaskConical className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                        <p className="text-xs text-text-muted">مواد مختبر</p>
                        <p className="text-2xl font-bold text-text">
                            {totalLabs}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Search + Controls ──────────────────────────────── */}
            <div className="animate-fade-in-up stagger-2 mb-6 flex flex-wrap items-center gap-3">
                <div className="relative min-w-[220px] flex-1">
                    <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث بالاسم أو رمز المادة..."
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
                    {filtered.length} من {courses.length} مادة
                </span>
                {visibleGroupCount > 1 && (
                    <button
                        type="button"
                        onClick={() =>
                            collapsed.size > 0
                                ? setCollapsed(new Set())
                                : setCollapsed(
                                      new Set(
                                          Array.from(grouped.keys()).map(
                                              String,
                                          ),
                                      ),
                                  )
                        }
                        className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-text-muted shadow-(--shadow-soft) transition hover:border-primary-400 hover:text-primary-500"
                    >
                        {collapsed.size > 0 ? 'فتح الكل' : 'طي الكل'}
                    </button>
                )}
            </div>

            {/* ── Section Groups ─────────────────────────────────── */}
            <div className="animate-fade-in-up stagger-3 space-y-4">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface py-20 shadow-(--shadow-soft)">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt">
                            <BookMarked className="h-8 w-8 text-text-subtle" />
                        </div>
                        <p className="mt-4 font-semibold text-text">
                            لا توجد مواد تطابق بحثك
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
                ) : (
                    Array.from(grouped.entries()).map(
                        ([key, { label, courses: groupCourses }], idx) => {
                            if (groupCourses.length === 0) return null;
                            const isCollapsed = collapsed.has(String(key));
                            const accentClass =
                                ACCENT_COLORS[idx % ACCENT_COLORS.length];
                            return (
                                <div
                                    key={String(key)}
                                    className="overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft) transition-shadow hover:shadow-md"
                                >
                                    {/* Gradient top bar */}
                                    <div
                                        className={`h-1 w-full bg-linear-to-r ${accentClass}`}
                                    />

                                    {/* Section accordion header */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleCollapse(String(key))
                                        }
                                        className="flex w-full items-center justify-between gap-4 px-5 py-4 transition hover:bg-surface-alt"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${accentClass}`}
                                            >
                                                <Layers className="h-4 w-4 text-white" />
                                            </div>
                                            <span className="font-semibold text-text">
                                                {label}
                                            </span>
                                            <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-text-muted">
                                                {groupCourses.length} مادة
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`h-4 w-4 text-text-subtle transition-transform duration-200 ${
                                                isCollapsed ? '-rotate-90' : ''
                                            }`}
                                        />
                                    </button>

                                    {/* Course rows */}
                                    {!isCollapsed && (
                                        <div className="border-t border-border">
                                            {/* Table header */}
                                            <div className="hidden items-center gap-4 border-b border-border bg-surface-alt px-5 py-2.5 sm:flex">
                                                <span className="w-[90px] text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                                    الرمز
                                                </span>
                                                <span className="flex-1 text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                                    اسم المادة
                                                </span>
                                                <span className="w-[80px] text-center text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                                    الساعات
                                                </span>
                                                <span className="w-[70px] text-center text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                                    النوع
                                                </span>
                                                <span className="w-[72px]" />
                                            </div>

                                            <div className="divide-y divide-border">
                                                {groupCourses.map((course) => (
                                                    <div
                                                        key={course.id}
                                                        className="group flex flex-wrap items-center gap-3 px-5 py-3.5 transition hover:bg-surface-alt sm:flex-nowrap sm:gap-4"
                                                    >
                                                        {/* Code */}
                                                        <div className="flex w-[90px] shrink-0 items-center gap-1.5">
                                                            <Hash className="h-3.5 w-3.5 shrink-0 text-text-subtle" />
                                                            <span className="font-mono text-xs font-medium text-text-muted">
                                                                {course.course_code ??
                                                                    '—'}
                                                            </span>
                                                        </div>

                                                        {/* Name */}
                                                        <span className="flex-1 text-sm font-medium text-text">
                                                            {course.name}
                                                        </span>

                                                        {/* Credit hours */}
                                                        <div className="flex w-[80px] justify-center">
                                                            <span className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-text-muted">
                                                                {
                                                                    course.credit_hours
                                                                }{' '}
                                                                ساعة
                                                            </span>
                                                        </div>

                                                        {/* Lab badge */}
                                                        <div className="flex w-[70px] justify-center">
                                                            {course.is_lab ? (
                                                                <span className="flex items-center gap-1 rounded-lg bg-cyan-50 px-2.5 py-1 text-xs font-medium text-accent-cyan">
                                                                    <FlaskConical className="h-3 w-3" />
                                                                    مختبر
                                                                </span>
                                                            ) : (
                                                                <span className="rounded-lg bg-surface-alt px-2.5 py-1 text-xs text-text-subtle">
                                                                    نظري
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="flex w-[72px] shrink-0 items-center justify-end gap-1.5 transition-opacity">
                                                            <Link
                                                                href={AdminCourseController.edit.url(
                                                                    course.course_code,
                                                                )}
                                                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent-amber hover:text-accent-amber"
                                                                title="تعديل"
                                                            >
                                                                <Pencil className="h-3.5 w-3.5" />
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDeleteTarget(
                                                                        course.course_code,
                                                                    )
                                                                }
                                                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent-rose hover:bg-accent-rose/5 hover:text-accent-rose"
                                                                title="حذف"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Section footer */}
                                            <div className="flex items-center justify-end border-t border-border bg-surface-alt px-5 py-2.5">
                                                <Link
                                                    href={AdminCourseController.create.url()}
                                                    className="flex items-center gap-1.5 text-xs font-medium text-text-muted transition hover:text-primary-500"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                    إضافة مادة لهذا القسم
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        },
                    )
                )}
            </div>
        </div>
    );
};

export default Index;
