import { useState } from 'react';
import { MajorWithCourses } from '@/types';

const useCourses = (majors: MajorWithCourses[]) => {
    const [selectedMajorSlug, setSelectedMajorSlug] = useState<string | null>(
        null,
    );

    const selectedMajor =
        majors.find((m) => m.slug === selectedMajorSlug) ?? null;

    const totalCourses = majors.reduce(
        (sum, m) =>
            sum +
            m.required.length +
            m.elective.length +
            m.graduationProject.length,
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
