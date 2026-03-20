import { BookOpen, GraduationCap, Hash, Trash2 } from 'lucide-react';
import React from 'react';
import type { Section } from "@/features/doctors/types/section";
import { ACCENT_COLORS } from '@/pages/Admin/Sections/colors';

interface SectionCardProps {
    section: Section;
    index: number;
    setShowDeleteAssertionModal: (id: number) => void;
}
const SectionCard = ({
    section,
    index,
    setShowDeleteAssertionModal,
}: SectionCardProps) => {
    return (
        <div
            key={section.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft) transition-all hover:border-primary-200 hover:shadow-md"
        >
            {/* Gradient accent bar */}
            <div
                className={`h-1.5 w-full bg-linear-to-r ${ACCENT_COLORS[index % ACCENT_COLORS.length]}`}
            />

            <div className="flex flex-1 flex-col p-5">
                {/* Icon + Name */}
                <div className="mb-5 flex items-start gap-3">
                    <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${ACCENT_COLORS[index % ACCENT_COLORS.length]}`}
                    >
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div className="min-w-0 pt-1">
                        <h3 className="truncate font-semibold text-text">
                            {section.name}
                        </h3>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-text-subtle">
                            <Hash className="h-3 w-3" />
                            <span>{section.id}</span>
                        </div>
                    </div>
                </div>

                {/* Courses count badge */}
                <div className="mb-5 flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-alt px-3 py-2">
                        <BookOpen className="h-4 w-4 text-primary-500" />
                        <span className="text-sm font-semibold text-text">
                            {section.courses_count ?? 0}
                        </span>
                        <span className="text-xs text-text-muted">
                            مادة دراسية
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-auto flex items-center justify-end border-t border-border pt-4">
                    <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent-rose hover:bg-accent-rose/5 hover:text-accent-rose"
                        title="حذف"
                        onClick={() => setShowDeleteAssertionModal(section.id)}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionCard;
