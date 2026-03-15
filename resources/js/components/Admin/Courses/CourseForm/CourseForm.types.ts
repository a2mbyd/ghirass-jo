export interface FormMajorAssignment {
    id: number;
    year: number;
    semester: number;
    course_major_type: string;
}

export interface NewMajorForm {
    id: number | string;
    course_major_type: string;
    year: number;
    semester: number;
}

export interface FormResource {
    title: string;
    url: string;
}

export interface FormPYQ {
    name: string;
    url: string;
}

export interface CourseCreateFormData {
    name: string;
    course_code: string;
    description: string;
    credit_hours: number;
    course_type: string;
    is_lab: boolean;
    section_id: number | null;
    prerequisites: number[];
    majors: FormMajorAssignment[];
    files: FormResource[];
    videos: FormResource[];
    past_year_questions: FormPYQ[];
}

export interface CourseEditFormData {
    name: string;
    description: string;
    credit_hours: number;
    course_type: string;
    is_lab: boolean;
    section_id: number | null;
    prerequisites: number[];
    majors: FormMajorAssignment[];
    new_files: FormResource[];
    delete_file_ids: number[];
    new_videos: FormResource[];
    delete_video_ids: number[];
    new_past_year_questions: FormPYQ[];
    delete_pyq_ids: number[];
}

export type CourseFormMode = 'create' | 'edit';

export interface CourseFormData {
    name: string;
    course_code: string;
    description: string;
    credit_hours: number;
    course_type: string;
    is_lab: boolean;
    section_id: number | null;
    prerequisites: number[];
    majors: FormMajorAssignment[];
    files: FormResource[];
    videos: FormResource[];
    past_year_questions: FormPYQ[];
    new_files: FormResource[];
    delete_file_ids: number[];
    new_videos: FormResource[];
    delete_video_ids: number[];
    new_past_year_questions: FormPYQ[];
    delete_pyq_ids: number[];
}
