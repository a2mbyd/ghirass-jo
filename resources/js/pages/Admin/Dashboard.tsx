import StatsCard from '@/components/Admin/Dashboard/Dashboard.StatsCard';
import { TrendingUp } from 'lucide-react';
import {
    STATS_CONFIG,
    QUICK_LINKS_CONFIG,
} from '@/components/Admin/Dashboard/Dashboard.config';
import QuickLinkCard from '@/components/Admin/Dashboard/Dashboard.QuickLinkCard';

interface DashboardProps {
    stats: {
        majors: number;
        courses: number;
        sections: number;
        doctors: number;
    };
}

const Dashboard = ({ stats }: DashboardProps) => {
    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            {/* Header */}
            <div className="animate-fade-in-up mb-8">
                <div className="mb-1 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-accent-violet">
                        <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-text">
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
                <h2 className="mb-4 text-xs font-semibold tracking-widest text-text-subtle uppercase">
                    الإحصائيات
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {STATS_CONFIG.map(
                        ({ key, label, icon, colorClass, bgClass, delay }) => (
                            <StatsCard
                                key={key}
                                label={label}
                                value={stats[key]}
                                icon={icon}
                                colorClass={colorClass}
                                bgClass={bgClass}
                                delay={delay}
                            />
                        ),
                    )}
                </div>
            </section>

            {/* Quick Actions */}
            <section>
                <h2 className="mb-4 text-xs font-semibold tracking-widest text-text-subtle uppercase">
                    الوصول السريع
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {QUICK_LINKS_CONFIG.map((config, index) => (
                        <QuickLinkCard
                            key={config.href}
                            config={config}
                            index={index}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
