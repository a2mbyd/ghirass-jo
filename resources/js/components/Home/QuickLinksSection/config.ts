import { BookOpen, GraduationCap, Calculator, Mail } from 'lucide-react';

export const QUICK_LINKS_CONFIG = [
    {
        href: '/#majors',
        label: 'خطط التخصصات',
        description: 'عرض المقررات لكل تخصص',
        icon: GraduationCap,
        gradient: 'from-accent-violet to-accent-rose',
        delay: 'stagger-1',
    },
    {
        href: '/courses',
        label: 'مواد تكنولوجيا المعلومات',
        description: 'تصفح روابط جميع مواد تكنولوجيا المعلومات والموارد',
        icon: BookOpen,
        gradient: 'from-primary-500 to-accent-cyan',
        delay: 'stagger-2',
    },
    {
        href: '/gpa',
        label: 'حساب المعدل',
        description: 'احسب معدلك بسهولة',
        icon: Calculator,
        gradient: 'from-accent-emerald to-accent-cyan',
        delay: 'stagger-3',
    },
    {
        href: '/doctors',
        label: 'البريد الإلكتروني للدكاترة',
        description: 'ابحث عن معلومات التواصل مع أعضاء الهيئة التدريسية',
        icon: Mail,
        gradient: 'from-accent-amber to-accent-rose',
        delay: 'stagger-4',
    },
];
