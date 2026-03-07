import { File, HelpCircle, Video } from 'lucide-react';
import { TabConfig } from './types';

export const TAB_CONFIG: TabConfig[] = [
    {
        key: 'files',
        label: 'الملفات',
        icon: <File className="h-4 w-4" />,
        activeClass:
            'bg-primary-50 text-primary-500 border-primary-200 shadow-sm',
        badgeClass: 'bg-primary-500 text-white',
    },
    {
        key: 'videos',
        label: 'الفيديوهات',
        icon: <Video className="h-4 w-4" />,
        activeClass:
            'bg-accent-pink/10 text-accent-pink border-accent-pink/20 shadow-sm',
        badgeClass: 'bg-accent-pink text-white',
    },
    {
        key: 'questions',
        label: 'أسئلة السنوات',
        icon: <HelpCircle className="h-4 w-4" />,
        activeClass:
            'bg-accent-emerald/10 text-accent-emerald-dark border-accent-emerald/20 shadow-sm',
        badgeClass: 'bg-accent-emerald-dark text-white',
    },
];
