import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CourseEntry } from '@/types';
import { generateId } from '@/lib/utils';

const GRADE_OPTIONS = [
    { value: 4.2, label: 'A+' },
    { value: 4.0, label: 'A' },
    { value: 3.7, label: 'A-' },
    { value: 3.3, label: 'B+' },
    { value: 3.0, label: 'B' },
    { value: 2.7, label: 'B-' },
    { value: 2.3, label: 'C+' },
    { value: 2.0, label: 'C' },
    { value: 1.7, label: 'C-' },
    { value: 1.3, label: 'D+' },
    { value: 1.0, label: 'D' },
    { value: 0.7, label: 'D-' },
    { value: 0, label: 'F' },
];

export default function GPAForm() {
    const [courses, setCourses] = useState<CourseEntry[]>([
        { id: generateId(), name: '', credits: 3, grade: 4.0 },
        { id: generateId(), name: '', credits: 3, grade: 4.0 },
        { id: generateId(), name: '', credits: 3, grade: 4.0 },
    ]);

    const [previousGpa, setPreviousGpa] = useState<number>(0);
    const [previousCredits, setPreviousCredits] = useState<number>(0);

    const addCourse = () => {
        setCourses((prev) => [
            ...prev,
            { id: generateId(), name: '', credits: 3, grade: 4.0 },
        ]);
    };

    const removeCourse = (id: string) => {
        if (courses.length <= 1) return;
        setCourses((prev) => prev.filter((c) => c.id !== id));
    };

    const updateCourse = (
        id: string,
        field: keyof CourseEntry,
        value: string | number,
    ) => {
        setCourses((prev) =>
            prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
        );
    };

    const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);
    const weightedSum = courses.reduce(
        (sum, c) => sum + (c.credits || 0) * (c.grade ?? 0),
        0,
    );
    const gpa = totalCredits > 0 ? weightedSum / totalCredits : 0;

    const previousGpaValue = previousGpa ?? 0;
    const previousCreditsValue = previousCredits ?? 0;
    const cumulativeTotalCredits = totalCredits + previousCreditsValue;
    const rawCumulativeGpa =
        cumulativeTotalCredits > 0
            ? (weightedSum + previousGpaValue * previousCreditsValue) /
              cumulativeTotalCredits
            : 0;
    const cumulativeGpa = Math.min(rawCumulativeGpa, 4.2);

    return (
        <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-4">
                {courses.map((course, index) => (
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
                                    updateCourse(
                                        course.id,
                                        'name',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-lg border border-border px-3 py-2 text-text focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                            />
                        </div>
                        <div className="w-20">
                            <label
                                htmlFor={`credits-${course.id}`}
                                className="mb-1 block text-sm font-medium text-text-muted"
                            >
                                الساعات
                            </label>
                            <input
                                id={`credits-${course.id}`}
                                type="number"
                                min={1}
                                max={6}
                                value={course.credits}
                                onChange={(e) =>
                                    updateCourse(
                                        course.id,
                                        'credits',
                                        Math.min(+e.target.value, 10) || 0,
                                    )
                                }
                                className="w-full rounded-lg border border-border px-3 py-2 text-text focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
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
                                className="w-full rounded-lg border border-border px-3 py-2 text-text focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
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
                ))}
            </div>
            {totalCredits < 22 && (
                <button
                    type="button"
                    onClick={addCourse}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-3 text-sm font-medium text-text-muted transition-colors hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-600"
                >
                    <Plus className="h-4 w-4" />
                    إضافة مقرر
                </button>
            )}

            <div className="flex flex-col gap-4 md:flex-row">
                <div className="md:flex-1">
                    <div className="bg-linaer-to-br flex h-full flex-col justify-center rounded-2xl border border-border from-primary-50 to-accent-violet/10 p-6 text-center">
                        <p className="text-sm font-medium text-text-muted">
                            معدلك الفصلي
                        </p>
                        <p className="mt-2 font-display text-5xl font-bold text-primary-600">
                            {gpa.toFixed(2)}
                        </p>
                        <p className="mt-1 text-sm text-text-muted">
                            {totalCredits} ساعة معتمدة
                        </p>
                    </div>
                </div>

                <div className="md:flex-1">
                    <div className="flex h-full flex-col justify-between space-y-4 rounded-2xl border border-border bg-surface p-6">
                        <div>
                            <p className="text-sm font-medium text-text-muted">
                                حساب المعدل التراكمي
                            </p>
                            <div className="mt-4 flex flex-wrap items-end gap-4">
                                <div className="min-w-[140px] flex-1">
                                    <label
                                        htmlFor="previous-gpa"
                                        className="mb-1 block text-sm font-medium text-text-muted"
                                    >
                                        المعدل السابق
                                    </label>
                                    <input
                                        id="previous-gpa"
                                        type="number"
                                        step="0.01"
                                        min={0}
                                        max={4.2}
                                        value={previousGpa}
                                        onChange={(e) =>
                                            setPreviousGpa(
                                                (+e.target.value || 0) > 4.2
                                                    ? 4.2
                                                    : +e.target.value || 0,
                                            )
                                        }
                                        placeholder="مثال: 3.25"
                                        className="w-full rounded-lg border border-border px-3 py-2 text-text focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                                    />
                                </div>
                                <div className="w-28">
                                    <label
                                        htmlFor="previous-credits"
                                        className="mb-1 block text-sm font-medium text-text-muted"
                                    >
                                        الساعات السابقة
                                    </label>
                                    <input
                                        id="previous-credits"
                                        type="number"
                                        min={0}
                                        max={200}
                                        value={previousCredits}
                                        onChange={(e) =>
                                            setPreviousCredits(
                                                (+e.target.value || 0) > 300
                                                    ? 300
                                                    : +e.target.value || 0,
                                            )
                                        }
                                        placeholder="مثال: 90"
                                        className="w-full rounded-lg border border-border px-3 py-2 text-text focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-linaer-to-br rounded-xl from-primary-50 to-accent-violet/10 p-4 text-center">
                            <p className="text-sm leading-6 font-medium text-text-muted">
                                معدلك التراكمي (بحد أقصى 4.2)
                            </p>
                            <p className="text-sm leading-6 font-medium text-text-muted">
                                عدد الساعات (بحد أقصى 300 ساعة)
                            </p>
                            <p className="mt-2 font-display text-4xl font-bold text-primary-600">
                                {cumulativeGpa.toFixed(2)}
                            </p>
                            <p className="mt-1 text-sm text-text-muted">
                                {cumulativeTotalCredits} ساعة معتمدة
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
