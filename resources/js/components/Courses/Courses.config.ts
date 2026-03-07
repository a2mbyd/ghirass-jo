import { TypeColors } from "./Courses.types";

export const TYPE_COLORS: Record<string, TypeColors> = {
    required_university: {
        codeBg: 'bg-blue-100',
        codeText: 'text-blue-800',
        border: 'border-blue-100 hover:border-blue-200',
        hover: 'hover:bg-blue-50/40',
    },
    required_college: {
        codeBg: 'bg-violet-100',
        codeText: 'text-violet-800',
        border: 'border-violet-100 hover:border-violet-200',
        hover: 'hover:bg-violet-50/40',
    },
    required_major: {
        codeBg: 'bg-emerald-100',
        codeText: 'text-emerald-800',
        border: 'border-emerald-100 hover:border-emerald-200',
        hover: 'hover:bg-emerald-50/40',
    },
    elective_major: {
        codeBg: 'bg-amber-100',
        codeText: 'text-amber-800',
        border: 'border-amber-100 hover:border-amber-200',
        hover: 'hover:bg-amber-50/40',
    },
    elective_university: {
        codeBg: 'bg-rose-100',
        codeText: 'text-rose-800',
        border: 'border-rose-100 hover:border-rose-200',
        hover: 'hover:bg-rose-50/40',
    },
};

export const FALLBACK_COLORS = {
    codeBg: 'bg-slate-100',
    codeText: 'text-slate-700',
    border: 'border-slate-200 hover:border-slate-300',
    hover: 'hover:bg-slate-50/40',
};