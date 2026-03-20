import { GraduationCap, BookMarked, Layers, Stethoscope } from 'lucide-react';
import { index as majorsIndex } from '@/routes/admin/majors';
import { index as coursesIndex } from '@/routes/admin/courses';
import { index as sectionsIndex } from '@/routes/admin/sections';
import { index as doctorsIndex } from '@/routes/admin/doctors';
export const STATS_CONFIG = [
    {
        key: 'majors' as const,
        label: 'التخصصات',
        icon: GraduationCap,
        colorClass: 'text-primary-500',
        bgClass: 'bg-primary-50',
        delay: 'stagger-1',
    },
    {
        key: 'courses' as const,
        label: 'المقررات',
        icon: BookMarked,
        colorClass: 'text-primary-500',
        bgClass: 'bg-primary-50',
        delay: 'stagger-2',
    },
    {
        key: 'sections' as const,
        label: 'الأقسام',
        icon: Layers,
        colorClass: 'text-primary-500',
        bgClass: 'bg-primary-50',
        delay: 'stagger-3',
    },
    {
        key: 'doctors' as const,
        label: 'الدكاترة',
        icon: Stethoscope,
        colorClass: 'text-primary-500',
        bgClass: 'bg-primary-50',
        delay: 'stagger-4',
    },
];

export const QUICK_LINKS_CONFIG = [
    {
        label: 'إدارة التخصصات',
        description: 'إضافة وتعديل التخصصات الأكاديمية',
        icon: GraduationCap,
        href: majorsIndex.url(),
        colorClass: 'text-primary-500',
        bgClass: 'bg-primary-50',
    },
    {
        label: 'إدارة المقررات',
        description: 'إضافة وتعديل المقررات الدراسية',
        icon: BookMarked,
        href: coursesIndex.url(),
        colorClass: 'text-primary-500',
        bgClass: 'bg-primary-50',
    },
    {
        label: 'إدارة الأقسام',
        description: 'إدارة الأقسام والتسلسل الهرمي',
        icon: Layers,
        href: sectionsIndex.url(),
        colorClass: 'text-primary-500',
        bgClass: 'bg-primary-50',
    },
    {
        label: 'إدارة الدكاترة',
        description: 'إضافة وتعديل بيانات أعضاء الهيئة التدريسية',
        icon: Stethoscope,
        href: doctorsIndex.url(),
        colorClass: 'text-primary-500',
        bgClass: 'bg-primary-50',
    },
];
