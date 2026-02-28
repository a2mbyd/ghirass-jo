import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Calculator,
    ChevronLeft,
    GraduationCap,
    Mail,
} from 'lucide-react';
import React from 'react';

const quickLinks = [
    {
        href: '/subjects',
        label: 'مواد تكنولوجيا المعلومات',
        description: 'تصفح روابط جميع مواد تكنولوجيا المعلومات والموارد',
        icon: BookOpen,
        gradient: 'from-primary-500 to-accent-cyan',
        delay: 'stagger-1',
    },
    {
        href: '/#majors',
        label: 'خطط التخصصات',
        description: 'عرض المقررات لكل تخصص',
        icon: GraduationCap,
        gradient: 'from-accent-violet to-accent-rose',
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
        label: 'البريد الإلكتروني للأساتذة',
        description: 'ابحث عن معلومات التواصل مع أعضاء الهيئة التدريسية',
        icon: Mail,
        gradient: 'from-accent-amber to-accent-rose',
        delay: 'stagger-4',
    },
];

const QuickLinksSection = () => {
    return (
        <section className="px-4 py-14">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-center mb-10 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                    روابط سريعة
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {quickLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`card-hover animate-fade-in-up opacity-0 ${link.delay} group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-md`}
                            >
                                <div
                                    className={`mb-4 inline-flex rounded-xl bg-linear-to-br ${link.gradient} p-3`}
                                >
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 font-display font-semibold text-text group-hover:text-primary-600">
                                    {link.label}
                                </h3>
                                <p className="mb-4 text-sm text-text-muted">
                                    {link.description}
                                </p>
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                                    استكشف
                                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default QuickLinksSection;
