import AdminCourseController from '@/actions/App/Http/Controllers/AdminCourseController';
import { AdminCourse } from '@/types/admin/major';
import { Link } from '@inertiajs/react';
import { FlaskConical, Hash, Pencil, Plus, Trash2 } from 'lucide-react';
import React from 'react';

interface CoursesRowProps {
    groupCourses: AdminCourse[];
    setDeleteTarget: (course_code: string) => void;
}
const CoursesRow = ({ groupCourses, setDeleteTarget }: CoursesRowProps) => {
    return (
        <div className="border-t border-border">
            {/* Table header */}
            <div className="hidden items-center gap-4 border-b border-border bg-surface-alt px-5 py-2.5 sm:flex">
                <span className="w-[90px] text-xs font-semibold tracking-wider text-text-subtle uppercase">
                    الرمز
                </span>
                <span className="flex-1 text-xs font-semibold tracking-wider text-text-subtle uppercase">
                    اسم المادة
                </span>
                <span className="w-[80px] text-center text-xs font-semibold tracking-wider text-text-subtle uppercase">
                    الساعات
                </span>
                <span className="w-[70px] text-center text-xs font-semibold tracking-wider text-text-subtle uppercase">
                    النوع
                </span>
                <span className="w-[72px]" />
            </div>

            <div className="divide-y divide-border">
                {groupCourses.map((course) => (
                    <div
                        key={course.id}
                        className="group flex flex-wrap items-center gap-3 px-5 py-3.5 transition hover:bg-surface-alt sm:flex-nowrap sm:gap-4"
                    >
                        {/* Code */}
                        <div className="flex w-[90px] shrink-0 items-center gap-1.5">
                            <Hash className="h-3.5 w-3.5 shrink-0 text-text-subtle" />
                            <span className="font-mono text-xs font-medium text-text-muted">
                                {course.course_code ?? '—'}
                            </span>
                        </div>

                        {/* Name */}
                        <span className="flex-1 text-sm font-medium text-text">
                            {course.name}
                        </span>

                        {/* Credit hours */}
                        <div className="flex w-[80px] justify-center">
                            <span className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-text-muted">
                                {course.credit_hours} ساعة
                            </span>
                        </div>

                        {/* Lab badge */}
                        <div className="flex w-[70px] justify-center">
                            {course.is_lab ? (
                                <span className="flex items-center gap-1 rounded-lg border border-amber-500 bg-transparent px-2.5 py-1 text-xs font-medium text-amber-500">
                                    <FlaskConical className="h-3 w-3" />
                                    مختبر
                                </span>
                            ) : (
                                <span className="rounded-lg bg-surface-alt px-2.5 py-1 text-xs text-text-subtle">
                                    نظري
                                </span>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex w-[72px] shrink-0 items-center justify-end gap-1.5 transition-opacity">
                            <Link
                                href={AdminCourseController.edit.url(
                                    course.course_code,
                                )}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent-amber hover:text-accent-amber"
                                title="تعديل"
                            >
                                <Pencil className="h-3.5 w-3.5" />
                            </Link>
                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteTarget(course.course_code)
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent-rose hover:bg-accent-rose/5 hover:text-accent-rose"
                                title="حذف"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesRow;
