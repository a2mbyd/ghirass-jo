import type { Course } from "@/features/courses/types/course";
import type { Section } from "@/features/doctors/types/section";
import type { Major } from "@/features/majors/types/major";

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

