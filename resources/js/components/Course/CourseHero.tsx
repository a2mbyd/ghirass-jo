import React from 'react';
import Badge from './Badge';

interface CourseHeroProps {
    course_code: string;
    is_lab: boolean;
    type: string;
    year: number;
    semester: number;
    credit_hours: number;
    name: string;
}
const CourseHero = ({
    course_code,
    is_lab,
    type,
    year,
    semester,
credit_hours,
    name,
}: CourseHeroProps) => {
    return (
        <div className="relative overflow-hidden border-b border-border bg-surface">
            <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary-500/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent-pink/5 blur-3xl" />

            <div className="relative mx-auto max-w-5xl px-6 py-10">
                {/* Code + badges */}
                <div
                    className="animate-fade-in-up mb-4 flex flex-wrap items-center gap-2"
                    style={{ animationFillMode: 'both', opacity: 0 }}
                >
                    {course_code && (
                        <span className="rounded-xl bg-linear-to-r from-primary-500 to-accent-cyan px-3 py-1.5 font-mono text-xs font-bold tracking-widest text-white shadow-sm">
                            {course_code}
                        </span>
                    )}
                    <Badge variant={is_lab ? 'lab' : 'core'}>
                        {is_lab ? '🧪 مختبر' : '📘 نظري'}
                    </Badge>
                    <Badge variant={type === 'elective' ? 'elective' : 'core'}>
                        {type === 'elective' ? 'اختياري' : 'إجباري'}
                    </Badge>
                </div>

                {/* Course name */}
                <h1
                    className="animate-fade-in-up stagger-2 mb-3 text-3xl font-extrabold text-text"
                    style={{ animationFillMode: 'both', opacity: 0 }}
                >
                    {name}
                </h1>

                {/* Meta row */}
                <div
                    className="animate-fade-in-up stagger-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted"
                    style={{ animationFillMode: 'both', opacity: 0 }}
                >
                    <span className="flex items-center gap-1.5">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500" />
                        السنة {year} · الفصل {semester}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                        {credit_hours} ساعات معتمدة
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CourseHero;
