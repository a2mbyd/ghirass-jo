import StatsCard from '@/components/Admin/Dashboard/StatsCard';
import AdminLayout from '@/layouts/AdminLayout';
import { usePage } from '@inertiajs/react';
import {
    BookMarked,
    GraduationCap,
    Layers,
    Stethoscope,
    TrendingUp,
} from 'lucide-react';
import React from 'react';

interface DashboardProps {
    stats: {
        majors: number;
        courses: number;
        sections: number;
        doctors: number;
    };
}

const statsConfig = [
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
        colorClass: 'text-accent-cyan',
        bgClass: 'bg-cyan-50',
        delay: 'stagger-2',
    },
    {
        key: 'sections' as const,
        label: 'الأقسام',
        icon: Layers,
        colorClass: 'text-accent-violet',
        bgClass: 'bg-violet-50',
        delay: 'stagger-3',
    },
    {
        key: 'doctors' as const,
        label: 'الدكاترة',
        icon: Stethoscope,
        colorClass: 'text-accent-emerald',
        bgClass: 'bg-emerald-50',
        delay: 'stagger-4',
    },
];

const quickLinks = [
    {
        label: 'إدارة التخصصات',
        description: 'إضافة وتعديل التخصصات الأكاديمية',
        icon: GraduationCap,
        href: '/admin/majors',
        colorClass: 'text-primary-500',
        bgClass: 'bg-primary-50',
    },
    {
        label: 'إدارة المقررات',
        description: 'إضافة وتعديل المقررات الدراسية',
        icon: BookMarked,
        href: '/admin/courses',
        colorClass: 'text-accent-cyan',
        bgClass: 'bg-cyan-50',
    },
    {
        label: 'إدارة الأقسام',
        description: 'إدارة الأقسام والتسلسل الهرمي',
        icon: Layers,
        href: '/admin/sections',
        colorClass: 'text-accent-violet',
        bgClass: 'bg-violet-50',
    },
    {
        label: 'إدارة الدكاترة',
        description: 'إضافة وتعديل بيانات أعضاء الهيئة التدريسية',
        icon: Stethoscope,
        href: '/admin/doctors',
        colorClass: 'text-accent-emerald',
        bgClass: 'bg-emerald-50',
    },
];

const Dashboard = ({ stats }: DashboardProps) => {
    const totalItems = stats.majors + stats.courses + stats.sections + stats.doctors;

    return (
            <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
                {/* Header */}
                <div className="animate-fade-in-up mb-8">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-accent-violet">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-text font-display">
                                لوحة التحكم
                            </h1>
                            <p className="text-sm text-text-muted">
                                مرحباً بك — نظرة عامة على محتوى المنصة
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <section className="mb-8">
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-subtle">
                        الإحصائيات
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {statsConfig.map(({ key, label, icon, colorClass, bgClass, delay }) => (
                            <StatsCard
                                key={key}
                                label={label}
                                value={stats[key]}
                                icon={icon}
                                colorClass={colorClass}
                                bgClass={bgClass}
                                delay={delay}
                            />
                        ))}
                    </div>
                </section>

                {/* Summary Banner */}
                <div className="animate-fade-in-up stagger-5 mb-8 flex items-center justify-between rounded-2xl border border-primary-100 bg-linear-to-l from-primary-500/5 to-primary-500/10 px-6 py-4">
                </div>

                {/* Quick Actions */}
                <section>
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-subtle">
                        الوصول السريع
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {quickLinks.map(({ label, description, icon: Icon, href, colorClass, bgClass }, index) => (
                            <a
                                key={href}
                                href={href}
                                className={`animate-fade-in-up card-hover group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-(--shadow-soft) stagger-${index + 6}`}
                            >
                                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bgClass} transition-transform duration-200 group-hover:scale-110`}>
                                    <Icon className={`h-6 w-6 ${colorClass}`} />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-text">{label}</p>
                                    <p className="mt-0.5 text-xs text-text-muted truncate">{description}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
    );
};

export default Dashboard;
