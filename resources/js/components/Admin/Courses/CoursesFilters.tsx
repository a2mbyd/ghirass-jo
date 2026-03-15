import { Search, X } from 'lucide-react';
import React from 'react';

interface CoursesFiltersProps {
    search: string;
    setSearch: (search: string) => void;
    filtered: number;
    courses: number;
    visibleGroupCount: number;
    visibleGroupKeys: (number | string)[];
    collapsed: Set<number | string>;
    setCollapsed: (collapsed: Set<number | string>) => void;
}
const CoursesFilters = ({
    search,
    setSearch,
    filtered,
    courses,
    visibleGroupCount,
    visibleGroupKeys,
    collapsed,
    setCollapsed,
}: CoursesFiltersProps) => {
    return (
        <div className="animate-fade-in-up stagger-2 mb-6 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="ابحث بالاسم أو رمز المادة..."
                    className="w-full rounded-xl border border-border bg-surface py-2.5 pr-9 pl-9 text-sm text-text placeholder-text-subtle shadow-(--shadow-soft) transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-text-subtle hover:text-text"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
            <span className="text-xs text-text-muted">
                {filtered} من {courses} مادة
            </span>
            {visibleGroupCount > 1 && (
                <button
                    type="button"
                    onClick={() =>
                        collapsed.size > 0
                            ? setCollapsed(new Set())
                            : setCollapsed(new Set(visibleGroupKeys))
                    }
                    className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-text-muted shadow-(--shadow-soft) transition hover:border-primary-400 hover:text-primary-500"
                >
                    {collapsed.size > 0 ? 'فتح الكل' : 'طي الكل'}
                </button>
            )}
        </div>
    );
};

export default CoursesFilters;
