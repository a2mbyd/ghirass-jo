import type { Section } from './section';

export interface Major {
    id: number;
    name: string;
    slug: string;
    description: string;
    roadmap_image: string;
}

export interface AdminCourse {
    id: number;
    name: string;
    course_code: string | null;
    credit_hours: number;
    is_lab: boolean;
    section_id: number | null;
    pivot?: {
        year: number;
        semester: number;
        type: string;
    };
}

export interface MajorWithRelations extends Major {
    courses: AdminCourse[];
    sections: Section[];
}
