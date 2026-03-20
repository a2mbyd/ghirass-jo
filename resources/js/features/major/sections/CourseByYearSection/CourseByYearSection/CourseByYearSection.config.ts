import type { YearConfig, YearColorScheme } from './CourseByYearSection.types';

/** Color schemes for year blocks — indexed by (year - 1) % length */
export const YEAR_COLOR_SCHEMES: YearColorScheme[] = [
    {
        headerBg: 'bg-violet-600',
        headerText: 'text-text',
        badgeBg: 'bg-violet-500',
        cardBorder: 'border-border hover:border-violet-200',
        cardAccent: 'hover:bg-violet-50/40',
        dot: 'bg-violet-500',
        codeBg: 'bg-violet-100',
        codeText: 'text-violet-800',
        semesterBg: 'bg-surface-alt',
        semesterText: 'text-violet-600',
        semesterBorder: 'border-border',
    },
    {
        headerBg: 'bg-sky-600',
        headerText: 'text-text',
        badgeBg: 'bg-sky-500',
        cardBorder: 'border-border hover:border-sky-200',
        cardAccent: 'hover:bg-sky-50/40',
        dot: 'bg-sky-500',
        codeBg: 'bg-sky-100',
        codeText: 'text-sky-800',
        semesterBg: 'bg-surface-alt',
        semesterText: 'text-sky-600',
        semesterBorder: 'border-border',
    },
    {
        headerBg: 'bg-emerald-600',
        headerText: 'text-text',
        badgeBg: 'bg-emerald-500',
        cardBorder: 'border-border hover:border-emerald-200',
        cardAccent: 'hover:bg-emerald-50/40',
        dot: 'bg-emerald-500',
        codeBg: 'bg-emerald-100',
        codeText: 'text-emerald-800',
        semesterBg: 'bg-surface-alt',
        semesterText: 'text-emerald-600',
        semesterBorder: 'border-border',
    },
    {
        headerBg: 'bg-orange-500',
        headerText: 'text-text',
        badgeBg: 'bg-orange-400',
        cardBorder: 'border-border hover:border-orange-200',
        cardAccent: 'hover:bg-orange-50/40',
        dot: 'bg-orange-500',
        codeBg: 'bg-orange-100',
        codeText: 'text-orange-800',
        semesterBg: 'bg-surface-alt',
        semesterText: 'text-orange-600',
        semesterBorder: 'border-border',
    },
    {
        headerBg: 'bg-amber-500',
        headerText: 'text-text',
        badgeBg: 'bg-amber-400',
        cardBorder: 'border-border hover:border-amber-200',
        cardAccent: 'hover:bg-amber-50/40',
        dot: 'bg-amber-500',
        codeBg: 'bg-amber-100',
        codeText: 'text-amber-800',
        semesterBg: 'bg-surface-alt',
        semesterText: 'text-amber-600',
        semesterBorder: 'border-border',
    },
    {
        headerBg: 'bg-rose-500',
        headerText: 'text-text',
        badgeBg: 'bg-rose-400',
        cardBorder: 'border-border hover:border-rose-200',
        cardAccent: 'hover:bg-rose-50/40',
        dot: 'bg-rose-500',
        codeBg: 'bg-rose-100',
        codeText: 'text-rose-800',
        semesterBg: 'bg-surface-alt',
        semesterText: 'text-rose-600',
        semesterBorder: 'border-border',
    },
];

const ARABIC_YEAR_LABELS: Record<number, string> = {
    1: 'السنة الأولى',
    2: 'السنة الثانية',
    3: 'السنة الثالثة',
    4: 'السنة الرابعة',
    5: 'السنة الخامسة',
    6: 'السنة السادسة',
    7: 'السنة السابعة',
    8: 'السنة الثامنة',
    9: 'السنة التاسعة',
    10: 'السنة العاشرة',
};

export function getYearLabel(year: number): string {
    return ARABIC_YEAR_LABELS[year] ?? `السنة ${year}`;
}

export function getYearConfig(year: number): YearConfig {
    const scheme =
        YEAR_COLOR_SCHEMES[(year - 1) % YEAR_COLOR_SCHEMES.length] ?? FALLBACK_SCHEME;
    return {
        ...scheme,
        label: getYearLabel(year),
    };
}

const FALLBACK_SCHEME: YearColorScheme = {
    headerBg: 'bg-slate-600',
    headerText: 'text-text',
    badgeBg: 'bg-slate-500',
    cardBorder: 'border-slate-200 hover:border-slate-300',
    cardAccent: 'hover:bg-slate-50/40',
    dot: 'bg-slate-500',
    codeBg: 'bg-slate-200',
    codeText: 'text-slate-700',
    semesterBg: 'bg-surface-alt',
    semesterText: 'text-text',
    semesterBorder: 'border-border',
};

export const FALLBACK_CONFIG: YearConfig = {
    ...FALLBACK_SCHEME,
    label: 'أخرى',
};

export const SEMESTER_LABELS: Record<number, string> = {
    1: 'الفصل الأول',
    2: 'الفصل الثاني',
};
