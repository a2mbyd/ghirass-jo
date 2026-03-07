import { Course } from '@/types/course';

export const isExcluded = (course: Course) =>
    course.name.includes('اختياري') || course.name.includes('استدراكي');

export const getByYear = (courses: Course[]) => {
    return courses
        .filter((c) => !isExcluded(c))
        .reduce<Record<number, Record<number, Course[]>>>((acc, course) => {
            const y = course.year ?? 0;
            const s = course.semester ?? 1;
            if (!acc[y]) acc[y] = {};
            if (!acc[y][s]) acc[y][s] = [];
            acc[y][s].push(course);
            return acc;
        }, {});
};
