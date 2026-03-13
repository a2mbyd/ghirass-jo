'use client';

import { Handle, Position, type NodeProps } from 'reactflow';
import type { CourseNodeData } from '../GraphSection.types';
import { useThemeStore } from '@/store/theme.store';
import {
    CLASSES,
    getContainerClassName,
    getContainerStyle,
    getBackgroundStyle,
    getCourseNameColor,
    getCodeCreditsClassName,
} from './CourseNode.styles';

export function CourseNode({ data }: NodeProps<CourseNodeData>) {
    const {
        course,
        colors,
        semester,
        highlighted = false,
        dimmed = false,
        completed = false,
    } = data;
    const isDark = useThemeStore((s) => s.darkMode);

    return (
        <div
            className={getContainerClassName(dimmed, highlighted)}
            style={getContainerStyle({
                colors,
                isDark,
                dimmed,
                highlighted,
                completed,
            })}
        >
            <Handle
                type="target"
                position={Position.Top}
                className={`${CLASSES.handle} -top-[5px]`}
                style={getBackgroundStyle(colors.bg)}
            />

            <Handle
                type="source"
                position={Position.Bottom}
                className={`${CLASSES.handle} -bottom-[5px]`}
                style={getBackgroundStyle(colors.bg)}
            />

            {semester !== null && (
                <div
                    className={CLASSES.semesterBadge}
                    style={getBackgroundStyle(colors.bg)}
                >
                    S{semester}
                </div>
            )}

            {course.is_lab && <div className={CLASSES.labBadge}>LAB</div>}

            {completed && <div className={CLASSES.completedTick}>✓</div>}

            <div
                dir="rtl"
                className={CLASSES.courseName}
                style={{ color: getCourseNameColor(completed, isDark, colors) }}
            >
                {course.name}
            </div>

            {(course.course_code || course.credit_hours) && (
                <div className={getCodeCreditsClassName(completed, isDark)}>
                    {course.course_code ?? ''}
                    {course.course_code && course.credit_hours ? ' · ' : ''}
                    {course.credit_hours ? `${course.credit_hours}cr` : ''}
                </div>
            )}
        </div>
    );
}
