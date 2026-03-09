import { AdminCourse } from "@/types";
import { BookMarked } from "lucide-react";

interface CourseChipProps {
    course: AdminCourse;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onAction: () => void;
    actionLabel: string;
    actionClass: string;
    isDragging: boolean;
    assigned?: boolean;
}

const CourseChip = ({
    course,
    onDragStart,
    onAction,
    actionLabel,
    actionClass,
    isDragging,
    assigned = false,
}: CourseChipProps) => (
    <div
        draggable
        onDragStart={onDragStart}
        className={`flex cursor-grab items-center gap-2 rounded-lg border px-3 py-2 text-xs transition select-none active:cursor-grabbing ${
            isDragging
                ? 'opacity-40'
                : assigned
                  ? 'border-primary-200 bg-primary-50 text-primary-700'
                  : 'border-border bg-surface text-text hover:border-primary-300'
        }`}
    >
        <BookMarked className="h-3.5 w-3.5 shrink-0 text-accent-cyan" />
        <span className="min-w-0 flex-1 truncate font-medium">
            {course.name}
        </span>
        {course.course_code && (
            <code className="shrink-0 rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px] text-text-subtle">
                {course.course_code}
            </code>
        )}
        <span className="shrink-0 text-text-subtle">
            {course.credit_hours}س
        </span>
        <button
            type="button"
            onClick={onAction}
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded font-bold transition ${actionClass}`}
        >
            {actionLabel}
        </button>
    </div>
);

export default CourseChip;