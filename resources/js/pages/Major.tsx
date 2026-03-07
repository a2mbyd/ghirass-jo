import type { Course, Major, Section } from '@/types';
import Hero from '@/components/Major/Hero';
import RoadMapSection from '@/components/Major/RoadMapSection';
import CourseByYearSection from '@/components/Major/CourseByYearSection/CourseByYearSection';

interface MajorProps {
    major: Major;
    sections: Section[];
    courses: Course[];
}
export default function Major({ major, sections, courses }: MajorProps) {
    return (
        <div dir="rtl" className="flex flex-col gap-8">
            {/* ── Hero / Major Header ── */}
            <Hero courses={courses} major={major} sections={sections} />

            {/* ── Roadmap Section ── */}
            <RoadMapSection
                major={major}
                sections={sections}
                courses={courses}
            />

            {/* ── Courses by Year Section ── */}
            <CourseByYearSection courses={courses} />
        </div>
    );
}
