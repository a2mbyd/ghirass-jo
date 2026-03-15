import { useState } from 'react';
import { GraduationCap, Plus, X } from 'lucide-react';
import FormCard from '@/components/ui/Admin/CreateAndEditForm/FormCard';
import { AddMajorForm } from './AddMajorForm';
import { MajorEmptyState } from './MajorEmptyState';
import { MajorTableRow } from './MajorTableRow';
import type { FormMajorAssignment, NewMajorForm } from '../CourseForm.types';

interface MajorsFormCardProps {
    courseType: string;
    majors: FormMajorAssignment[];
    allMajors: { id: number; name: string; slug: string }[];
    courseMajorTypeOptions: { value: string; label: string }[];
    getMajorName: (id: number) => string;
    error?: string;
    onAdd: (form: NewMajorForm) => void;
    onUpdate: (
        id: number,
        field: 'year' | 'semester' | 'course_major_type',
        value: number | string,
    ) => void;
    onRemove: (id: number) => void;
}

const DEFAULT_NEW_MAJOR_FORM: NewMajorForm = {
    id: '',
    course_major_type: '',
    year: 1,
    semester: 1,
};

export function MajorsFormCard({
    courseType,
    majors,
    allMajors,
    courseMajorTypeOptions,
    getMajorName,
    error,
    onAdd,
    onUpdate,
    onRemove,
}: MajorsFormCardProps) {
    const [showForm, setShowForm] = useState(false);
    const [newMajorForm, setNewMajorForm] = useState<NewMajorForm>(
        DEFAULT_NEW_MAJOR_FORM,
    );

    const availableMajors = allMajors.filter(
        (m) => !majors.some((a) => String(a.id) === String(m.id)),
    );

    function handleAdd() {
        onAdd(newMajorForm);
        setNewMajorForm(DEFAULT_NEW_MAJOR_FORM);
        setShowForm(false);
    }

    return (
        <FormCard
            title="التخصصات المرتبطة"
            icon={<GraduationCap className="h-4 w-4 text-primary-500" />}
            allowOverflow
        >
            <div className="space-y-4 p-6">
                {/* Header row */}
                <div className="flex items-center justify-between">
                    <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-text-muted">
                        {majors.length} تخصص
                    </span>
                    {availableMajors.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setShowForm((v) => !v)}
                            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                                showForm
                                    ? 'border-border bg-surface-alt text-text-muted hover:border-danger hover:text-danger'
                                    : 'border-primary-500 bg-primary-50 text-primary-500 hover:bg-primary-100'
                            }`}
                        >
                            {showForm ? (
                                <>
                                    <X className="h-3.5 w-3.5" />
                                    إلغاء
                                </>
                            ) : (
                                <>
                                    <Plus className="h-3.5 w-3.5" />
                                    إضافة تخصص
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* Add form */}
                {showForm && (
                    <AddMajorForm
                        courseType={courseType}
                        newMajorForm={newMajorForm}
                        availableMajors={availableMajors}
                        courseMajorTypeOptions={courseMajorTypeOptions}
                        onChange={(updates) =>
                            setNewMajorForm((f: NewMajorForm) => ({
                                ...f,
                                ...updates,
                            }))
                        }
                        onAdd={handleAdd}
                    />
                )}

                {/* List or empty state */}
                {majors.length === 0 ? (
                    <MajorEmptyState />
                ) : (
                    <div className="rounded-xl border border-border">
                        <div className="hidden grid-cols-12 items-center gap-2 border-b border-border bg-surface-alt px-4 py-2.5 text-xs font-semibold tracking-wider text-text-subtle uppercase sm:grid">
                            <span className="col-span-3">التخصص</span>
                            <span className="col-span-4">نوع المادة</span>
                            <span className="col-span-2 text-center">
                                السنة
                            </span>
                            <span className="col-span-2 text-center">
                                الفصل
                            </span>
                            <span className="col-span-1" />
                        </div>
                        <div className="divide-y divide-border">
                            {majors.map((assignment) => (
                                <MajorTableRow
                                    key={assignment.id}
                                    assignment={assignment}
                                    courseType={courseType}
                                    getMajorName={getMajorName}
                                    onUpdate={onUpdate}
                                    onRemove={onRemove}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {error && <p className="text-xs text-danger">{error}</p>}
            </div>
        </FormCard>
    );
}
