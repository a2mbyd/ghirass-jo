import { useState } from 'react';
import type { TabKey } from "@/features/course/types";
import type {
    Course,
    CourseFile,
    CourseVideo,
    PastYearQuestion,
} from "@/features/courses/types/course";

const useCourse = (course: Course | null) => {
    const [activeTab, setActiveTab] = useState<TabKey>('files');
    const files: CourseFile[] = course?.files ?? [];
    const videos: CourseVideo[] = course?.videos ?? [];
    const pastYearQuestions: PastYearQuestion[] = course?.past_year_questions ?? [];

    const counts: Record<TabKey, number> = {
        files: files.length,
        videos: videos.length,
        questions: pastYearQuestions.length,
    };

    return {
        activeTab,
        setActiveTab,
        files,
        is_lab: course?.is_lab,
        course_code: course?.course_code,
        course_type: course?.course_type,
        year: course?.year,
        semester: course?.semester,
        credit_hours: course?.credit_hours,
        counts,
        videos,
        pastYearQuestions,
    };
};
export default useCourse;
