import type { Major } from '@/types/major';
import type { Section } from '@/types/section';

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
