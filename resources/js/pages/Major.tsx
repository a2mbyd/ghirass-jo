import { useMemo } from 'react';
import RoadMapSection from '@/components/Major/RoadMapSection';
import {
    MAJOR_ELECTIVES,
    UNI_ELECTIVES,
} from '@/components/Major/RoadMapSection/RoadMapBody/GraphSection/GraphSection.constants';
import CourseByYearSection from "@/features/major/sections/CourseByYearSection/CourseByYearSection/CourseByYearSection";
import Hero from "@/features/major/sections/Hero/Hero/index";
import type { Course, Major, Section } from "@/shared/types/index";

const REMEDIAL_SECTION_ID = -6;

interface MajorProps {
    major: Major;
    sections: Section[];
    majorCourses: Course[];
    uniRequired: Course[];
    collegeRequired: Course[];
    remedialCourses: Course[];
}

export default function Major({
    major,
    sections,
    majorCourses,
    uniRequired,
    collegeRequired,
    remedialCourses,
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

    const allCoursesForGraph = useMemo<Course[]>(
        () => [
            ...allMajorCourses,
            ...remedialCourses.map((c) => ({
                ...c,
                sectionId: REMEDIAL_SECTION_ID,
            })),
        ],
        [allMajorCourses, remedialCourses],
    );

    return (
        <div dir="rtl" className="flex flex-col gap-8">
            {/* ── Hero / Major Header — excludes remedial courses ── */}
            <Hero
                allCourses={allMajorCourses}
                major={major}
                sections={sections}
            />

            {/* ── Roadmap Section — includes remedial courses for graph display ── */}
            <RoadMapSection
                major={major}
                sections={sections}
                allCourses={allCoursesForGraph}
            />

            {/* ── Courses by Year — excludes remedial courses ── */}
            <CourseByYearSection courses={allMajorCourses} />
        </div>
    );
}
