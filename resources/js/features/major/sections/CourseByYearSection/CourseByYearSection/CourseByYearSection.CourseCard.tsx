import { Course } from '@/types/course';
import { Clock, FlaskConical, GitMerge } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { YearConfig } from './CourseByYearSection.types';

interface CourseCardProps {
    course: Course;
    config: YearConfig;
}
const CourseCard = ({ course, config }: CourseCardProps) => {
    return (
        <Link
            href={`/courses/${course.course_code}`}
            className={`group flex flex-col gap-2.5 rounded-lg border bg-surface p-3.5 transition-all duration-200 hover:translate-y-[-4px] ${config.cardBorder} ${config.cardAccent}`}
        >
            {/* Top row: code + lab badge */}
            <div className="flex items-center justify-between gap-2">
                {course.course_code && (
                    <span
                        className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-extrabold tracking-wide ${config.codeBg} ${config.codeText}`}
                    >
                        {course.course_code}
                    </span>
                )}
                {course.is_lab && (
                    <span className="flex items-center gap-0.5 rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                        <FlaskConical className="h-3 w-3" />
                        مختبر
                    </span>
                )}
            </div>

            {/* Course name */}
            <p className="text-[13.5px] leading-snug font-bold text-text">
                {course.name}
            </p>

            {/* Footer: credit hours + prereqs */}
            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-2 text-[11px] font-semibold text-text-muted">
                <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-text-muted" />
                    {course.credit_hours} ساعات
                </span>
                {course.prerequisites.length > 0 && (
                    <span className="flex items-center gap-1">
                        <GitMerge className="h-3 w-3 text-text-muted" />
                        {course.prerequisites.length} متطلب
                    </span>
                )}
            </div>
        </Link>
    );
};

export default CourseCard;
