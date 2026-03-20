export const COURSE_TYPES = [
    { value: 'major_course', label: 'مادة تخصص' },
    { value: 'college_required', label: 'إجباري كلية' },
    { value: 'uni_required', label: 'إجباري جامعة' },
    { value: 'uni_elective', label: 'اختياري جامعة' },
    { value: 'remedial_course', label: 'مادة استدراكية' },
] as const;

export const COURSE_MAJOR_TYPES = [
    { value: 'required_major', label: 'متطلب تخصص' },
    { value: 'elective_major', label: 'اختياري تخصص' },
    { value: 'graduation_project', label: 'مشروع تخرج' },
] as const;

export const PYQ_TYPES = [
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

export const YEARS = [1, 2, 3, 4, 5, 6];
export const SEMESTERS = [1, 2];

export const getPYQMeta = (name: string) =>
    PYQ_TYPES.find((t) => t.value === name) ?? {
        label: name,
        color: 'bg-surface-alt text-text-muted border-border',
    };

export const RESOURCE_FORM_PALETTE = {
    emerald: {
        button: 'border-emerald-500 bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
        wrapper: 'border-emerald-200 bg-emerald-50/40',
        title: 'text-emerald-700',
    },
    rose: {
        button: 'border-rose-500 bg-rose-50 text-rose-600 hover:bg-rose-100',
        wrapper: 'border-rose-200 bg-rose-50/40',
        title: 'text-rose-700',
    },
    amber: {
        button: 'border-amber-500 bg-amber-50 text-amber-600 hover:bg-amber-100',
        wrapper: 'border-amber-200 bg-amber-50/40',
        title: 'text-amber-700',
    },
} as const;
