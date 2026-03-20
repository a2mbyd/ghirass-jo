import { Trash2 } from 'lucide-react';
import React from 'react';
import type { CourseEntry } from "@/shared/types/index";
import IncrementalInput from '@/shared/ui/gpa/IncrementalInput';
import { GRADE_OPTIONS } from './gradeOptions';

interface CourseCardProps {
    course: CourseEntry;
    courses: CourseEntry[];
    updateCourse: (
        id: string,
        field: keyof CourseEntry,
        value: string | number,
    ) => void;
    removeCourse: (id: string) => void;
}

const CourseCard = ({
    course,
    courses,
    updateCourse,
    removeCourse,
}: CourseCardProps) => {
    return (
        <div
            key={course.id}
            className="flex flex-wrap items-end gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm"
        >
            <div className="min-w-[120px] flex-1">
                <label
                    htmlFor={`name-${course.id}`}
                    className="mb-1 block text-sm font-medium text-text-muted"
                >
                    المقرر
                </label>
                <input
                    id={`name-${course.id}`}
                    type="text"
                    placeholder="مثال: البرمجة ١"
                    value={course.name}
                    onChange={(e) =>
                        updateCourse(course.id, 'name', e.target.value)
                    }
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                />
            </div>
            <div className="w-20">
                <label
                    htmlFor={`credits-${course.id}`}
                    className="mb-1 block text-sm font-medium text-text-muted"
                >
                    الساعات
                </label>
                <IncrementalInput
                    id={`credits-${course.id}`}
                    value={course.credits}
                    onChange={(value) =>
                        updateCourse(course.id, 'credits', value)
                    }
                    min={1}
                    max={6}
                    className="gpa-number-input w-full rounded-lg border border-border bg-surface px-3 py-2 text-text focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                />
            </div>
            <div className="w-24">
                <label
                    htmlFor={`grade-${course.id}`}
                    className="mb-1 block text-sm font-medium text-text-muted"
                >
                    الدرجة
                </label>
                <select
                    id={`grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) =>
                        updateCourse(
                            course.id,
                            'grade',
                            parseFloat(e.target.value),
                        )
                    }
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-text focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                >
                    {GRADE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="button"
                onClick={() => removeCourse(course.id)}
                disabled={courses.length <= 1}
                className="rounded-lg p-2 text-text-muted transition-colors hover:bg-danger/10 hover:text-danger disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-text-muted"
                aria-label="إزالة المقرر"
            >
                <Trash2 className="h-5 w-5" />
            </button>
        </div>
    );
};

export default CourseCard;
