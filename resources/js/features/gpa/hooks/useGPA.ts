import { useState } from 'react';
import { generateId } from "@/shared/lib/utils";
import type { CourseEntry } from "@/shared/types/index";

const MAX_CREDITS = 300;
const MAX_GPA = 4.2;

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

    const previousGpaValue = Math.min(parseFloat(previousGpa) || 0, MAX_GPA);
    const previousCreditsValue = Math.min(
        parseInt(previousCredits) || 0,
        MAX_CREDITS,
    );
    const cumulativeTotalCredits = totalCredits + previousCreditsValue;
    const rawCumulativeGpa =
        cumulativeTotalCredits > 0
            ? (weightedSum + previousGpaValue * previousCreditsValue) /
              cumulativeTotalCredits
            : 0;
    const cumulativeGpa = Math.min(rawCumulativeGpa, MAX_GPA);

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
