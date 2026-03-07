import React, { useState } from 'react';
import { Course } from '@/types/course';
import { MajorWithCourses } from '@/components/Courses/MajorCard';

const useCourses = (
    majors: MajorWithCourses[],
    universityRequired: Course[],
    universityElective: Course[],
    collegeRequired: Course[],
) => {
    const [selectedMajorSlug, setSelectedMajorSlug] = useState<string | null>(
        null,
    );

    const selectedMajor =
        majors.find((m) => m.slug === selectedMajorSlug) ?? null;

    const totalCourses =
        universityRequired.length +
        universityElective.length +
        collegeRequired.length +
        majors.reduce(
            (sum, m) => sum + m.required.length + m.elective.length,
            0,
        );

    const handleMajorClick = (slug: string) => {
        setSelectedMajorSlug((prev) => (prev === slug ? null : slug));
    };

    return {
        selectedMajorSlug,
        setSelectedMajorSlug,
        selectedMajor,
        totalCourses,
        handleMajorClick,
    };
};

export default useCourses;
