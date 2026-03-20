import type { Section } from "@/features/doctors/types/section";
import type { Major } from "@/features/majors/types/major";

export interface AdminCourse {
    id: number;
    name: string;
    course_code: string;
    credit_hours: number;
    is_lab: boolean;
    section_id: number | null;
    course_type: string;
    majors?: {
        year: number;
        semester: number;
        course_major_type: string;
    }[];
}

export interface MajorWithRelations extends Major {
    courses: AdminCourse[];
    sections: Section[];
}
