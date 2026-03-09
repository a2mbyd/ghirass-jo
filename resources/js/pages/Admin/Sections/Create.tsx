import { AdminCourse } from '@/types/major';
import { store } from '@/actions/App/Http/Controllers/AdminSectionController';
import { Link, useForm } from '@inertiajs/react';
import {
    ArrowRight,
    BookMarked,
    GraduationCap,
    Layers,
    Loader2,
    Search,
    X,
} from 'lucide-react';
import React, { DragEvent, useState } from 'react';
import CourseChip from '@/components/ui/Admin/EditPage.CourseChip';
import FormSectionHeader from '@/components/ui/Admin/EditPage.FormSectionHeader';

interface CreateProps {
    allCourses: AdminCourse[];
}

interface FormData {
    name: string;
    courses: number[];
}

const Create = ({ allCourses }: CreateProps) => {
    const [courseSearch, setCourseSearch] = useState('');
    const [draggedCourseId, setDraggedCourseId] = useState<number | null>(null);
    const [dragOverPanel, setDragOverPanel] = useState<
        'available' | 'assigned' | null
    >(null);

    const form = useForm<FormData>({
        name: '',
        courses: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.submit(store());
    };

    /* ── Course helpers ──────────────────────────────────── */
    const assignedCourseIds = new Set(form.data.courses);

    const availableCourses = allCourses.filter(
        (c) =>
            !assignedCourseIds.has(c.id) &&
            (courseSearch === '' ||
                c.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
                (c.course_code ?? '')
                    .toLowerCase()
                    .includes(courseSearch.toLowerCase())),
    );

    const assignedCourses = allCourses.filter((c) =>
        assignedCourseIds.has(c.id),
    );

    const handleAssign = (id: number) => {
        form.setData('courses', [...form.data.courses, id]);
    };

    const handleUnassign = (id: number) => {
        form.setData(
            'courses',
            form.data.courses.filter((cId) => cId !== id),
        );
    };

    const onDragStart = (e: DragEvent, id: number) => {
        setDraggedCourseId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const onDropAssigned = (e: DragEvent) => {
        e.preventDefault();
        if (
            draggedCourseId !== null &&
            !assignedCourseIds.has(draggedCourseId)
        ) {
            handleAssign(draggedCourseId);
        }
        setDraggedCourseId(null);
        setDragOverPanel(null);
    };

    const onDropAvailable = (e: DragEvent) => {
        e.preventDefault();
        if (
            draggedCourseId !== null &&
            assignedCourseIds.has(draggedCourseId)
        ) {
            handleUnassign(draggedCourseId);
        }
        setDraggedCourseId(null);
        setDragOverPanel(null);
    };

    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            {/* Header */}
            <div className="animate-fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-accent-violet">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-text">
                            إضافة قسم
                        </h1>
                        <p className="text-sm text-text-muted">
                            إنشاء قسم دراسي جديد
                        </p>
                    </div>
                </div>
                <Link
                    href="/admin/sections"
                    className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-muted shadow-(--shadow-soft) transition hover:border-primary-500 hover:text-primary-500"
                >
                    <ArrowRight className="h-4 w-4" />
                    العودة للقائمة
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* ── Card 1: Name ─────────────────────────────── */}
                <section className="animate-fade-in-up stagger-1 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                    <FormSectionHeader
                        title="معلومات القسم"
                        icon={
                            <GraduationCap className="h-4 w-4 text-primary-500" />
                        }
                    />
                    <div className="p-6">
                        <div className="space-y-1.5">
                            <label
                                className="block text-sm font-medium text-text"
                                htmlFor="name"
                            >
                                الاسم
                                <span className="mr-1 text-danger">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={form.data.name}
                                onChange={(e) =>
                                    form.setData('name', e.target.value)
                                }
                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text placeholder-text-subtle shadow-(--shadow-soft) transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                placeholder="مثال: علوم الحاسوب"
                                required
                            />
                            {form.errors.name && (
                                <p className="text-xs text-danger">
                                    {form.errors.name}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── Card 2: Courses ───────────────────────────── */}
                <section className="animate-fade-in-up stagger-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                    <FormSectionHeader
                        title="المواد الدراسية"
                        icon={
                            <BookMarked className="h-4 w-4 text-primary-500" />
                        }
                    />
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            {/* Available panel */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                        المواد المتاحة
                                        <span className="mr-2 rounded-full bg-surface-alt px-2 py-0.5 font-mono text-text-muted">
                                            {availableCourses.length}
                                        </span>
                                    </p>
                                </div>

                                {/* Search */}
                                <div className="relative">
                                    <Search className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-text-subtle" />
                                    <input
                                        type="text"
                                        value={courseSearch}
                                        onChange={(e) =>
                                            setCourseSearch(e.target.value)
                                        }
                                        placeholder="بحث..."
                                        className="w-full rounded-lg border border-border bg-background py-2 pr-8 pl-8 text-xs text-text placeholder-text-subtle transition outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20"
                                    />
                                    {courseSearch && (
                                        <button
                                            type="button"
                                            onClick={() => setCourseSearch('')}
                                            className="absolute top-1/2 left-2.5 -translate-y-1/2 text-text-subtle hover:text-text"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    )}
                                </div>

                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setDragOverPanel('available');
                                    }}
                                    onDragLeave={() => setDragOverPanel(null)}
                                    onDrop={onDropAvailable}
                                    className={`flex min-h-[240px] flex-col gap-1.5 overflow-y-auto rounded-xl border-2 border-dashed p-3 transition ${
                                        dragOverPanel === 'available'
                                            ? 'border-primary-400 bg-primary-50/40'
                                            : 'border-border bg-surface-alt'
                                    }`}
                                >
                                    {availableCourses.length > 0 ? (
                                        availableCourses.map((course) => (
                                            <CourseChip
                                                key={course.id}
                                                course={course}
                                                onDragStart={(e) =>
                                                    onDragStart(e, course.id)
                                                }
                                                onAction={() =>
                                                    handleAssign(course.id)
                                                }
                                                actionLabel="+"
                                                actionClass="bg-primary-50 text-primary-500 hover:bg-primary-100"
                                                isDragging={
                                                    draggedCourseId ===
                                                    course.id
                                                }
                                            />
                                        ))
                                    ) : (
                                        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                                            <Layers className="h-6 w-6 text-text-subtle" />
                                            <p className="text-xs text-text-muted">
                                                {courseSearch
                                                    ? 'لا توجد نتائج'
                                                    : 'جميع المواد مضافة'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Assigned panel */}
                            <div className="flex flex-col gap-3">
                                <p className="text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                    مواد القسم
                                    <span className="mr-2 rounded-full bg-primary-50 px-2 py-0.5 font-mono text-primary-600">
                                        {assignedCourses.length}
                                    </span>
                                </p>

                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setDragOverPanel('assigned');
                                    }}
                                    onDragLeave={() => setDragOverPanel(null)}
                                    onDrop={onDropAssigned}
                                    className={`flex min-h-[240px] flex-col gap-1.5 overflow-y-auto rounded-xl border-2 border-dashed p-3 transition ${
                                        dragOverPanel === 'assigned'
                                            ? 'border-primary-400 bg-primary-50/40'
                                            : assignedCourses.length > 0
                                              ? 'border-primary-200 bg-primary-50/20'
                                              : 'border-border bg-surface-alt'
                                    }`}
                                >
                                    {assignedCourses.length > 0 ? (
                                        assignedCourses.map((course) => (
                                            <CourseChip
                                                key={course.id}
                                                course={course}
                                                onDragStart={(e) =>
                                                    onDragStart(e, course.id)
                                                }
                                                onAction={() =>
                                                    handleUnassign(course.id)
                                                }
                                                actionLabel="×"
                                                actionClass="bg-danger/10 text-danger hover:bg-danger/20"
                                                isDragging={
                                                    draggedCourseId ===
                                                    course.id
                                                }
                                                assigned
                                            />
                                        ))
                                    ) : (
                                        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                                            <BookMarked className="h-6 w-6 text-text-subtle" />
                                            <p className="text-xs text-text-muted">
                                                اسحب مواد هنا أو اضغط "+"
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {form.errors.courses && (
                                    <p className="text-xs text-danger">
                                        {form.errors.courses}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Submit */}
                <div className="animate-fade-in-up stagger-3 flex justify-end gap-3">
                    <Link
                        href="/admin/sections"
                        className="rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text-muted transition hover:border-primary-500 hover:text-primary-500"
                    >
                        إلغاء
                    </Link>
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600 hover:shadow-md disabled:opacity-60"
                    >
                        {form.processing && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        حفظ القسم
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
