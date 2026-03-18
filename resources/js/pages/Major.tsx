import type { Course, Major, Section } from '@/types';
import Hero from '@/components/Major/Hero';
import RoadMapSection from '@/components/Major/RoadMapSection';
import CourseByYearSection from '@/components/Major/CourseByYearSection/CourseByYearSection';
import { useMemo } from 'react';
import {
    MAJOR_ELECTIVES,
    UNI_ELECTIVES,
} from '@/components/Major/RoadMapSection/RoadMapBody/GraphSection/GraphSection.constants';

interface MajorProps {
    major: Major;
    sections: Section[];
    majorCourses: Course[];
    uniRequired: Course[];
    collegeRequired: Course[];
    allCourses: Course[];
}

export default function Major({
    major,
    sections,
    majorCourses,
    uniRequired,
    collegeRequired,
    allCourses,
}: MajorProps) {
    const allMajorCourses = useMemo<Course[]>(
        () => [
            ...majorCourses,
            ...MAJOR_ELECTIVES.map((c) => ({ ...c, sectionId: -4 })),
            ...uniRequired.map((c) => ({ ...c, sectionId: -1 })),
            ...collegeRequired.map((c) => ({ ...c, sectionId: -3 })),
            ...UNI_ELECTIVES.map((c) => ({ ...c, sectionId: -2 })),
        ],
        [majorCourses, uniRequired, collegeRequired],
    );
    return (
        <div dir="rtl" className="flex flex-col gap-8">
            {/* ── Hero / Major Header — only counts real major sections & courses ── */}
            <Hero
                allCourses={allMajorCourses}
                major={major}
                sections={sections}
            />

            {/* ── Roadmap Section — receives all course groups separately ── */}
            <RoadMapSection
                major={major}
                sections={sections}
                allCourses={allMajorCourses}
            />

            {/* ── Courses by Year — only shows real major courses ── */}
            <CourseByYearSection courses={allMajorCourses} />
        </div>
    );
}
