import { Section } from '@/types';
import { Layers } from 'lucide-react';
import React from 'react'

interface SectionChipProps {
    section: Section;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onAction: () => void;
    actionLabel: string;
    actionClass: string;
    isDragging: boolean;
    assigned?: boolean;
}

const SectionChip = ({
    section,
    onDragStart,
    onAction,
    actionLabel,
    actionClass,
    isDragging,
    assigned = false,
}: SectionChipProps) => (
    <div
        draggable
        onDragStart={onDragStart}
        className={`flex cursor-grab items-center gap-2 rounded-lg border px-3 py-2 text-xs transition select-none active:cursor-grabbing ${
            isDragging
                ? 'opacity-40'
                : assigned
                  ? 'border-violet-200 bg-violet-50 text-accent-violet'
                  : 'border-border bg-surface text-text hover:border-violet-300'
        }`}
    >
        <Layers className="h-3.5 w-3.5 shrink-0 text-accent-violet" />
        <span className="min-w-0 flex-1 truncate font-medium">
            {section.name}
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

export default SectionChip