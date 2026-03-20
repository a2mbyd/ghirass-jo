type TabKey = 'files' | 'videos' | 'questions';
interface TabConfig {
    key: TabKey;
    label: string;
    icon: React.ReactNode;
    activeClass: string;
    badgeClass: string;
}

export type { TabKey, TabConfig };