import { Major } from '@/types/major';
import { Search, X } from 'lucide-react';
import React from 'react';

interface MajorsFiltersProps {
    search: string;
    setSearch: (search: string) => void;
    filtered: Major[];
    majors: Major[];
}
const MajorsFilters = ({
    search,
    setSearch,
    filtered,
    majors,
}: MajorsFiltersProps) => {
    return (
        <div className="animate-fade-in-up stagger-1 mb-6 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="ابحث بالاسم أو الرابط أو الوصف..."
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
                {filtered.length} من {majors.length} تخصص
            </span>
        </div>
    );
};

export default MajorsFilters;
