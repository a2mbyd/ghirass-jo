import type { Section } from "@/shared/types/index";
import type { SelectOption } from "@/shared/ui/admin/inputs/SelectInput";
import {
    COURSE_MAJOR_TYPES,
    COURSE_TYPES,
    PYQ_TYPES,
} from './CourseForm.constants';

export const sectionOptions = (sections: Section[]): SelectOption[] => [
    { value: '', label: '— بدون قسم —' },
    ...sections.map((s) => ({ value: String(s.id), label: s.name })),
];

export const courseTypeOptions: SelectOption[] = COURSE_TYPES.map((t) => ({
    value: t.value,
    label: t.label,
}));

export const courseMajorTypeOptions: SelectOption[] = COURSE_MAJOR_TYPES.map(
    (t) => ({
        value: t.value,
        label: t.label,
    }),
);

export const pyqTypeOptions: SelectOption[] = PYQ_TYPES.map((t) => ({
    value: t.value,
    label: t.label,
}));
