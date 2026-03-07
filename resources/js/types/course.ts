/** Matches CourseService::getMajorCourses() response shape */
export interface Course {
    id: number;
    sectionId: number | null;
    name: string;
    course_code: string | null;
    credit_hours: number;
    type: string;
    is_lab: boolean;
    year: number;
    /** Semester within year (1 or 2 only) */
    semester: number;
    prerequisites: number[];
    corequisites: number[];
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
}
