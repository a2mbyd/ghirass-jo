import { MAJOR_ACCENT_COLOR_MAP } from '@/lib/MajorAccentColorMap';
import { MAJOR_ICON_MAP } from '@/lib/MajorIconMap';
import { BookOpen, GraduationCap, Star, X } from 'lucide-react';
import CourseCard from './CourseCard';
import type { MajorWithCourses } from '@/types';

interface MajorPanelProps {
    major: MajorWithCourses;
    onClose: () => void;
}

const MajorPanel = ({ major, onClose }: MajorPanelProps) => {
    const Icon = MAJOR_ICON_MAP[major.slug] ?? GraduationCap;
    const accentColor =
        MAJOR_ACCENT_COLOR_MAP[major.slug] ?? 'from-primary-500 to-violet-500';

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-border-subtle px-6 py-5">
                <div className="flex items-center gap-3">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${accentColor} text-white shadow`}
                    >
                        <Icon className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-[15px] font-extrabold text-text">
                            {major.name}
                        </h3>
                        {major.description && (
                            <p className="text-[12px] text-text-muted">
                                {major.description}
                            </p>
                        )}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg p-2 text-text-subtle transition-colors hover:bg-surface-alt hover:text-text-muted"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <div className="flex flex-col gap-7 p-6">
                {major.required.length > 0 && (
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-emerald-600" />
                            <h4 className="text-[13px] font-bold text-text-muted">
                                مواد إجبارية التخصص
                            </h4>
                            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                                {major.required.length} مادة
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {major.required.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </div>
                )}

                {major.elective.length > 0 && (
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <Star className="h-4 w-4 text-amber-600" />
                            <h4 className="text-[13px] font-bold text-text-muted">
                                مواد اختيارية التخصص
                            </h4>
                            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                                {major.elective.length} مادة
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {major.elective.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MajorPanel;
