import React from 'react';
import type { Course } from "@/features/courses/types/course";
import CourseCard from './CourseByYearSection.CourseCard';
import SemesterSectionHeader from './CourseByYearSection.semesterSection.header';
import type { YearConfig } from './CourseByYearSection.types';

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
