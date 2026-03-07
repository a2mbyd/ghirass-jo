'use client';

import type { Section } from './GraphSection.types';
import type { ColorScheme } from './GraphSection.types';
import { PALETTE } from './GraphSection.colors';

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
                const c = colorMap[s.id] ?? PALETTE[0];
                const active = filterSec === s.id;
                return (
                    <div
                        key={s.id}
                        onClick={() => onFilterChange(active ? null : s.id)}
                        className="mb-[3px] flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-all duration-120"
                        style={{
                            background: active ? c.light : 'transparent',
                            border: active
                                ? `1px solid ${c.bg}55`
                                : '1px solid transparent',
                        }}
                    >
                        <span
                            className="size-[11px] shrink-0 rounded-full"
                            style={{ background: c.bg }}
                        />
                        <span
                            className={` ${active ? 'font-bold text-primary-500' : 'font-normal text-text'}`}
                        >
                            {s.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
