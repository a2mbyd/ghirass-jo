import type { Section , ColorScheme } from '../GraphSection.types';

import SectionOptionCard from './SectionOptionCard';

interface GraphSectionFilterPanelProps {
    sections: Section[];
    colorMap: Record<number, ColorScheme>;
    filterSec: number | null;
    onFilterChange: (sectionId: number | null) => void;
}
export function GraphSectionFilterPanel({
    sections,
    colorMap,
    filterSec,
    onFilterChange,
}: GraphSectionFilterPanelProps) {
    return (
        <div
            className="max-h-[70vh] min-w-[200px] overflow-y-auto rounded-[14px] border border-border bg-surface px-4 py-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            dir="rtl"
            style={{ fontFamily: "'Cairo','Tajawal',sans-serif" }}
        >
            <div className="mb-2 text-[10px] font-extrabold tracking-[0.07em] text-text-muted uppercase">
                تصفية حسب القسم
            </div>

            <div
                onClick={() => onFilterChange(null)}
                className={`mb-1 cursor-pointer rounded-lg px-2.5 py-1.5 text-xs transition-all duration-120 ${
                    filterSec === null
                        ? 'border border-primary-200 bg-primary-50 font-bold text-primary-600'
                        : 'border border-transparent font-normal text-text-muted'
                }`}
            >
                الكل
            </div>

            {sections.map((s) => {
                return (
                    <SectionOptionCard
                        key={s.id}
                        section={s}
                        colorMap={colorMap}
                        filterSec={filterSec}
                        onFilterChange={onFilterChange}
                    />
                );
            })}
        </div>
    );
}
