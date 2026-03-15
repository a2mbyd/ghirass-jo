import { AdminCourse } from '@/types/admin/major';
import { ChevronDown, Layers } from 'lucide-react';
import React from 'react';
import CoursesRow from './CoursesRow';

interface CoursesCollapsibleSectionProps {
    groupKey: number | string;
    label: string;
    groupCourses: AdminCourse[];
    collapsed: Set<number | string>;
    toggleCollapse: (key: number | string) => void;
    accentClass: string;
    setDeleteTarget: (course_code: string) => void;
}

const CoursesCollapsibleSection = ({
    groupKey,
    label,
    groupCourses,
    collapsed,
    toggleCollapse,
    accentClass,
    setDeleteTarget,
}: CoursesCollapsibleSectionProps) => {
    if (groupCourses.length === 0) return null;
    const isCollapsed = collapsed.has(String(groupKey));
    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft) transition-shadow hover:shadow-md">
            {/* Gradient top bar */}
            <div
                className={`h-1 w-full bg-linear-to-r ${accentClass}`}
            />

            {/* Section accordion header */}
            <button
                type="button"
                onClick={() => toggleCollapse(String(groupKey))}
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
                <CoursesRow groupCourses={groupCourses} setDeleteTarget={setDeleteTarget} />
            )}
        </div>
    );
};

export default CoursesCollapsibleSection;
