import { BookOpen, Star, Trophy, X } from 'lucide-react';
import { createElement } from 'react';
import CourseCard from '@/features/courses/components/CourseCard';
import { getMajorAccentColor } from "@/shared/lib/MajorAccentColorMap";
import { getMajorIcon } from "@/shared/lib/MajorIconMap";
import type { MajorWithCourses } from "@/shared/types/index";
import CourseSection from './MajorPanel.CourseSection';

interface MajorPanelProps {
    major: MajorWithCourses;
    onClose: () => void;
}

const MajorPanel = ({ major, onClose }: MajorPanelProps) => {
    const accentColor = getMajorAccentColor(major.slug);

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-border-subtle px-6 py-5">
                <div className="flex items-center gap-3">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${accentColor} text-white shadow`}
                    >
                        {createElement(getMajorIcon(major.slug), { className: 'h-5 w-5' })}
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

            <div className="flex flex-col gap-6 p-6">
                {major.required.length > 0 && (
                    <CourseSection
                        icon={BookOpen}
                        title="مواد إجبارية التخصص"
                        count={major.required.length}
                        iconClass="text-emerald-600"
                        badgeClass="bg-emerald-100 text-emerald-700"
                    >
                        {major.required.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </CourseSection>
                )}

                {major.elective.length > 0 && (
                    <CourseSection
                        icon={Star}
                        title="مواد اختيارية التخصص"
                        count={major.elective.length}
                        iconClass="text-amber-600"
                        badgeClass="bg-amber-100 text-amber-700"
                        hasDividerAbove={major.required.length > 0}
                    >
                        {major.elective.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </CourseSection>
                )}

                {major.graduationProject.length > 0 && (
                    <CourseSection
                        icon={Trophy}
                        title="مشروع التخرج"
                        count={major.graduationProject.length}
                        iconClass="text-indigo-600"
                        badgeClass="bg-indigo-100 text-indigo-700"
                        hasDividerAbove={
                            major.required.length > 0 ||
                            major.elective.length > 0
                        }
                    >
                        {major.graduationProject.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </CourseSection>
                )}
            </div>
        </div>
    );
};

export default MajorPanel;
