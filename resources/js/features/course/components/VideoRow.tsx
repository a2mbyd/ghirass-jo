import { CourseVideo } from '@/types/course';
import { Play } from 'lucide-react';

const VideoRow = ({ video, index }: { video: CourseVideo; index: number }) => (
    <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group animate-fade-in-up flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-all duration-200 hover:border-accent-pink/20 hover:bg-accent-pink/5"
        style={{
            animationDelay: `${index * 0.05}s`,
            animationFillMode: 'both',
            opacity: 0,
        }}
    >
        <div className="relative flex h-10 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-linear-to-br from-accent-pink/10 to-primary-50">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface/80 text-accent-pink shadow-sm transition-transform duration-200 group-hover:scale-110">
                <Play className="h-4 w-4" />
            </div>
        </div>
        <span
            className="flex-1 truncate text-sm font-medium text-text"
            dir="rtl"
        >
            {video.name}
        </span>
        <span className="shrink-0 rounded-full border border-accent-pink/20 bg-accent-pink/10 px-2.5 py-1 text-xs font-semibold text-accent-pink">
            فيديو
        </span>
    </a>
);

export default VideoRow;
