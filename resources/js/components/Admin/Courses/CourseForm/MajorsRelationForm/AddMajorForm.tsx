import { Plus } from 'lucide-react';
import SelectInput from '@/components/ui/Admin/CreateAndEditForm/Inputs/SelectInput';
import { YEARS, SEMESTERS } from '../CourseForm.constants';
import type { NewMajorForm } from '../CourseForm.types';

interface AddMajorFormProps {
    courseType: string;
    newMajorForm: NewMajorForm;
    availableMajors: { id: number; name: string; slug: string }[];
    courseMajorTypeOptions: { value: string; label: string }[];
    onChange: (updates: Partial<NewMajorForm>) => void;
    onAdd: () => void;
}

export function AddMajorForm({
    courseType,
    newMajorForm,
    availableMajors,
    courseMajorTypeOptions,
    onChange,
    onAdd,
}: AddMajorFormProps) {
    return (
        <div className="rounded-xl border border-primary-200 bg-primary-50/40 p-4">
            <p className="mb-3 text-sm font-semibold text-primary-700">
                ربط تخصص جديد
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                <SelectInput
                    label="التخصص"
                    value={String(newMajorForm.id)}
                    onChange={(v) => onChange({ id: v })}
                    options={[
                        { value: '', label: 'اختر التخصص...' },
                        ...availableMajors.map((m) => ({
                            value: String(m.id),
                            label: m.name,
                        })),
                    ]}
                    className="sm:col-span-2"
                />
                {courseType === 'major_course' && (
                    <SelectInput
                        label="نوع المادة"
                        value={
                            newMajorForm.course_major_type || 'required_major'
                        }
                        onChange={(v) => onChange({ course_major_type: v })}
                        options={courseMajorTypeOptions}
                    />
                )}
                <div className="flex gap-2">
                    <SelectInput
                        label="السنة"
                        value={String(newMajorForm.year)}
                        onChange={(v) => onChange({ year: Number(v) })}
                        options={YEARS.map((y) => ({
                            value: String(y),
                            label: `سنة ${y}`,
                        }))}
                    />
                    <SelectInput
                        label="الفصل"
                        value={String(newMajorForm.semester)}
                        onChange={(v) => onChange({ semester: Number(v) })}
                        options={SEMESTERS.map((s) => ({
                            value: String(s),
                            label: `فصل ${s}`,
                        }))}
                    />
                </div>
            </div>
            <div className="mt-3 flex justify-end">
                <button
                    type="button"
                    onClick={onAdd}
                    disabled={!newMajorForm.id}
                    className="flex items-center gap-1.5 rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600 disabled:opacity-50"
                >
                    <Plus className="h-3.5 w-3.5" />
                    إضافة
                </button>
            </div>
        </div>
    );
}
