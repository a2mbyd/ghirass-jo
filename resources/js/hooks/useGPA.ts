import { generateId } from '@/lib/utils';
import React, { useState } from 'react';
import { CourseEntry } from '@/types';

const useGPA = () => {
    const [courses, setCourses] = useState<CourseEntry[]>([
        { id: generateId(), name: '', credits: 3, grade: 4.0 },
        { id: generateId(), name: '', credits: 3, grade: 4.0 },
        { id: generateId(), name: '', credits: 3, grade: 4.0 },
    ]);

    const [previousGpa, setPreviousGpa] = useState<string>('');
    const [previousCredits, setPreviousCredits] = useState<string>('');

    const addCourse = () => {
        setCourses((prev) => [
            ...prev,
            { id: generateId(), name: '', credits: 3, grade: 4.0 },
        ]);
    };

    const removeCourse = (id: string) => {
        if (courses.length <= 1) return;
        setCourses((prev) => prev.filter((c) => c.id !== id));
    };

    const updateCourse = (
        id: string,
        field: keyof CourseEntry,
        value: string | number,
    ) => {
        setCourses((prev) =>
            prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
        );
    };

    const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);
    const weightedSum = courses.reduce(
        (sum, c) => sum + (c.credits || 0) * (c.grade ?? 0),
        0,
    );
    const gpa = totalCredits > 0 ? weightedSum / totalCredits : 0;

    const previousGpaValue = Math.min(parseFloat(previousGpa) || 0, 4.2);
    const previousCreditsValue = Math.min(parseInt(previousCredits) || 0, 300);
    const cumulativeTotalCredits = totalCredits + previousCreditsValue;
    const rawCumulativeGpa =
        cumulativeTotalCredits > 0
            ? (weightedSum + previousGpaValue * previousCreditsValue) /
              cumulativeTotalCredits
            : 0;
    const cumulativeGpa = Math.min(rawCumulativeGpa, 4.2);

    return {
        courses,
        previousGpa,
        previousCredits,
        addCourse,
        removeCourse,
        updateCourse,
        setPreviousGpa,
        setPreviousCredits,
        totalCredits,
        gpa,
        cumulativeGpa,
        cumulativeTotalCredits,
    };
};

export default useGPA;
