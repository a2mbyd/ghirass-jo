import { AdminCourse, MajorWithRelations } from '@/types/major';
import { Section } from '@/types/section';
import AdminMajorController, {
    update,
} from '@/actions/App/Http/Controllers/AdminMajorController';
import { Link, useForm } from '@inertiajs/react';
import {
    ArrowRight,
    BookMarked,
    ChevronLeft,
    GraduationCap,
    ImageIcon,
    Layers,
    Loader2,
    Plus,
    Upload,
    X,
} from 'lucide-react';
import React, { DragEvent, useRef, useState } from 'react';
import CourseChip from '@/components/ui/Admin/EditPage.CourseChip';
import FormSectionHeader from '@/components/ui/Admin/EditPage.FormSectionHeader';
import { getImageUrl } from '@/lib/utils';

interface EditProps {
    major: MajorWithRelations;
    allCourses: AdminCourse[];
    allSections: Section[];
}

interface FormData {
    name: string;
    description: string;
    slug: string;
    roadmap_image: File | null;
    courses: number[];
    sections: number[];
}

const Edit = ({ major, allCourses, allSections }: EditProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(
        getImageUrl(major.roadmap_image) ?? null,
    );
    const [isDraggingFile, setIsDraggingFile] = useState(false);
    const [draggedCourseId, setDraggedCourseId] = useState<number | null>(null);
    const [dragOverCoursesPanel, setDragOverCoursesPanel] = useState<
        'available' | 'assigned' | null
    >(null);

    const form = useForm<FormData>({
        name: major.name,
        description: major.description ?? '',
        slug: major.slug,
        roadmap_image: null,
        courses: major.courses.map((c) => c.id),
        sections: major.sections.map((s) => s.id),
    });

    const handleNameChange = (value: string) => {
        // take first latter from each word
        form.setData('name', value);
        const words = value.split(' ');
        const firstLetters = words.map((word) => word[0].toLowerCase());
        const slug = firstLetters.join('');
        form.setData('slug', slug);
    };

    const handleImageFile = (file: File) => {
        // Set file to your form (still works)
        form.setData('roadmap_image', file);

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    const handleImageDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingFile(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleImageFile(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(AdminMajorController.update.url(major.slug), {
            forceFormData: true,
        });
    };

    /* ── Courses DnD ─────────────────────────────────────── */
    const assignedCourseIds = new Set(form.data.courses);
    const availableCourses = allCourses.filter(
        (c) => !assignedCourseIds.has(c.id),
    );
    const assignedCourses = allCourses.filter((c) =>
        assignedCourseIds.has(c.id),
    );

    /** Group courses by section for display. Key: sectionId (number) or 'uncategorized' (null) */
    const groupCoursesBySection = (courses: AdminCourse[]) => {
        const groups = new Map<
            number | 'uncategorized',
            { sectionName: string; courses: AdminCourse[] }
        >();
        for (const s of allSections) {
            const sectionCourses = courses.filter((c) => c.section_id === s.id);
            if (sectionCourses.length > 0) {
                groups.set(s.id, {
                    sectionName: s.name,
                    courses: sectionCourses,
                });
            }
        }
        const uncategorized = courses.filter((c) => c.section_id == null);
        if (uncategorized.length > 0) {
            groups.set('uncategorized', {
                sectionName: 'غير مصنف',
                courses: uncategorized,
            });
        }
        return groups;
    };
    const availableBySection = groupCoursesBySection(availableCourses);
    const assignedBySection = groupCoursesBySection(assignedCourses);

    const handleCourseAssign = (courseId: number) => {
        form.setData('courses', [...form.data.courses, courseId]);
    };
    const handleCourseAssignAll = (courseIds: number[]) => {
        const toAdd = courseIds.filter((id) => !assignedCourseIds.has(id));
        if (toAdd.length > 0) {
            form.setData('courses', [...form.data.courses, ...toAdd]);
        }
    };
    const handleCourseUnassign = (courseId: number) => {
        form.setData(
            'courses',
            form.data.courses.filter((id) => id !== courseId),
        );
    };

    const onCourseDragStart = (e: DragEvent, id: number) => {
        setDraggedCourseId(id);
        e.dataTransfer.effectAllowed = 'move';
    };
    const onCourseDropAssigned = (e: DragEvent) => {
        e.preventDefault();
        if (
            draggedCourseId !== null &&
            !assignedCourseIds.has(draggedCourseId)
        ) {
            handleCourseAssign(draggedCourseId);
        }
        setDraggedCourseId(null);
        setDragOverCoursesPanel(null);
    };
    const onCourseDropAvailable = (e: DragEvent) => {
        e.preventDefault();
        if (
            draggedCourseId !== null &&
            assignedCourseIds.has(draggedCourseId)
        ) {
            handleCourseUnassign(draggedCourseId);
        }
        setDraggedCourseId(null);
        setDragOverCoursesPanel(null);
    };

    /* ── Sections DnD ────────────────────────────────────── */
    const assignedSectionIds = new Set(form.data.sections);
    const availableSections = allSections.filter(
        (s) => !assignedSectionIds.has(s.id),
    );
    const assignedSections = allSections.filter((s) =>
        assignedSectionIds.has(s.id),
    );

    const handleSectionAssign = (sectionId: number) => {
        form.setData('sections', [...form.data.sections, sectionId]);
    };
    const handleSectionUnassign = (sectionId: number) => {
        form.setData(
            'sections',
            form.data.sections.filter((id) => id !== sectionId),
        );
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
                            تعديل التخصص
                        </h1>
                        <p className="text-sm text-text-muted">{major.name}</p>
                    </div>
                </div>
                <Link
                    href="/admin/majors"
                    className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-muted shadow-(--shadow-soft) transition hover:border-primary-500 hover:text-primary-500"
                >
                    <ArrowRight className="h-4 w-4" />
                    العودة للقائمة
                </Link>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
                encType="multipart/form-data"
            >
                {/* ── Card 1: Basic Info ─────────────────────────── */}
                <section className="animate-fade-in-up stagger-1 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                    <FormSectionHeader
                        title="المعلومات الأساسية"
                        icon={
                            <GraduationCap className="h-4 w-4 text-primary-500" />
                        }
                    />
                    <div className="flex flex-col gap-5 p-6">
                        {/* Name */}
                        <div className="flex gap-5">
                            <div className="flex-1 space-y-1.5">
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
                                        handleNameChange(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text placeholder-text-subtle shadow-(--shadow-soft) transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                    placeholder="مثال: هندسة الحاسوب"
                                    required
                                />
                                {form.errors.name && (
                                    <p className="text-xs text-danger">
                                        {form.errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Slug */}
                            <div className="space-y-1.5">
                                <label
                                    className="block text-sm font-medium text-text"
                                    htmlFor="slug"
                                >
                                    الاسم المختصر
                                    <span className="mr-1 text-danger">*</span>
                                </label>
                                <input
                                    id="slug"
                                    type="text"
                                    value={form.data.slug}
                                    onChange={(e) =>
                                        form.setData('slug', e.target.value)
                                    }
                                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text placeholder-text-subtle shadow-(--shadow-soft) transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                    dir="rtl"
                                    placeholder="مثال: cs"
                                    required
                                />
                                {form.errors.slug && (
                                    <p className="text-xs text-danger">
                                        {form.errors.slug}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="block text-sm font-medium text-text">
                                الوصف
                            </label>
                            <textarea
                                value={form.data.description}
                                onChange={(e) =>
                                    form.setData('description', e.target.value)
                                }
                                rows={4}
                                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text placeholder-text-subtle shadow-(--shadow-soft) transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                placeholder="أدخل وصفاً مختصراً للتخصص..."
                            />
                            {form.errors.description && (
                                <p className="text-xs text-danger">
                                    {form.errors.description}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── Card 2: Roadmap Image ──────────────────────── */}
                <section className="animate-fade-in-up stagger-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                    <FormSectionHeader
                        title="صورة خارطة الطريق"
                        icon={
                            <ImageIcon className="h-4 w-4 text-primary-500" />
                        }
                    />
                    <div className="p-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Drop Zone */}
                            <div
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setIsDraggingFile(true);
                                }}
                                onDragLeave={() => setIsDraggingFile(false)}
                                onDrop={handleImageDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition ${
                                    isDraggingFile
                                        ? 'border-primary-500 bg-primary-50'
                                        : 'border-border bg-surface-alt hover:border-primary-400 hover:bg-primary-50/50'
                                }`}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                                    <Upload className="h-6 w-6 text-primary-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-text">
                                        اسحب الصورة هنا أو انقر للرفع
                                    </p>
                                    <p className="mt-1 text-xs text-text-muted">
                                        PNG, JPG, WEBP — حتى 4 ميغابايت
                                    </p>
                                </div>
                                {form.data.roadmap_image && (
                                    <p className="text-xs font-medium text-primary-500">
                                        {form.data.roadmap_image.name}
                                    </p>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            handleImageFile(file);
                                        }
                                    }}
                                />
                            </div>

                            {/* Preview */}
                            <div className="flex flex-col gap-3">
                                <p className="text-xs font-medium tracking-wider text-text uppercase">
                                    المعاينة
                                </p>
                                {getImageUrl(imagePreview) ? (
                                    <div className="group relative overflow-hidden rounded-xl border border-border">
                                        <img
                                            src={imagePreview as string}
                                            alt="معاينة خارطة الطريق"
                                            className="max-h-auto h-full w-full object-contain text-text"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null);
                                                form.setData(
                                                    'roadmap_image',
                                                    null,
                                                );
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value =
                                                        '';
                                                }
                                            }}
                                            className="absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface/80 text-text-muted opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:text-danger"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt">
                                        <div className="flex flex-col items-center gap-2 text-text-subtle">
                                            <ImageIcon className="h-8 w-8" />
                                            <p className="text-xs">
                                                لا توجد صورة
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {form.errors.roadmap_image && (
                            <p className="mt-2 text-xs text-danger">
                                {form.errors.roadmap_image}
                            </p>
                        )}
                    </div>
                </section>

                {/* ── Card 3: Courses ────────────────────────────── */}
                <section className="animate-fade-in-up stagger-3 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                    <div className="flex items-center gap-3 border-b border-border px-6 py-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50">
                            <BookMarked className="h-4 w-4 text-accent-cyan" />
                        </div>
                        <div className="flex flex-1 items-center justify-between">
                            <h2 className="font-semibold text-text">
                                المقررات الدراسية
                            </h2>
                            <span className="text-xs text-text-muted">
                                اسحب المقررات بين القائمتين
                            </span>
                        </div>
                    </div>
                    <div className="grid min-h-[320px] auto-rows-fr gap-4 p-6 md:grid-cols-2">
                        {/* Available */}
                        <div className="flex min-h-0 flex-col gap-2">
                            <p className="text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                المتاحة ({availableCourses.length})
                            </p>
                            <div
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragOverCoursesPanel('available');
                                }}
                                onDragLeave={() =>
                                    setDragOverCoursesPanel(null)
                                }
                                onDrop={onCourseDropAvailable}
                                className={`flex min-h-[200px] flex-1 flex-col space-y-3 rounded-xl border-2 border-dashed p-3 transition ${
                                    dragOverCoursesPanel === 'available'
                                        ? 'border-accent-cyan bg-cyan-50/30'
                                        : 'border-border bg-surface-alt'
                                }`}
                            >
                                {availableCourses.length === 0 ? (
                                    <div className="flex h-full min-h-[160px] items-center justify-center">
                                        <p className="text-xs text-text-subtle">
                                            جميع المقررات مُعيَّنة
                                        </p>
                                    </div>
                                ) : (
                                    Array.from(
                                        availableBySection.entries(),
                                    ).map(
                                        ([
                                            sectionKey,
                                            { sectionName, courses },
                                        ]) => (
                                            <div
                                                key={String(sectionKey)}
                                                className="space-y-1.5"
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-xs font-semibold text-text-muted">
                                                        {sectionName}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleCourseAssignAll(
                                                                courses.map(
                                                                    (c) => c.id,
                                                                ),
                                                            )
                                                        }
                                                        className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-accent-cyan transition hover:bg-cyan-50"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                        إضافة الكل
                                                    </button>
                                                </div>
                                                <div className="space-y-1.5">
                                                    {courses.map((course) => (
                                                        <CourseChip
                                                            key={course.id}
                                                            course={course}
                                                            onDragStart={(e) =>
                                                                onCourseDragStart(
                                                                    e,
                                                                    course.id,
                                                                )
                                                            }
                                                            onAction={() =>
                                                                handleCourseAssign(
                                                                    course.id,
                                                                )
                                                            }
                                                            actionLabel="+"
                                                            actionClass="text-accent-cyan hover:bg-cyan-50"
                                                            isDragging={
                                                                draggedCourseId ===
                                                                course.id
                                                            }
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ),
                                    )
                                )}
                            </div>
                        </div>

                        {/* Assigned */}
                        <div className="flex min-h-0 flex-col gap-2">
                            <p className="text-xs font-semibold tracking-wider text-text-subtle uppercase">
                                المُعيَّنة ({assignedCourses.length})
                            </p>
                            <div
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragOverCoursesPanel('assigned');
                                }}
                                onDragLeave={() =>
                                    setDragOverCoursesPanel(null)
                                }
                                onDrop={onCourseDropAssigned}
                                className={`flex min-h-[200px] flex-1 flex-col space-y-1.5 rounded-xl border-2 border-dashed p-3 transition ${
                                    dragOverCoursesPanel === 'assigned'
                                        ? 'border-primary-500 bg-primary-50/30'
                                        : 'border-border bg-surface-alt'
                                }`}
                            >
                                {assignedCourses.length === 0 ? (
                                    <div className="flex h-full min-h-[160px] items-center justify-center">
                                        <p className="text-xs text-text-subtle">
                                            اسحب مقرراً لإضافته
                                        </p>
                                    </div>
                                ) : (
                                    Array.from(assignedBySection.entries()).map(
                                        ([
                                            sectionKey,
                                            { sectionName, courses },
                                        ]) => (
                                            <div
                                                key={String(sectionKey)}
                                                className="space-y-1.5"
                                            >
                                                <p className="text-xs font-semibold text-text-muted">
                                                    {sectionName}
                                                </p>
                                                <div className="space-y-1.5">
                                                    {courses.map((course) => (
                                                        <CourseChip
                                                            key={course.id}
                                                            course={course}
                                                            onDragStart={(e) =>
                                                                onCourseDragStart(
                                                                    e,
                                                                    course.id,
                                                                )
                                                            }
                                                            onAction={() =>
                                                                handleCourseUnassign(
                                                                    course.id,
                                                                )
                                                            }
                                                            actionLabel="×"
                                                            actionClass="text-danger hover:bg-rose-50"
                                                            isDragging={
                                                                draggedCourseId ===
                                                                course.id
                                                            }
                                                            assigned
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ),
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    {form.errors.courses && (
                        <p className="px-6 pb-4 text-xs text-danger">
                            {form.errors.courses}
                        </p>
                    )}
                </section>

                {/* ── Actions ────────────────────────────────────── */}
                <div className="animate-fade-in-up stagger-5 flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-6 py-4 shadow-(--shadow-soft)">
                    <Link
                        href="/admin/majors"
                        className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-text-muted transition hover:border-text-subtle hover:text-text"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        إلغاء
                    </Link>
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600 hover:shadow-md disabled:opacity-60"
                    >
                        {form.processing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : null}
                        حفظ التغييرات
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
