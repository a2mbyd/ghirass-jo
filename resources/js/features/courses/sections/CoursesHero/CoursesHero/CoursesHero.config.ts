import { Course } from '@/types';

export const getStats = (
    totalCourses: number,
    uniRequired: Course[],
    uniElective: Course[],
    collegeRequired: Course[],
) => [
    {
        label: 'إجمالي المواد',
        value: totalCourses,
    },
    {
        label: 'متطلبات جامعة',
        value: uniRequired.length,
    },
    {
        label: 'اختياري جامعة',
        value: uniElective.length,
    },
    {
        label: 'متطلبات الكلية',
        value: collegeRequired.length,
    },
];
