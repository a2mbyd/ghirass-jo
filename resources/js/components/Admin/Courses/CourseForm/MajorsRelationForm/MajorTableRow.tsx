import { GraduationCap, Trash2 } from 'lucide-react';
import SelectInput from "@/shared/ui/admin/inputs/SelectInput";
import { COURSE_MAJOR_TYPES, YEARS, SEMESTERS } from '../CourseForm.constants';
import type { FormMajorAssignment } from '../CourseForm.types';

interface MajorTableRowProps {
    assignment: FormMajorAssignment;
    courseType: string;
    getMajorName: (id: number) => string;
    onUpdate: (
        id: number,
        field: 'year' | 'semester' | 'course_major_type',
        value: number | string,
    ) => void;
    onRemove: (id: number) => void;
}

export function MajorTableRow({
    assignment,
    courseType,
    getMajorName,
    onUpdate,
    onRemove,
}: MajorTableRowProps) {
    return (
        <div className="grid grid-cols-1 items-center gap-3 overflow-visible px-4 py-3 transition hover:bg-surface-alt sm:grid-cols-12 sm:gap-2">
            <div className="flex items-center gap-2 sm:col-span-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                    <GraduationCap className="h-3.5 w-3.5 text-primary-500" />
                </div>
                <span className="text-sm font-semibold text-text">
                    {getMajorName(assignment.id)}
                </span>
            </div>

            {courseType === 'major_course' && (
                <div className="min-w-0 sm:col-span-4">
                    <SelectInput
                        label="نوع المادة"
                        value={assignment.course_major_type}
                        onChange={(v) =>
                            onUpdate(assignment.id, 'course_major_type', v)
                        }
                        options={COURSE_MAJOR_TYPES.map(
                            (t: { value: string; label: string }) => ({
                                value: t.value,
                                label: t.label,
                            }),
                        )}
                    />
                </div>
            )}

            <div className="min-w-0 sm:col-span-2">
                <SelectInput
                    label="السنة"
                    value={String(assignment.year)}
                    onChange={(v) => onUpdate(assignment.id, 'year', Number(v))}
                    options={YEARS.map((y: number) => ({
                        value: String(y),
                        label: `سنة ${y}`,
                    }))}
                />
            </div>

            <div className="min-w-0 sm:col-span-2">
                <SelectInput
                    label="الفصل"
                    value={String(assignment.semester)}
                    onChange={(v) =>
                        onUpdate(assignment.id, 'semester', Number(v))
                    }
                    options={SEMESTERS.map((s: number) => ({
                        value: String(s),
                        label: `فصل ${s}`,
                    }))}
                />
            </div>

            <div className="flex sm:col-span-1 sm:justify-center">
                <button
                    type="button"
                    onClick={() => onRemove(assignment.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-text-muted transition hover:border-danger hover:text-danger"
                    title="إزالة التخصص"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
}
