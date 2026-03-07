import { File } from 'lucide-react';
import { CourseFile, PastYearQuestion } from '@/types/course';

const FileRow = ({
    item,
    index,
}: {
    item: CourseFile | PastYearQuestion;
    index: number;
}) => (
    <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group animate-fade-in-up flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-all duration-200 hover:border-primary-200 hover:bg-primary-50/40"
        style={{
            animationDelay: `${index * 0.05}s`,
            animationFillMode: 'both',
            opacity: 0,
        }}
    >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500 transition-colors duration-200 group-hover:bg-primary-500 group-hover:text-white">
            <File className="h-5 w-5" />
        </div>
        <span
            className="flex-1 truncate text-sm font-medium text-text"
            dir="rtl"
        >
            {item.name}
        </span>
    </a>
);

export default FileRow;
