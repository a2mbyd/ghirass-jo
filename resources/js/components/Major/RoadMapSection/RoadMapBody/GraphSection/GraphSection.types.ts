import type { Course } from '@/types/course';
import type { Major } from '@/types/major';
import type { Section } from '@/types/section';

export type { Course, Major, Section };

export interface ColorScheme {
    bg: string;
    light: string;
    text: string;
}

export interface CourseNodeData {
    course: Course;
    colors: ColorScheme;
    /** null for isolated/elective courses that live in the side columns */
    semester: number | null;
    highlighted?: boolean;
    dimmed?: boolean;
    completed?: boolean;
    isDark?: boolean;
}

