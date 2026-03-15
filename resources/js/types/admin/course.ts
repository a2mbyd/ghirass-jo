export interface AdminCourseBasic {
    id: number;
    name: string;
    course_code: string;
}

export interface AdminCourseMajorAssignment {
    id: number;
    name: string;
    slug: string;
    pivot: {
        year: number;
        semester: number;
        course_major_type: string;
    };
}

export interface AdminCourseResource {
    id: number;
    title: string;
    url: string;
}

export interface AdminCoursePYQ {
    id: number;
    name: string;
    url: string;
}

export interface AdminCourseWithRelations {
    id: number;
    name: string;
    course_code: string;
    course_type: string;
    description: string | null;
    credit_hours: number;
    is_lab: boolean;
    section_id: number | null;
    prerequisites: AdminCourseBasic[];
    majors: AdminCourseMajorAssignment[];
    files: AdminCourseResource[];
    videos: AdminCourseResource[];
    past_year_questions: AdminCoursePYQ[];
}
