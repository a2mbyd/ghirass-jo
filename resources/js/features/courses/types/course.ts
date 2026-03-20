export interface Course {
    id: number;
    sectionId: number | null;
    name: string;
    course_code: string;
    credit_hours: number;
    course_type: string;
    course_major_type?: string;
    is_lab: boolean;
    year: number;
    semester: 1 | 2;
    prerequisites: number[];
    past_year_questions: PastYearQuestion[];
    files: CourseFile[];
    videos: CourseVideo[];
}

export interface PastYearQuestion {
    id: number;
    name: string;
    url: string;
}

export interface CourseFile {
    id: number;
    name: string;
    url: string;
}

export interface CourseVideo {
    id: number;
    name: string;
    url: string;
}

export interface MajorWithCourses {
    id: number;
    name: string;
    slug: string;
    description: string;
    roadmap_image: string;
    required: Course[];
    elective: Course[];
    graduationProject: Course[];
}
