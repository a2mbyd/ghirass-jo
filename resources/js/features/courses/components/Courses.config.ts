import type { TypeColors } from '../types/courses.types';

export const TYPE_COLORS: Record<string, TypeColors> = {
    // inherent course types (global courses)
    uni_required: {
        codeBg: 'bg-blue-100',
        codeText: 'text-blue-800',
        border: 'border-blue-100 hover:border-blue-200',
        hover: 'hover:bg-blue-50/40',
        accentBg: 'bg-blue-50',
        accentText: 'text-blue-600',
        accentBorder: 'border-blue-400',
        badgeBg: 'bg-blue-100',
        badgeText: 'text-blue-700',
    },
    uni_elective: {
        codeBg: 'bg-rose-100',
        codeText: 'text-rose-800',
        border: 'border-rose-100 hover:border-rose-200',
        hover: 'hover:bg-rose-50/40',
        accentBg: 'bg-rose-50',
        accentText: 'text-rose-600',
        accentBorder: 'border-rose-400',
        badgeBg: 'bg-rose-100',
        badgeText: 'text-rose-700',
    },
    college_required: {
        codeBg: 'bg-violet-100',
        codeText: 'text-violet-800',
        border: 'border-violet-100 hover:border-violet-200',
        hover: 'hover:bg-violet-50/40',
        accentBg: 'bg-violet-50',
        accentText: 'text-violet-600',
        accentBorder: 'border-violet-400',
        badgeBg: 'bg-violet-100',
        badgeText: 'text-violet-700',
    },

    required_major: {
        codeBg: 'bg-emerald-100',
        codeText: 'text-emerald-800',
        border: 'border-emerald-100 hover:border-emerald-200',
        accentBorder: 'border-emerald-400',
        hover: 'hover:bg-emerald-50/40',
    },
    elective_major: {
        codeBg: 'bg-amber-100',
        codeText: 'text-amber-800',
        border: 'border-amber-100 hover:border-amber-200',
        accentBorder: 'border-amber-400',
        hover: 'hover:bg-amber-50/40',
    },
    graduation_project: {
        codeBg: 'bg-indigo-100',
        codeText: 'text-indigo-800',
        border: 'border-indigo-100 hover:border-indigo-200',
        accentBorder: 'border-indigo-400',
        hover: 'hover:bg-indigo-50/40',
    },
};

export const FALLBACK_COLORS: TypeColors = {
    codeBg: 'bg-slate-100',
    codeText: 'text-slate-700',
    border: 'border-slate-200 hover:border-slate-300',
    hover: 'hover:bg-slate-50/40',
    accentBg: 'bg-slate-50',
    accentText: 'text-slate-600',
    accentBorder: 'border-slate-300',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-700',
};

/** Section accent fallback when type has no section-specific colors */
export const SECTION_FALLBACK = {
    accentBg: 'bg-slate-50',
    accentText: 'text-slate-600',
    accentBorder: 'border-slate-200',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-700',
};
