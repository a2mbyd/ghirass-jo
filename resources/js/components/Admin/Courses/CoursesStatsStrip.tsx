import { BookOpen, FlaskConical, Layers } from 'lucide-react';
import React from 'react';

interface CoursesStatsStripProps {
    courses: number;
    sections: number;
    totalLabs: number;
}
const CoursesStatsStrip = ({
    courses,
    sections,
    totalLabs,
}: CoursesStatsStripProps) => {
    return (
        <div className="animate-fade-in-up stagger-1 mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-(--shadow-soft)">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                    <BookOpen className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                    <p className="text-xs text-text-muted">إجمالي المواد</p>
                    <p className="text-2xl font-bold text-text">{courses}</p>
                </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-(--shadow-soft)">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                    <Layers className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                    <p className="text-xs text-text-muted">الأقسام</p>
                    <p className="text-2xl font-bold text-text">{sections}</p>
                </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-(--shadow-soft)">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                    <FlaskConical className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                    <p className="text-xs text-text-muted">مواد مختبر</p>
                    <p className="text-2xl font-bold text-text">{totalLabs}</p>
                </div>
            </div>
        </div>
    );
};

export default CoursesStatsStrip;
