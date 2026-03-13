'use client';

import { GraphSectionLegend } from '../GraphSection.Legend';
import { StatsPanelConfig } from './StatsPanel.config';

interface GraphSectionStatsPanelProps {
    totalCourses: number;
    completedHoursCount: number;
    progress: number;
}

export function GraphSectionStatsPanel({
    totalCourses,
    completedHoursCount,
    progress,
}: GraphSectionStatsPanelProps) {
    return (
        <div
            className="min-w-[200px] rounded-[14px] border border-border bg-surface px-4 py-3 text-xs shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            dir="rtl"
            style={{ fontFamily: "'Cairo','Tajawal',sans-serif" }}
        >
            <div className="mb-2 text-[10px] font-extrabold tracking-[0.07em] text-text-muted uppercase">
                الإحصاء
            </div>
            {Object.entries(StatsPanelConfig).map(([key, value]) => (
                <div className="text-text-muted">
                    {value.icon} {value.label}:{' '}
                    <b className="text-text-primary">
                        {key === 'totalCourses'
                            ? totalCourses
                            : key === 'completedHoursCount'
                              ? completedHoursCount
                              : `${progress}%`}
                    </b>
                </div>
            ))}

            <div className="mt-4 h-[7px] overflow-hidden rounded-md bg-primary-50">
                <div
                    className="h-full rounded-[6px] bg-linear-to-r from-primary-600 to-accent-emerald transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <GraphSectionLegend />
        </div>
    );
}
