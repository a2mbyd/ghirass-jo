import { Course } from '@/types';
import { Link } from '@inertiajs/react';
import { Clock, FlaskConical, GitMerge, Link2 } from 'lucide-react';
import { TYPE_COLORS, FALLBACK_COLORS } from './Courses.config';

interface CourseCardProps {
    course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
    const colors = TYPE_COLORS[course.type] ?? FALLBACK_COLORS;
    return (
        <Link
            href={`/courses/${course.course_code}`}
            className={`flex flex-1 flex-col gap-2.5 rounded-lg border bg-surface p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${colors.border} ${colors.hover}`}
        >
            <div className="flex items-center justify-between gap-2">
                {course.course_code && (
                    <span
                        className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-extrabold tracking-wide ${colors.codeBg} ${colors.codeText}`}
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

            <p className="text-[13px] leading-snug font-bold text-text">
                {course.name}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border-subtle pt-2 text-[11px] font-semibold text-text-muted">
                <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.credit_hours} ساعات
                </span>
                {course.prerequisites?.length > 0 && (
                    <span className="flex items-center gap-1">
                        <GitMerge className="h-3 w-3" />
                        {course.prerequisites.length} متطلب
                    </span>
                )}
                {course.corequisites.length > 0 && (
                    <span className="flex items-center gap-1">
                        <Link2 className="h-3 w-3" />
                        {course.corequisites.length} مرافق
                    </span>
                )}
            </div>
        </Link>
    );
};

export default CourseCard;
