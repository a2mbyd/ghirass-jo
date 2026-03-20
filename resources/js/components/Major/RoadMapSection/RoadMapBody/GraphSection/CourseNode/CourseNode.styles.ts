import { cva } from 'class-variance-authority';
import type { CSSProperties } from 'react';
import { cn } from "@/shared/lib/utils";
import type { ColorScheme } from '../GraphSection.types';

/** Dimmed state colors per theme */
export const DIMMED_COLORS = {
    light: { bg: '#F8FAFC', border: '#E2E8F0' },
    dark: { bg: '#1E293B', border: '#334155' },
} as const;

/** Base Tailwind classes for each element */
export const CLASSES = {
    container: cn(
        'relative flex min-h-[90px] w-[180px] cursor-pointer flex-col items-center justify-center',
        'rounded-2xl border-[2.5px] p-3 pb-2.5 transition-all duration-150 ease-in-out',
    ),
    handle: 'absolute h-[9px] w-[9px] border-2 border-white',
    semesterBadge: cn(
        'absolute -top-3 -right-1.5 rounded-[20px] px-[7px] py-0.5',
        'font-mono text-[9px] font-extrabold tracking-wider text-white',
        'shadow-[0_2px_6px_rgba(0,0,0,0.2)]',
    ),
    labBadge: cn(
        'absolute -top-3 -left-1.5 rounded-[20px] bg-slate-600 px-[7px] py-0.5',
        'text-[9px] font-extrabold text-white',
    ),
    completedTick: 'absolute top-1.5 left-2.5 text-sm text-white',
    courseName:
        'text-center font-display text-xs leading-relaxed font-bold wrap-break-word',
    codeCreditsBase: 'mt-1.5 font-mono text-[10px] font-semibold',
} as const;

export const containerCva = cva(CLASSES.container, {
    variants: {
        dimmed: { true: 'opacity-[0.28]', false: 'opacity-100' },
        showDefaultShadow: {
            true: 'shadow-[0_2px_10px_rgba(0,0,0,0.08)]',
            false: '',
        },
    },
});

export const codeCreditsCva = cva(CLASSES.codeCreditsBase, {
    variants: {
        color: {
            completed: 'text-white/75',
            dark: 'text-slate-500',
            light: 'text-slate-400',
        },
    },
});

export interface ContainerStyleParams {
    colors: ColorScheme;
    isDark: boolean;
    dimmed: boolean;
    highlighted: boolean;
    completed: boolean;
}

export function getContainerStyle({
    colors,
    isDark,
    dimmed,
    highlighted,
    completed,
}: ContainerStyleParams): CSSProperties {
    const dimmedColors = DIMMED_COLORS[isDark ? 'dark' : 'light'];
    const normalBg = isDark
        ? `linear-gradient(135deg, ${colors.bg}22 0%, ${colors.bg}11 100%)`
        : `linear-gradient(135deg, ${colors.light} 0%, #ffffff 100%)`;

    return {
        borderColor: dimmed ? dimmedColors.border : colors.bg,
        background: completed
            ? `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg}cc 100%)`
            : dimmed
              ? dimmedColors.bg
              : normalBg,
        boxShadow: highlighted
            ? `0 0 0 4px ${colors.bg}44, 0 8px 28px ${colors.bg}33`
            : dimmed
              ? 'none'
              : undefined,
    };
}

export function getContainerClassName(
    dimmed: boolean,
    highlighted: boolean,
): string {
    return containerCva({
        dimmed,
        showDefaultShadow: !dimmed && !highlighted,
    });
}

export function getCourseNameColor(
    completed: boolean,
    isDark: boolean,
    colors: ColorScheme,
): string {
    if (completed) return 'white';
    return isDark ? colors.bg : colors.text;
}

export function getCodeCreditsClassName(
    completed: boolean,
    isDark: boolean,
): string {
    const color = completed ? 'completed' : isDark ? 'dark' : 'light';
    return codeCreditsCva({ color });
}

export function getBackgroundStyle(background: string): CSSProperties {
    return { background };
}
