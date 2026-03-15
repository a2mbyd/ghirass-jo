import CourseChip from '@/components/ui/Admin/EditPage.CourseChip';
import DualPanelDnD, { DnDGroup } from '@/components/ui/DualPanelDnD';
import { AdminCourse } from '@/types/admin/major';
import { Section } from '@/types/section';
import React from 'react';

interface MajorCoursesDnDProps {
    allCourses: AdminCourse[];
    allSections: Section[];
    assignedIds: number[];
    onAssign: (id: number) => void;
    onUnassign: (id: number) => void;
    onAssignAll: (ids: number[]) => void;
    error?: string;
}

const MajorCoursesDnD = ({
    allCourses,
    allSections,
    assignedIds,
    onAssign,
    onUnassign,
    onAssignAll,
    error,
}: MajorCoursesDnDProps) => {
    const groups: DnDGroup[] = allSections.map((s) => ({
        key: s.id,
        label: s.name,
    }));

    return (
        <DualPanelDnD
            items={allCourses}
            assignedIds={assignedIds}
            onAssign={onAssign}
            onUnassign={onUnassign}
            onAssignAll={onAssignAll}
            getSearchText={(c) => `${c.name} ${c.course_code}`}
            searchPlaceholder="ابحث بالاسم أو رمز المادة..."
            getGroupKey={(c) => c.section_id}
            groups={groups}
            ungroupedLabel="غير مصنف"
            availableLabel="المتاحة"
            assignedLabel="المُعيَّنة"
            emptyAvailableLabel="جميع المقررات مُعيَّنة"
            emptyAssignedLabel="اسحب مقرراً لإضافته"
            renderItem={(course, props) => (
                <CourseChip
                    key={course.id}
                    course={course}
                    onDragStart={props.onDragStart}
                    onAction={props.isAssigned ? props.onUnassign : props.onAssign}
                    actionLabel={props.isAssigned ? '×' : '+'}
                    actionClass={
                        props.isAssigned
                            ? 'text-danger hover:bg-rose-50'
                            : 'text-accent-cyan hover:bg-cyan-50'
                    }
                    isDragging={props.isDragging}
                    assigned={props.isAssigned}
                />
            )}
            error={error}
            className="p-6"
        />
    );
};

export default MajorCoursesDnD;
