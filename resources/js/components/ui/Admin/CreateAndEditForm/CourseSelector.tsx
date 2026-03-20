import DualPanelDnD, { DnDGroup } from '@/components/ui/DualPanelDnD';
import { AdminCourseBasic } from '@/types/admin/course';
import { Section } from '@/types/section';
import { BookMarked, Plus, X } from 'lucide-react';
import React from 'react';

interface CourseSelectorProps {
    allCourses: AdminCourseBasic[];
    allSections?: Section[];
    assignedIds: number[];
    onAssign: (id: number) => void;
    onUnassign: (id: number) => void;
    emptyAssignedLabel?: string;
}

const CourseSelector = ({
    allCourses,
    allSections,
    assignedIds,
    onAssign,
    onUnassign,
    emptyAssignedLabel = 'اسحب مادة لإضافتها',
}: CourseSelectorProps) => {
    const groups: DnDGroup[] | undefined = allSections?.map((s) => ({
        key: s.id,
        label: s.name,
    }));

    return (
    <DualPanelDnD
        items={allCourses}
        assignedIds={assignedIds}
        onAssign={onAssign}
        onUnassign={onUnassign}
        getSearchText={(c) => `${c.name} ${c.course_code}`}
        searchPlaceholder="ابحث بالاسم أو رمز المادة..."
        getGroupKey={groups ? (c) => c.section_id ?? null : undefined}
        groups={groups}
        ungroupedLabel="غير مصنف"
        availableLabel="المتاحة"
        assignedLabel="المُضافة"
        emptyAvailableLabel="جميع المواد مُضافة"
        emptyAssignedLabel={emptyAssignedLabel}
        renderItem={(course, props) => (
            <div
                key={course.id}
                draggable
                onDragStart={props.onDragStart}
                onDragEnd={props.onDragEnd}
                className={`flex cursor-grab items-center gap-2 rounded-lg border px-3 py-2 text-xs select-none active:cursor-grabbing ${
                    props.isDragging
                        ? 'opacity-40'
                        : props.isAssigned
                          ? 'border-primary-200 bg-primary-50 text-primary-700'
                          : 'border-border bg-surface text-text hover:border-primary-300'
                }`}
            >
                <BookMarked className="h-3.5 w-3.5 shrink-0 text-accent-cyan" />
                <span className="min-w-0 flex-1 truncate font-medium">
                    {course.name}
                </span>
                <code className="shrink-0 rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px] text-text-subtle">
                    {course.course_code}
                </code>
                {props.isAssigned ? (
                    <button
                        type="button"
                        onClick={props.onUnassign}
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded font-bold text-danger transition hover:bg-rose-50"
                    >
                        <X className="h-3 w-3" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={props.onAssign}
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded font-bold text-accent-cyan transition hover:bg-cyan-50"
                    >
                        <Plus className="h-3 w-3" />
                    </button>
                )}
            </div>
        )}
    />
    );
};

export default CourseSelector;
