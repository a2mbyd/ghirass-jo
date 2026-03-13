import { TAB_CONFIG } from '@/components/Course/Course.config';
import { TabKey } from '@/components/Course/Course.types';
import {
    Course,
    CourseFile,
    CourseVideo,
    PastYearQuestion,
} from '@/types/course';
import React, { useState } from 'react';

const useCourse = (course: Course | null) => {
    const [activeTab, setActiveTab] = useState<TabKey>('files');

    const files: CourseFile[] =
        course?.files?.map((file: any) => ({
            id: file.id,
            name: file.name ?? file.title ?? 'ملف',
            url: file.url,
        })) ?? [];

    const videos: CourseVideo[] =
        course?.videos?.map((video: any) => ({
            id: video.id,
            name: video.name ?? video.title ?? 'فيديو',
            url: video.url,
        })) ?? [];

    const pastYearQuestions: PastYearQuestion[] =
        course?.past_year_questions?.map((question: any) => ({
            id: question.id,
            name: question.name ?? question.title ?? 'سؤال',
            url: question.url,
        })) ?? [];

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
