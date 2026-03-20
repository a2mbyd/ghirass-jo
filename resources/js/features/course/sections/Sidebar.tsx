import type { CourseFile, CourseVideo } from "@/features/courses/types/course";
import { STATS_CONFIG, TAB_CONFIG } from '../course.config';
import type { TabKey } from '../types';

interface SidebarProps {
    activeTab: TabKey;
    setActiveTab: (tab: TabKey) => void;
    files: CourseFile[];
    videos: CourseVideo[];
    counts: Record<TabKey, number>;
}
const Sidebar = ({
    activeTab,
    setActiveTab,
    counts,
}: SidebarProps) => {
    return (
        <aside
            className="animate-fade-in-up stagger-4 mb-6 w-full shrink-0 lg:sticky lg:top-6 lg:mb-0 lg:w-56"
            style={{ animationFillMode: 'both', opacity: 0 }}
        >
            {/* Stats cards */}
            <div className="mb-4 grid grid-cols-3 gap-2 lg:grid-cols-1">
                {STATS_CONFIG.map(({ label, bg, text, key }) => (
                    <div
                        key={label}
                        className={`${bg} flex flex-col gap-0.5 rounded-2xl border border-border p-3`}
                    >
                        <span className={`text-xl font-extrabold ${text}`}>
                            {counts[key as TabKey]}
                        </span>
                        <span className="text-xs font-medium text-text-muted">
                            {label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Tab nav */}
            <nav className="flex flex-row gap-2 lg:flex-col">
                {TAB_CONFIG.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex flex-1 items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200 lg:flex-none ${
                            activeTab === tab.key
                                ? tab.activeClass
                                : 'border-border bg-surface text-text-muted hover:bg-surface-alt'
                        }`}
                    >
                        {tab.icon}
                        <span className="hidden lg:inline">{tab.label}</span>
                        <span
                            className={`mr-auto hidden rounded-full px-2 py-0.5 text-xs font-bold lg:inline ${
                                activeTab === tab.key
                                    ? tab.badgeClass
                                    : 'bg-surface-alt text-text-muted'
                            }`}
                        >
                            {counts[tab.key]}
                        </span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
