import React from 'react';
import { SEMESTER_LABELS } from './CourseByYearSection.config';
import { BookOpen, Clock } from 'lucide-react';
import CourseCard from './CourseByYearSection.CourseCard';
import { Course } from '@/types/course';
import { YearConfig } from './CourseByYearSection.types';
import SemesterSectionHeader from './CourseByYearSection.semesterSection.header';

interface SemesterSectionProps {
    semester: number;
    semIdx: number;
    semesterMap: Record<number, Course[]>;
    config: YearConfig;
}
const SemesterSection = ({
    semester,
    semIdx,
    semesterMap,
    config,
}: SemesterSectionProps) => {
    const courses = semesterMap[semester];

    const semCourses = courses.length;
    const semHours = courses.reduce((s, c) => s + (c.credit_hours ?? 0), 0);

    return (
        <div key={semester}>
            {/* Semester sub-header */}
            <SemesterSectionHeader
                semester={semester}
                semIdx={semIdx}
                config={config}
                semCourses={semCourses}
                semHours={semHours}
            />

            {/* Courses grid */}
            <div className="grid grid-cols-1 gap-2.5 p-4 xl:grid-cols-2">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        config={config}
                    />
                ))}
            </div>
        </div>
    );
};

export default SemesterSection;
