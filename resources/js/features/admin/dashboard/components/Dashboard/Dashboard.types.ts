import { LucideIcon } from 'lucide-react';

export interface QuickLinkConfig {
    key?: string;
    label: string;
    description: string;
    icon: LucideIcon;
    href: string;
    colorClass: string;
    bgClass: string;
}
