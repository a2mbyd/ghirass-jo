import type { Course, Major, Section } from '@/types';
import Hero from '@/components/Major/Hero';
import RoadMapSection from '@/components/Major/RoadMapSection';
import CourseByYearSection from '@/components/Major/CourseByYearSection/CourseByYearSection';

interface MajorProps {
    major: Major;
    sections: Section[];
    majorCourses: Course[];
    majorElectives: Course[];
    uniRequired: Course[];
    collegeRequired: Course[];
    uniElective: Course[];
    allCourses: Course[];
}

export default function Major({
    major,
    sections,
    majorCourses,
    majorElectives,
    uniRequired,
    collegeRequired,
    uniElective,
    allCourses,
}: MajorProps) {
    return (
        <div dir="rtl" className="flex flex-col gap-8">
            {/* ── Hero / Major Header — only counts real major sections & courses ── */}
            <Hero allCourses={allCourses} major={major} sections={sections} />

            {/* ── Roadmap Section — receives all course groups separately ── */}
            <RoadMapSection
                major={major}
                sections={sections}
                majorCourses={majorCourses}
                majorElectives={majorElectives}
                uniRequired={uniRequired}
                collegeRequired={collegeRequired}
                uniElective={uniElective}
            />

            {/* ── Courses by Year — only shows real major courses ── */}
            <CourseByYearSection courses={majorCourses} />
        </div>
    );
}
