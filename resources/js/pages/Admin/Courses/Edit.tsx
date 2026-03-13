import AdminCourseController, {
    update,
} from '@/actions/App/Http/Controllers/AdminCourseController';
import FormSectionHeader from '@/components/ui/Admin/EditPage.FormSectionHeader';
import { AdminCourseBasic, AdminCourseWithRelations } from '@/types/admin/course';
import { Section } from '@/types/section';
import { Link, useForm } from '@inertiajs/react';
import {
    ArrowRight,
    BookMarked,
    BookOpen,
    ChevronLeft,
    ClipboardList,
    ExternalLink,
    FileText,
    FlaskConical,
    GitBranch,
    GraduationCap,
    Link2,
    Loader2,
    Minus,
    Play,
    Plus,
    Shuffle,
    Trash2,
    Video,
    X,
} from 'lucide-react';
import React, { DragEvent, useState } from 'react';

/* ── Constants ────────────────────────────────────────────────────────────── */

const COURSE_TYPES = [
    { value: 'major_course', label: 'مادة تخصص' },
    { value: 'required_college', label: 'إجباري كلية' },
    { value: 'required_university', label: 'إجباري جامعة' },
    { value: 'elective_university', label: 'اختياري جامعة' },
] as const;

const COURSE_MAJOR_TYPES = [
    { value: 'required_major', label: 'إجباري تخصص' },
    { value: 'elective_major', label: 'اختياري تخصص' },
] as const;

const PYQ_TYPES = [
    {
        value: 'final',
        label: 'النهائي',
        color: 'bg-red-50 text-red-700 border-red-200',
    },
    {
        value: 'mid',
        label: 'المنتصف',
        color: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    {
        value: 'first',
        label: 'الأول',
        color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
        value: 'second',
        label: 'الثاني',
        color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
        value: 'quizzes',
        label: 'اختبارات قصيرة',
        color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
        value: 'comprehensive',
        label: 'شامل',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
] as const;

const YEARS = [1, 2, 3, 4, 5, 6];
const SEMESTERS = [1, 2];

const getPYQMeta = (name: string) =>
    PYQ_TYPES.find((t) => t.value === name) ?? {
        label: name,
        color: 'bg-surface-alt text-text-muted border-border',
    };

/* ── Form shape ───────────────────────────────────────────────────────────── */

interface FormMajorAssignment {
    id: number;
    year: number;
    semester: number;
    course_major_type: string;
}

interface FormResource {
    title: string;
    url: string;
}

interface FormPYQ {
    name: string;
    url: string;
}

interface FormData {
    name: string;
    description: string;
    credit_hours: number;
    course_type: string;
    is_lab: boolean;
    section_id: number | null;
    prerequisites: number[];
    majors: FormMajorAssignment[];
    new_files: FormResource[];
    delete_file_ids: number[];
    new_videos: FormResource[];
    delete_video_ids: number[];
    new_past_year_questions: FormPYQ[];
    delete_pyq_ids: number[];
}

/* ── Props ────────────────────────────────────────────────────────────────── */

interface EditProps {
    course: AdminCourseWithRelations;
    sections: Section[];
    allCourses: AdminCourseBasic[];
    allMajors: { id: number; name: string; slug: string }[];
}

/* ── Dual-panel course selector ───────────────────────────────────────────── */

interface CourseSelectorProps {
    allCourses: AdminCourseBasic[];
    assignedIds: number[];
    onAssign: (id: number) => void;
    onUnassign: (id: number) => void;
    emptyAssignedLabel: string;
}

// Defined outside CourseSelector so React never re-mounts chips during a drag
interface SelectorChipProps {
    course: AdminCourseBasic;
    isAssigned: boolean;
    isDragging: boolean;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    onDragEnd: () => void;
    onAssign: (id: number) => void;
    onUnassign: (id: number) => void;
}

const SelectorChip = ({
    course,
    isAssigned,
    isDragging,
    onDragStart,
    onDragEnd,
    onAssign,
    onUnassign,
}: SelectorChipProps) => (
    <div
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={`flex cursor-grab items-center gap-2 rounded-lg border px-3 py-2 text-xs select-none active:cursor-grabbing ${
            isDragging
                ? 'opacity-40'
                : isAssigned
                  ? 'border-primary-200 bg-primary-50 text-primary-700'
                  : 'border-border bg-surface text-text hover:border-primary-300'
        }`}
    >
        <BookMarked className="h-3.5 w-3.5 shrink-0 text-accent-cyan" />
        <span className="min-w-0 flex-1 truncate font-medium">
            {course.name}
        </span>
        <code className="shrink-0 rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px] text-text-subtle">
            {course.course_code}
        </code>
        {isAssigned ? (
            <button
                type="button"
                onClick={() => onUnassign(course.id)}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded font-bold text-danger transition hover:bg-rose-50"
            >
                <X className="h-3 w-3" />
            </button>
        ) : (
            <button
                type="button"
                onClick={() => onAssign(course.id)}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded font-bold text-accent-cyan transition hover:bg-cyan-50"
            >
                <Plus className="h-3 w-3" />
            </button>
        )}
    </div>
);

const CourseSelector = ({
    allCourses,
    assignedIds,
    onAssign,
    onUnassign,
    emptyAssignedLabel,
}: CourseSelectorProps) => {
    const [search, setSearch] = useState('');
    const [draggedId, setDraggedId] = useState<number | null>(null);
    const [dragOver, setDragOver] = useState<'available' | 'assigned' | null>(
        null,
    );

    const assignedSet = new Set(assignedIds);
    const q = search.toLowerCase();

    const available = allCourses.filter(
        (c) =>
            !assignedSet.has(c.id) &&
            (c.name.toLowerCase().includes(q) ||
                c.course_code.toLowerCase().includes(q)),
    );
    const assigned = allCourses.filter(
        (c) =>
            assignedSet.has(c.id) &&
            (c.name.toLowerCase().includes(q) ||
                c.course_code.toLowerCase().includes(q)),
    );

    const onDragStart = (e: DragEvent<HTMLDivElement>, id: number) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const onDropAvailable = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedId !== null && assignedSet.has(draggedId)) {
            onUnassign(draggedId);
        }
        setDraggedId(null);
        setDragOver(null);
    };

    const onDropAssigned = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedId !== null && !assignedSet.has(draggedId)) {
            onAssign(draggedId);
        }
        setDraggedId(null);
        setDragOver(null);
    };

    return (
        <div className="space-y-3">
            {/* Search */}
            <div className="relative">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="ابحث بالاسم أو رمز المادة..."
                    className="w-full rounded-xl border border-border bg-background py-2 pr-3 pl-8 text-sm text-text placeholder-text-subtle transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => setSearch('')}
                        className="absolute top-1/2 left-2 -translate-y-1/2 text-text-subtle hover:text-text"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>

            {/* Panels */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {/* Available */}
                <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-semibold tracking-wider text-text-subtle uppercase">
                        المتاحة ({available.length})
                    </p>
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'move';
                            setDragOver('available');
                        }}
                        onDragLeave={(e) => {
                            if (
                                !e.currentTarget.contains(
                                    e.relatedTarget as Node,
                                )
                            ) {
                                setDragOver(null);
                            }
                        }}
                        onDrop={onDropAvailable}
                        className={`flex min-h-[220px] flex-col gap-1.5 overflow-y-auto rounded-xl border-2 border-dashed p-2.5 transition-colors duration-200 ${
                            dragOver === 'available'
                                ? 'border-accent-cyan bg-cyan-50/30'
                                : 'border-border bg-surface-alt'
                        }`}
                    >
                        {available.length === 0 ? (
                            <div className="flex h-full min-h-[180px] items-center justify-center">
                                <p className="text-xs text-text-subtle">
                                    {search
                                        ? 'لا توجد نتائج'
                                        : 'جميع المواد مُضافة'}
                                </p>
                            </div>
                        ) : (
                            available.map((c) => (
                                <SelectorChip
                                    key={c.id}
                                    course={c}
                                    isAssigned={false}
                                    isDragging={draggedId === c.id}
                                    onDragStart={(e) => onDragStart(e, c.id)}
                                    onDragEnd={() => setDraggedId(null)}
                                    onAssign={onAssign}
                                    onUnassign={onUnassign}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Assigned */}
                <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-semibold tracking-wider text-text-subtle uppercase">
                        المُضافة ({assigned.length})
                    </p>
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'move';
                            setDragOver('assigned');
                        }}
                        onDragLeave={(e) => {
                            if (
                                !e.currentTarget.contains(
                                    e.relatedTarget as Node,
                                )
                            ) {
                                setDragOver(null);
                            }
                        }}
                        onDrop={onDropAssigned}
                        className={`flex min-h-[220px] flex-col gap-1.5 overflow-y-auto rounded-xl border-2 border-dashed p-2.5 transition-colors duration-200 ${
                            dragOver === 'assigned'
                                ? 'border-primary-500 bg-primary-50/30'
                                : 'border-border bg-surface-alt'
                        }`}
                    >
                        {assigned.length === 0 ? (
                            <div className="flex h-full min-h-[180px] items-center justify-center">
                                <p className="text-xs text-text-subtle">
                                    {emptyAssignedLabel}
                                </p>
                            </div>
                        ) : (
                            assigned.map((c) => (
                                <SelectorChip
                                    key={c.id}
                                    course={c}
                                    isAssigned={true}
                                    isDragging={draggedId === c.id}
                                    onDragStart={(e) => onDragStart(e, c.id)}
                                    onDragEnd={() => setDraggedId(null)}
                                    onAssign={onAssign}
                                    onUnassign={onUnassign}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Main Edit Component ──────────────────────────────────────────────────── */

const Edit = ({ course, sections, allCourses, allMajors }: EditProps) => {
    /* ── Add-form visibility state ── */
    const [showNewMajorForm, setShowNewMajorForm] = useState(false);
    const [newMajorForm, setNewMajorForm] = useState({
        id: '',
        year: 1,
        semester: 1,
        course_major_type: 'required_major',
    });

    const [showNewFileForm, setShowNewFileForm] = useState(false);
    const [newFileForm, setNewFileForm] = useState<FormResource>({
        title: '',
        url: '',
    });

    const [showNewVideoForm, setShowNewVideoForm] = useState(false);
    const [newVideoForm, setNewVideoForm] = useState<FormResource>({
        title: '',
        url: '',
    });

    const [showNewPYQForm, setShowNewPYQForm] = useState(false);
    const [newPYQForm, setNewPYQForm] = useState<FormPYQ>({
        name: 'final',
        url: '',
    });

    /* ── Inertia form ── */
    const form = useForm<FormData>({
        name: course.name,
        description: course.description ?? '',
        credit_hours: course.credit_hours,
        course_type: course.course_type,
        is_lab: course.is_lab,
        section_id: course.section_id,
        prerequisites: course.prerequisites.map((p) => p.id),
        majors: course.majors.map((m) => ({
            id: m.id,
            year: m.pivot.year,
            semester: m.pivot.semester,
            course_major_type: m.pivot.type,
        })),
        new_files: [],
        delete_file_ids: [],
        new_videos: [],
        delete_video_ids: [],
        new_past_year_questions: [],
        delete_pyq_ids: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(update.url(course.course_code));
    };

    /* ── Majors ── */
    const assignedMajorIds = new Set(form.data.majors.map((m) => m.id));
    const availableMajorsToAdd = allMajors.filter(
        (m) => !assignedMajorIds.has(m.id),
    );

    const addMajorAssignment = () => {
        if (!newMajorForm.id) {
            return;
        }
        form.setData('majors', [
            ...form.data.majors,
            {
                id: Number(newMajorForm.id),
                year: newMajorForm.year,
                semester: newMajorForm.semester,
                course_major_type: newMajorForm.course_major_type,
            },
        ]);
        setNewMajorForm({
            id: '',
            year: 1,
            semester: 1,
            course_major_type: 'required_major',
        });
        setShowNewMajorForm(false);
    };

    const removeMajorAssignment = (id: number) => {
        form.setData(
            'majors',
            form.data.majors.filter((m) => m.id !== id),
        );
    };

    const updateMajorField = (
        id: number,
        field: 'year' | 'semester' | 'course_major_type',
        value: number | string,
    ) => {
        form.setData(
            'majors',
            form.data.majors.map((m) =>
                m.id === id ? { ...m, [field]: value } : m,
            ),
        );
    };

    const getMajorName = (id: number) =>
        allMajors.find((m) => m.id === id)?.name ?? '—';

    /* ── Prerequisites ── */
    const assignPrereq = (id: number) =>
        form.setData('prerequisites', [...form.data.prerequisites, id]);
    const unassignPrereq = (id: number) =>
        form.setData(
            'prerequisites',
            form.data.prerequisites.filter((pid) => pid !== id),
        );

    /* ── Files ── */
    const addFile = () => {
        if (!newFileForm.title || !newFileForm.url) {
            return;
        }
        form.setData('new_files', [...form.data.new_files, { ...newFileForm }]);
        setNewFileForm({ title: '', url: '' });
        setShowNewFileForm(false);
    };

    const removeNewFile = (index: number) => {
        form.setData(
            'new_files',
            form.data.new_files.filter((_, i) => i !== index),
        );
    };

    const isFileDeleted = (id: number) =>
        form.data.delete_file_ids.includes(id);

    const toggleFileDeletion = (id: number) => {
        if (isFileDeleted(id)) {
            form.setData(
                'delete_file_ids',
                form.data.delete_file_ids.filter((fid) => fid !== id),
            );
        } else {
            form.setData('delete_file_ids', [...form.data.delete_file_ids, id]);
        }
    };

    /* ── Videos ── */
    const addVideo = () => {
        if (!newVideoForm.title || !newVideoForm.url) {
            return;
        }
        form.setData('new_videos', [
            ...form.data.new_videos,
            { ...newVideoForm },
        ]);
        setNewVideoForm({ title: '', url: '' });
        setShowNewVideoForm(false);
    };

    const removeNewVideo = (index: number) => {
        form.setData(
            'new_videos',
            form.data.new_videos.filter((_, i) => i !== index),
        );
    };

    const isVideoDeleted = (id: number) =>
        form.data.delete_video_ids.includes(id);

    const toggleVideoDeletion = (id: number) => {
        if (isVideoDeleted(id)) {
            form.setData(
                'delete_video_ids',
                form.data.delete_video_ids.filter((vid) => vid !== id),
            );
        } else {
            form.setData('delete_video_ids', [
                ...form.data.delete_video_ids,
                id,
            ]);
        }
    };

    /* ── Past Year Questions ── */
    const addPYQ = () => {
        if (!newPYQForm.url) {
            return;
        }
        form.setData('new_past_year_questions', [
            ...form.data.new_past_year_questions,
            { ...newPYQForm },
        ]);
        setNewPYQForm({ name: 'final', url: '' });
        setShowNewPYQForm(false);
    };

    const removeNewPYQ = (index: number) => {
        form.setData(
            'new_past_year_questions',
            form.data.new_past_year_questions.filter((_, i) => i !== index),
        );
    };

    const isPYQDeleted = (id: number) => form.data.delete_pyq_ids.includes(id);

    const togglePYQDeletion = (id: number) => {
        if (isPYQDeleted(id)) {
            form.setData(
                'delete_pyq_ids',
                form.data.delete_pyq_ids.filter((pid) => pid !== id),
            );
        } else {
            form.setData('delete_pyq_ids', [...form.data.delete_pyq_ids, id]);
        }
    };

    /* ── Derived counts ── */
    const fileCount =
        course.files.length -
        form.data.delete_file_ids.length +
        form.data.new_files.length;
    const videoCount =
        course.videos.length -
        form.data.delete_video_ids.length +
        form.data.new_videos.length;
    const pyqCount =
        course.past_year_questions.length -
        form.data.delete_pyq_ids.length +
        form.data.new_past_year_questions.length;

    /* ── Shared class helpers ── */
    const inputClass =
        'w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text placeholder-text-subtle shadow-(--shadow-soft) transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20';

    const smallSelectClass =
        'w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs text-text outline-none focus:border-primary-500';

    /* ── Render ── */
    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="animate-fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-accent-violet">
                        <BookMarked className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="font-display text-2xl font-bold text-text">
                                تعديل المادة
                            </h1>
                            <span className="rounded-lg border border-border bg-surface-alt px-2 py-0.5 font-mono text-xs text-text-muted">
                                {course.course_code}
                            </span>
                            {course.is_lab && (
                                <span className="flex items-center gap-1 rounded-lg bg-cyan-50 px-2 py-0.5 text-xs font-medium text-accent-cyan">
                                    <FlaskConical className="h-3 w-3" />
                                    مختبر
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-text-muted">{course.name}</p>
                    </div>
                </div>
                <Link
                    href={AdminCourseController.index.url()}
                    className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-muted shadow-(--shadow-soft) transition hover:border-primary-500 hover:text-primary-500"
                >
                    <ArrowRight className="h-4 w-4" />
                    العودة للقائمة
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* ── Card 1: Basic Information ──────────────────────── */}
                <section className="animate-fade-in-up stagger-1 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                    <FormSectionHeader
                        title="المعلومات الأساسية"
                        icon={<BookOpen className="h-4 w-4 text-primary-500" />}
                    />
                    <div className="space-y-5 p-6">
                        {/* Name + Credit Hours */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                            <div className="space-y-1.5 md:col-span-3">
                                <label
                                    className="block text-sm font-medium text-text"
                                    htmlFor="name"
                                >
                                    اسم المادة
                                    <span className="mr-1 text-danger">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={form.data.name}
                                    onChange={(e) =>
                                        form.setData('name', e.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="مثال: تحليل الدوائر الكهربائية"
                                    required
                                />
                                {form.errors.name && (
                                    <p className="text-xs text-danger">
                                        {form.errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    className="block text-sm font-medium text-text"
                                    htmlFor="credit_hours"
                                >
                                    الساعات المعتمدة
                                </label>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            form.setData(
                                                'credit_hours',
                                                Math.max(
                                                    1,
                                                    form.data.credit_hours - 1,
                                                ),
                                            )
                                        }
                                        className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-text-muted transition hover:border-primary-500 hover:text-primary-500"
                                    >
                                        <Minus className="h-3.5 w-3.5" />
                                    </button>
                                    <input
                                        id="credit_hours"
                                        type="number"
                                        min={1}
                                        max={6}
                                        value={form.data.credit_hours}
                                        onChange={(e) =>
                                            form.setData(
                                                'credit_hours',
                                                Number(e.target.value) > 6
                                                    ? 6
                                                    : Number(e.target.value),
                                            )
                                        }
                                        className="credit-hours-input h-[42px] w-full rounded-xl border border-border bg-background text-center text-sm font-bold text-text shadow-(--shadow-soft) transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            form.setData(
                                                'credit_hours',
                                                Math.min(
                                                    6,
                                                    form.data.credit_hours + 1,
                                                ),
                                            )
                                        }
                                        className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-text-muted transition hover:border-primary-500 hover:text-primary-500"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                                {form.errors.credit_hours && (
                                    <p className="text-xs text-danger">
                                        {form.errors.credit_hours}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Section + Is Lab */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <label
                                    className="block text-sm font-medium text-text"
                                    htmlFor="section_id"
                                >
                                    القسم
                                </label>
                                <select
                                    id="section_id"
                                    value={form.data.section_id ?? ''}
                                    onChange={(e) =>
                                        form.setData(
                                            'section_id',
                                            e.target.value
                                                ? Number(e.target.value)
                                                : null,
                                        )
                                    }
                                    className={inputClass}
                                >
                                    <option value="">— بدون قسم —</option>
                                    {sections.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.section_id && (
                                    <p className="text-xs text-danger">
                                        {form.errors.section_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-text">
                                    مادة مختبر/نظرية
                                </label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        form.setData(
                                            'is_lab',
                                            !form.data.is_lab,
                                        )
                                    }
                                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-(--shadow-soft) transition ${
                                        form.data.is_lab
                                            ? 'border-accent-cyan bg-primary-500 text-white'
                                            : 'border-border bg-background text-text-muted hover:border-primary-300'
                                    }`}
                                >
                                    {/* Toggle track */}
                                    <span
                                        className={`relative flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ${
                                            form.data.is_lab
                                                ? 'bg-accent-cyan'
                                                : 'bg-border'
                                        }`}
                                    >
                                        <span
                                            className={`absolute h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                                form.data.is_lab
                                                    ? '-translate-x-[19px]'
                                                    : 'translate-x-0.5'
                                            }`}
                                        />
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        {form.data.is_lab ? (
                                            <>
                                                <FlaskConical className="h-4 w-4" />
                                                مادة مختبر
                                            </>
                                        ) : (
                                            <>
                                                <BookOpen className="h-4 w-4" />
                                                مادة نظرية
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>

                            {/* Course Type */}
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-text">
                                    نوع المادة
                                </label>
                                <select
                                    id="course_type"
                                    value={form.data.course_type}
                                    onChange={(e) =>
                                        form.setData('course_type', e.target.value)
                                    }
                                    className={inputClass}
                                >
                                    {COURSE_TYPES.map((t) => (
                                        <option key={t.value} value={t.value}>
                                            {t.label}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.course_type && (
                                    <p className="text-xs text-danger">
                                        {form.errors.course_type}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                            <label
                                className="block text-sm font-medium text-text"
                                htmlFor="description"
                            >
                                الوصف
                            </label>
                            <textarea
                                id="description"
                                value={form.data.description}
                                onChange={(e) =>
                                    form.setData('description', e.target.value)
                                }
                                rows={3}
                                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text placeholder-text-subtle shadow-(--shadow-soft) transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                placeholder="أدخل وصفاً مختصراً للمادة الدراسية..."
                            />
                            {form.errors.description && (
                                <p className="text-xs text-danger">
                                    {form.errors.description}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── Card 2: Majors ─────────────────────────────────── */}
                {!form.data.course_type.endsWith('university') && (
                    <section className="animate-fade-in-up stagger-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                        <div className="flex items-center justify-between border-b border-border px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
                                    <GraduationCap className="h-4 w-4 text-primary-500" />
                                </div>
                                <h2 className="font-semibold text-text">
                                    التخصصات المرتبطة
                                </h2>
                                <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-text-muted">
                                    {form.data.majors.length} تخصص
                                </span>
                            </div>
                            {availableMajorsToAdd.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNewMajorForm((v) => !v)
                                    }
                                    className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                                        showNewMajorForm
                                            ? 'border-border bg-surface-alt text-text-muted hover:border-danger hover:text-danger'
                                            : 'border-primary-500 bg-primary-50 text-primary-500 hover:bg-primary-100'
                                    }`}
                                >
                                    {showNewMajorForm ? (
                                        <>
                                            <X className="h-3.5 w-3.5" />
                                            إلغاء
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="h-3.5 w-3.5" />
                                            إضافة تخصص
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        <div className="space-y-4 p-6">
                            {/* Add major inline form */}
                            {showNewMajorForm && (
                                <div className="rounded-xl border border-primary-200 bg-primary-50/40 p-4">
                                    <p className="mb-3 text-sm font-semibold text-primary-700">
                                        ربط تخصص جديد
                                    </p>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                                        <select
                                            value={newMajorForm.id}
                                            onChange={(e) =>
                                                setNewMajorForm((f) => ({
                                                    ...f,
                                                    id: e.target.value,
                                                }))
                                            }
                                            className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary-500 sm:col-span-2"
                                        >
                                            <option value="">
                                                اختر التخصص...
                                            </option>
                                            {availableMajorsToAdd.map((m) => (
                                                <option key={m.id} value={m.id}>
                                                    {m.name}
                                                </option>
                                            ))}
                                        </select>
                                        {form.data.course_type === 'major_course' && (
                                            <select
                                                value={newMajorForm.course_major_type}
                                                onChange={(e) =>
                                                    setNewMajorForm((f) => ({
                                                        ...f,
                                                        course_major_type: e.target.value,
                                                    }))
                                                }
                                                className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary-500"
                                            >
                                                {COURSE_MAJOR_TYPES.map((t) => (
                                                    <option
                                                        key={t.value}
                                                        value={t.value}
                                                    >
                                                        {t.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                        <div className="flex gap-2">
                                            <select
                                                value={newMajorForm.year}
                                                onChange={(e) =>
                                                    setNewMajorForm((f) => ({
                                                        ...f,
                                                        year: Number(
                                                            e.target.value,
                                                        ),
                                                    }))
                                                }
                                                className="flex-1 rounded-xl border border-border bg-background px-2 py-2 text-sm text-text outline-none focus:border-primary-500"
                                            >
                                                {YEARS.map((y) => (
                                                    <option key={y} value={y}>
                                                        سنة {y}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                value={newMajorForm.semester}
                                                onChange={(e) =>
                                                    setNewMajorForm((f) => ({
                                                        ...f,
                                                        semester: Number(
                                                            e.target.value,
                                                        ),
                                                    }))
                                                }
                                                className="flex-1 rounded-xl border border-border bg-background px-2 py-2 text-sm text-text outline-none focus:border-primary-500"
                                            >
                                                {SEMESTERS.map((s) => (
                                                    <option key={s} value={s}>
                                                        فصل {s}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={addMajorAssignment}
                                            disabled={!newMajorForm.id}
                                            className="flex items-center gap-1.5 rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600 disabled:opacity-50"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            إضافة
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Majors table */}
                            {form.data.majors.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt py-12">
                                    <GraduationCap className="h-9 w-9 text-text-subtle" />
                                    <p className="mt-2 text-sm text-text-subtle">
                                        لا توجد تخصصات مرتبطة بهذه المادة بعد
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-hidden rounded-xl border border-border">
                                    <div className="hidden grid-cols-12 items-center gap-2 border-b border-border bg-surface-alt px-4 py-2.5 text-xs font-semibold tracking-wider text-text-subtle uppercase sm:grid">
                                        <span className="col-span-3">
                                            التخصص
                                        </span>
                                        <span className="col-span-4">
                                            نوع المادة
                                        </span>
                                        <span className="col-span-2 text-center">
                                            السنة
                                        </span>
                                        <span className="col-span-2 text-center">
                                            الفصل
                                        </span>
                                        <span className="col-span-1" />
                                    </div>
                                    <div className="divide-y divide-border">
                                        {form.data.majors.map((assignment) => (
                                            <div
                                                key={assignment.id}
                                                className="grid grid-cols-1 items-center gap-3 px-4 py-3 transition hover:bg-surface-alt sm:grid-cols-12 sm:gap-2"
                                            >
                                                <div className="flex items-center gap-2 sm:col-span-3">
                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                                                        <GraduationCap className="h-3.5 w-3.5 text-primary-500" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-text">
                                                        {getMajorName(
                                                            assignment.id,
                                                        )}
                                                    </span>
                                                </div>

                                                {form.data.course_type ===
                                                    'major_course' && (
                                                    <div className="sm:col-span-4">
                                                        <select
                                                            value={
                                                                assignment.course_major_type
                                                            }
                                                            onChange={(e) =>
                                                                updateMajorField(
                                                                    assignment.id,
                                                                    'course_major_type',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className={
                                                                smallSelectClass
                                                            }
                                                        >
                                                            {COURSE_MAJOR_TYPES.map(
                                                                (t) => (
                                                                    <option
                                                                        key={
                                                                            t.value
                                                                        }
                                                                        value={
                                                                            t.value
                                                                        }
                                                                    >
                                                                        {
                                                                            t.label
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    </div>
                                                )}

                                                <div className="sm:col-span-2">
                                                    <select
                                                        value={assignment.year}
                                                        onChange={(e) =>
                                                            updateMajorField(
                                                                assignment.id,
                                                                'year',
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                        className={
                                                            smallSelectClass
                                                        }
                                                    >
                                                        {YEARS.map((y) => (
                                                            <option
                                                                key={y}
                                                                value={y}
                                                            >
                                                                سنة {y}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <select
                                                        value={
                                                            assignment.semester
                                                        }
                                                        onChange={(e) =>
                                                            updateMajorField(
                                                                assignment.id,
                                                                'semester',
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                        className={
                                                            smallSelectClass
                                                        }
                                                    >
                                                        {SEMESTERS.map((s) => (
                                                            <option
                                                                key={s}
                                                                value={s}
                                                            >
                                                                فصل {s}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="flex sm:col-span-1 sm:justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeMajorAssignment(
                                                                assignment.id,
                                                            )
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-text-muted transition hover:border-danger hover:text-danger"
                                                        title="إزالة التخصص"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {form.errors.majors && (
                                <p className="text-xs text-danger">
                                    {form.errors.majors}
                                </p>
                            )}
                        </div>
                    </section>
                )}

                {/* ── Card 3: Prerequisites ──────────────────────────── */}
                {!form.data.course_type.endsWith('university') && (
                    <section className="animate-fade-in-up stagger-3 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                        <div className="flex items-center justify-between border-b border-border px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
                                    <GitBranch className="h-4 w-4 text-accent-amber" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-text">
                                        المتطلبات السابقة
                                    </h2>
                                    <p className="text-xs text-text-muted">
                                        مواد يجب إتمامها قبل هذه المادة
                                    </p>
                                </div>
                            </div>
                            <span className="rounded-full bg-amber-50 px-3 py-0.5 text-xs font-semibold text-accent-amber">
                                {form.data.prerequisites.length} مادة
                            </span>
                        </div>
                        <div className="p-6">
                            <CourseSelector
                                allCourses={allCourses}
                                assignedIds={form.data.prerequisites}
                                onAssign={assignPrereq}
                                onUnassign={unassignPrereq}
                                emptyAssignedLabel="اسحب مادة لإضافتها كمتطلب سابق"
                            />
                            {form.errors.prerequisites && (
                                <p className="mt-2 text-xs text-danger">
                                    {form.errors.prerequisites}
                                </p>
                            )}
                        </div>
                    </section>
                )}

                {/* ── Card 5: Files ──────────────────────────────────── */}
                <section className="animate-fade-in-up stagger-5 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                    <div className="flex items-center justify-between border-b border-border px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                                <FileText className="h-4 w-4 text-emerald-600" />
                            </div>
                            <h2 className="font-semibold text-text">
                                الملفات والروابط
                            </h2>
                            <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-text-muted">
                                {fileCount} ملف
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowNewFileForm((v) => !v)}
                            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                                showNewFileForm
                                    ? 'border-border bg-surface-alt text-text-muted hover:border-danger hover:text-danger'
                                    : 'border-emerald-500 bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                            }`}
                        >
                            {showNewFileForm ? (
                                <>
                                    <X className="h-3.5 w-3.5" />
                                    إلغاء
                                </>
                            ) : (
                                <>
                                    <Plus className="h-3.5 w-3.5" />
                                    إضافة ملف
                                </>
                            )}
                        </button>
                    </div>

                    <div className="space-y-4 p-6">
                        {showNewFileForm && (
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
                                <p className="mb-3 text-sm font-semibold text-emerald-700">
                                    إضافة ملف جديد
                                </p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-text">
                                            العنوان{' '}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={newFileForm.title}
                                            onChange={(e) =>
                                                setNewFileForm((f) => ({
                                                    ...f,
                                                    title: e.target.value,
                                                }))
                                            }
                                            placeholder="مثال: ملزمة المادة"
                                            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-text transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-text">
                                            رابط الملف{' '}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <Link2 className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-text-subtle" />
                                                <input
                                                    type="text"
                                                    value={newFileForm.url}
                                                    onChange={(e) =>
                                                        setNewFileForm((f) => ({
                                                            ...f,
                                                            url: e.target.value,
                                                        }))
                                                    }
                                                    placeholder="https://..."
                                                    dir="ltr"
                                                    className="w-full rounded-xl border border-border bg-background px-3 py-2 pr-8 text-sm text-text transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={addFile}
                                                disabled={
                                                    !newFileForm.title ||
                                                    !newFileForm.url
                                                }
                                                className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                إضافة
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {course.files.length === 0 &&
                        form.data.new_files.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt py-12">
                                <FileText className="h-9 w-9 text-text-subtle" />
                                <p className="mt-2 text-sm text-text-subtle">
                                    لا توجد ملفات مرفوعة بعد
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-xl border border-border">
                                <div className="divide-y divide-border">
                                    {course.files.map((file) => (
                                        <ResourceRow
                                            key={file.id}
                                            title={file.title}
                                            url={file.url}
                                            isDeleted={isFileDeleted(file.id)}
                                            onToggleDelete={() =>
                                                toggleFileDeletion(file.id)
                                            }
                                            icon={
                                                <FileText className="h-4 w-4 text-emerald-600" />
                                            }
                                            iconBg="bg-emerald-50"
                                        />
                                    ))}
                                    {form.data.new_files.map((file, idx) => (
                                        <PendingResourceRow
                                            key={`nf-${idx}`}
                                            title={file.title}
                                            url={file.url}
                                            onRemove={() => removeNewFile(idx)}
                                            color="emerald"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* ── Card 6: Videos ─────────────────────────────────── */}
                <section className="animate-fade-in-up stagger-5 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                    <div className="flex items-center justify-between border-b border-border px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50">
                                <Video className="h-4 w-4 text-rose-600" />
                            </div>
                            <h2 className="font-semibold text-text">
                                مقاطع الفيديو
                            </h2>
                            <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-text-muted">
                                {videoCount} فيديو
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowNewVideoForm((v) => !v)}
                            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                                showNewVideoForm
                                    ? 'border-border bg-surface-alt text-text-muted hover:border-danger hover:text-danger'
                                    : 'border-rose-500 bg-rose-50 text-rose-600 hover:bg-rose-100'
                            }`}
                        >
                            {showNewVideoForm ? (
                                <>
                                    <X className="h-3.5 w-3.5" />
                                    إلغاء
                                </>
                            ) : (
                                <>
                                    <Plus className="h-3.5 w-3.5" />
                                    إضافة فيديو
                                </>
                            )}
                        </button>
                    </div>

                    <div className="space-y-4 p-6">
                        {showNewVideoForm && (
                            <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
                                <p className="mb-3 text-sm font-semibold text-rose-700">
                                    إضافة فيديو جديد
                                </p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-text">
                                            العنوان{' '}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={newVideoForm.title}
                                            onChange={(e) =>
                                                setNewVideoForm((f) => ({
                                                    ...f,
                                                    title: e.target.value,
                                                }))
                                            }
                                            placeholder="مثال: شرح المحاضرة الأولى"
                                            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-text transition outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-text">
                                            رابط الفيديو{' '}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <Play className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-text-subtle" />
                                                <input
                                                    type="text"
                                                    value={newVideoForm.url}
                                                    onChange={(e) =>
                                                        setNewVideoForm(
                                                            (f) => ({
                                                                ...f,
                                                                url: e.target
                                                                    .value,
                                                            }),
                                                        )
                                                    }
                                                    placeholder="https://youtube.com/..."
                                                    dir="ltr"
                                                    className="w-full rounded-xl border border-border bg-background px-3 py-2 pr-8 text-sm text-text transition outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={addVideo}
                                                disabled={
                                                    !newVideoForm.title ||
                                                    !newVideoForm.url
                                                }
                                                className="flex items-center gap-1.5 rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                إضافة
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {course.videos.length === 0 &&
                        form.data.new_videos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt py-12">
                                <Video className="h-9 w-9 text-text-subtle" />
                                <p className="mt-2 text-sm text-text-subtle">
                                    لا توجد مقاطع فيديو مضافة بعد
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-xl border border-border">
                                <div className="divide-y divide-border">
                                    {course.videos.map((video) => (
                                        <ResourceRow
                                            key={video.id}
                                            title={video.title}
                                            url={video.url}
                                            isDeleted={isVideoDeleted(video.id)}
                                            onToggleDelete={() =>
                                                toggleVideoDeletion(video.id)
                                            }
                                            icon={
                                                <Play className="h-4 w-4 text-rose-600" />
                                            }
                                            iconBg="bg-rose-50"
                                        />
                                    ))}
                                    {form.data.new_videos.map((video, idx) => (
                                        <PendingResourceRow
                                            key={`nv-${idx}`}
                                            title={video.title}
                                            url={video.url}
                                            onRemove={() => removeNewVideo(idx)}
                                            color="rose"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* ── Card 7: Past Year Questions ─────────────────────── */}
                <section className="animate-fade-in-up stagger-5 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                    <div className="flex items-center justify-between border-b border-border px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
                                <ClipboardList className="h-4 w-4 text-accent-amber" />
                            </div>
                            <h2 className="font-semibold text-text">
                                أسئلة السنوات السابقة
                            </h2>
                            <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-text-muted">
                                {pyqCount} ملف
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowNewPYQForm((v) => !v)}
                            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                                showNewPYQForm
                                    ? 'border-border bg-surface-alt text-text-muted hover:border-danger hover:text-danger'
                                    : 'border-amber-500 bg-amber-50 text-amber-600 hover:bg-amber-100'
                            }`}
                        >
                            {showNewPYQForm ? (
                                <>
                                    <X className="h-3.5 w-3.5" />
                                    إلغاء
                                </>
                            ) : (
                                <>
                                    <Plus className="h-3.5 w-3.5" />
                                    إضافة أسئلة
                                </>
                            )}
                        </button>
                    </div>

                    <div className="space-y-4 p-6">
                        {showNewPYQForm && (
                            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
                                <p className="mb-3 text-sm font-semibold text-amber-700">
                                    إضافة أسئلة جديدة
                                </p>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-text">
                                            النوع{' '}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            value={newPYQForm.name}
                                            onChange={(e) =>
                                                setNewPYQForm((f) => ({
                                                    ...f,
                                                    name: e.target.value,
                                                }))
                                            }
                                            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-amber-500"
                                        >
                                            {PYQ_TYPES.map((t) => (
                                                <option
                                                    key={t.value}
                                                    value={t.value}
                                                >
                                                    {t.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5 sm:col-span-2">
                                        <label className="text-xs font-medium text-text">
                                            الرابط{' '}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <Link2 className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-text-subtle" />
                                                <input
                                                    type="text"
                                                    value={newPYQForm.url}
                                                    onChange={(e) =>
                                                        setNewPYQForm((f) => ({
                                                            ...f,
                                                            url: e.target.value,
                                                        }))
                                                    }
                                                    placeholder="https://..."
                                                    dir="ltr"
                                                    className="w-full rounded-xl border border-border bg-background px-3 py-2 pr-8 text-sm text-text transition outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={addPYQ}
                                                disabled={!newPYQForm.url}
                                                className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                إضافة
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Preview badge */}
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-xs text-text-muted">
                                        معاينة النوع:
                                    </span>
                                    <span
                                        className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold ${getPYQMeta(newPYQForm.name).color}`}
                                    >
                                        {getPYQMeta(newPYQForm.name).label}
                                    </span>
                                </div>
                            </div>
                        )}

                        {course.past_year_questions.length === 0 &&
                        form.data.new_past_year_questions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt py-12">
                                <ClipboardList className="h-9 w-9 text-text-subtle" />
                                <p className="mt-2 text-sm text-text-subtle">
                                    لا توجد أسئلة سنوات سابقة مضافة بعد
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-xl border border-border">
                                <div className="divide-y divide-border">
                                    {course.past_year_questions.map((pyq) => (
                                        <div
                                            key={pyq.id}
                                            className={`flex items-center gap-3 px-4 py-3 transition ${
                                                isPYQDeleted(pyq.id)
                                                    ? 'bg-rose-50/20 opacity-60'
                                                    : 'hover:bg-surface-alt'
                                            }`}
                                        >
                                            <span
                                                className={`inline-flex shrink-0 items-center rounded-lg border px-2.5 py-1 text-xs font-semibold ${getPYQMeta(pyq.name).color} ${isPYQDeleted(pyq.id) ? 'line-through' : ''}`}
                                            >
                                                {getPYQMeta(pyq.name).label}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <a
                                                    href={pyq.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-xs text-text-muted hover:text-primary-500"
                                                    dir="ltr"
                                                >
                                                    <ExternalLink className="h-3 w-3 shrink-0" />
                                                    <span className="truncate">
                                                        {pyq.url}
                                                    </span>
                                                </a>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    togglePYQDeletion(pyq.id)
                                                }
                                                className={`flex shrink-0 items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs transition ${
                                                    isPYQDeleted(pyq.id)
                                                        ? 'border-emerald-300 text-emerald-600 hover:bg-emerald-50'
                                                        : 'border-border text-text-muted hover:border-danger hover:text-danger'
                                                }`}
                                            >
                                                {isPYQDeleted(pyq.id) ? (
                                                    <>
                                                        <Plus className="h-3 w-3" />
                                                        استعادة
                                                    </>
                                                ) : (
                                                    <>
                                                        <Trash2 className="h-3 w-3" />
                                                        حذف
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    ))}

                                    {form.data.new_past_year_questions.map(
                                        (pyq, idx) => (
                                            <div
                                                key={`npyq-${idx}`}
                                                className="flex items-center gap-3 bg-amber-50/30 px-4 py-3"
                                            >
                                                <span
                                                    className={`inline-flex shrink-0 items-center rounded-lg border px-2.5 py-1 text-xs font-semibold ${getPYQMeta(pyq.name).color}`}
                                                >
                                                    {getPYQMeta(pyq.name).label}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p
                                                        className="truncate text-xs text-amber-600"
                                                        dir="ltr"
                                                    >
                                                        {pyq.url}
                                                    </p>
                                                    <span className="text-[10px] text-amber-500">
                                                        (جديد — لم يُحفظ بعد)
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeNewPYQ(idx)
                                                    }
                                                    className="flex shrink-0 items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs text-text-muted transition hover:border-danger hover:text-danger"
                                                >
                                                    <X className="h-3 w-3" />
                                                    إلغاء
                                                </button>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* ── Actions bar ────────────────────────────────────── */}
                <div className="animate-fade-in-up flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-6 py-4 shadow-(--shadow-soft)">
                    <Link
                        href={AdminCourseController.index.url()}
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
                        {form.processing && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        حفظ التغييرات
                    </button>
                </div>
            </form>
        </div>
    );
};

/* ── Shared row sub-components ────────────────────────────────────────────── */
const ResourceRow = ({
    title,
    url,
    isDeleted,
    onToggleDelete,
    icon,
    iconBg,
}: {
    title: string;
    url: string;
    isDeleted: boolean;
    onToggleDelete: () => void;
    icon: React.ReactNode;
    iconBg: string;
}) => (
    <div
        className={`flex items-center gap-3 px-4 py-3 transition ${
            isDeleted ? 'bg-rose-50/20 opacity-60' : 'hover:bg-surface-alt'
        }`}
    >
        <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
        >
            {icon}
        </div>
        <div className="min-w-0 flex-1">
            <p
                className={`text-sm font-medium text-text ${isDeleted ? 'line-through' : ''}`}
            >
                {title}
            </p>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-text-muted hover:text-primary-500"
                dir="ltr"
            >
                <ExternalLink className="h-3 w-3 shrink-0" />
                <span className="truncate">{url}</span>
            </a>
        </div>
        <button
            type="button"
            onClick={onToggleDelete}
            className={`flex shrink-0 items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs transition ${
                isDeleted
                    ? 'border-emerald-300 text-emerald-600 hover:bg-emerald-50'
                    : 'border-border text-text-muted hover:border-danger hover:text-danger'
            }`}
        >
            {isDeleted ? (
                <>
                    <Plus className="h-3 w-3" />
                    استعادة
                </>
            ) : (
                <>
                    <Trash2 className="h-3 w-3" />
                    حذف
                </>
            )}
        </button>
    </div>
);

const PendingResourceRow = ({
    title,
    url,
    onRemove,
    color,
}: {
    title: string;
    url: string;
    onRemove: () => void;
    color: 'emerald' | 'rose';
}) => {
    const textColor =
        color === 'emerald' ? 'text-emerald-700' : 'text-rose-700';
    const urlColor =
        color === 'emerald' ? 'text-emerald-500/80' : 'text-rose-500/80';
    const bg = color === 'emerald' ? 'bg-emerald-50/40' : 'bg-rose-50/40';

    return (
        <div className={`flex items-center gap-3 px-4 py-3 ${bg}`}>
            <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color === 'emerald' ? 'bg-emerald-100' : 'bg-rose-100'}`}
            >
                <Plus
                    className={`h-4 w-4 ${color === 'emerald' ? 'text-emerald-600' : 'text-rose-600'}`}
                />
            </div>
            <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${textColor}`}>
                    {title}{' '}
                    <span className={`text-xs font-normal ${urlColor}`}>
                        (جديد — لم يُحفظ بعد)
                    </span>
                </p>
                <p className={`truncate text-xs ${urlColor}`} dir="ltr">
                    {url}
                </p>
            </div>
            <button
                type="button"
                onClick={onRemove}
                className="flex shrink-0 items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs text-text-muted transition hover:border-danger hover:text-danger"
            >
                <X className="h-3 w-3" />
                إلغاء
            </button>
        </div>
    );
};

export default Edit;
