import { AdminCourse } from '@/types/admin/major';
import { Section } from '@/types/section';
import AdminCourseController from '@/actions/App/Http/Controllers/AdminCourseController';
import DeleteItemAssertionModal from '@/components/ui/Admin/DeleteItemAssertionModal';
import { router } from '@inertiajs/react';
import { BookMarked } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { ACCENT_COLORS } from '../Sections/colors';
import IndexPageHeader from '@/components/ui/Admin/CreateAndEditForm/IndexPageHeader';
import CoursesStatsStrip from '@/components/Admin/Courses/CoursesStatsStrip';
import CoursesCollapsibleSection from '@/components/Admin/Courses/CoursesCollapsibleSection';
import CoursesFilters from '@/components/Admin/Courses/CoursesFilters';
import EmptyStateSearch from '@/components/Admin/Courses/EmptyStateSearch';

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
                label: 'غير مصنف في قسم',
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
    const visibleGroups = Array.from(grouped.entries()).filter(
        ([, g]) => g.courses.length > 0,
    );
    const visibleGroupCount = visibleGroups.length;
    const visibleGroupKeys = visibleGroups.map(([key]) => String(key));

    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            {/* ── Delete Assertion Modal ─────────────────────────── */}
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
            <IndexPageHeader
                title="المقررات الدراسية"
                subtitle="إدارة وعرض جميع المقررات الدراسية"
                link={AdminCourseController.create.url()}
                linkText="إضافة مادة"
                icon={BookMarked}
            />

            {/* ── Stats Strip ────────────────────────────────────── */}
            <CoursesStatsStrip
                courses={courses.length}
                sections={sections.length}
                totalLabs={totalLabs}
            />

            {/* ── Search + Controls ──────────────────────────────── */}
            <CoursesFilters
                search={search}
                setSearch={setSearch}
                filtered={filtered.length}
                courses={courses.length}
                visibleGroupCount={visibleGroupCount}
                visibleGroupKeys={visibleGroupKeys}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            {/* ── Section Groups ─────────────────────────────────── */}
            <div className="animate-fade-in-up stagger-3 space-y-4">
                {filtered.length === 0 ? (
                    <EmptyStateSearch search={search} setSearch={setSearch} />
                ) : (
                    Array.from(grouped.entries()).map(
                        ([key, { label, courses: groupCourses }], idx) => (
                            <CoursesCollapsibleSection
                                key={String(key)}
                                groupKey={key}
                                label={label}
                                groupCourses={groupCourses}
                                collapsed={collapsed}
                                toggleCollapse={toggleCollapse}
                                accentClass={
                                    ACCENT_COLORS[idx % ACCENT_COLORS.length]
                                }
                                setDeleteTarget={setDeleteTarget}
                            />
                        ),
                    )
                )}
            </div>
        </div>
    );
};

export default Index;
