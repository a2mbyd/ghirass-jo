'use client';

import { Handle, Position, type NodeProps } from 'reactflow';
import type { CourseNodeData } from './GraphSection.types';
import { NODE_W, NODE_H } from './GraphSection.constants';
import { useThemeStore } from '@/store/theme.store';

export function CourseNode({ data }: NodeProps<CourseNodeData>) {
    const { course, colors, semester, highlighted, dimmed, completed } = data;
    const isDark = useThemeStore((s) => s.darkMode);

    const dimmedBg = isDark ? '#1E293B' : '#F8FAFC';
    const dimmedBorder = isDark ? '#334155' : '#E2E8F0';
    const normalBg = isDark
        ? `linear-gradient(135deg, ${colors.bg}22 0%, ${colors.bg}11 100%)`
        : `linear-gradient(135deg, ${colors.light} 0%, #ffffff 100%)`;

    return (
        <div
            style={{
                width: NODE_W,
                minHeight: NODE_H,
                borderRadius: 16,
                border: `2.5px solid ${dimmed ? dimmedBorder : colors.bg}`,
                background: completed
                    ? `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg}cc 100%)`
                    : dimmed
                      ? dimmedBg
                      : normalBg,
                boxShadow: highlighted
                    ? `0 0 0 4px ${colors.bg}44, 0 8px 28px ${colors.bg}33`
                    : dimmed
                      ? 'none'
                      : '0 2px 10px rgba(0,0,0,0.08)',
                opacity: dimmed ? 0.28 : 1,
                transition: 'all 0.18s ease',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 12px 10px',
                boxSizing: 'border-box',
            }}
        >
            <Handle
                type="target"
                position={Position.Top}
                style={{
                    background: colors.bg,
                    width: 9,
                    height: 9,
                    border: '2px solid white',
                    top: -5,
                }}
            />

            {/* Semester badge — hidden for isolated/elective side-column courses */}
            {semester !== null && (
                <div
                    style={{
                        position: 'absolute',
                        top: -12,
                        right: -6,
                        background: colors.bg,
                        color: 'white',
                        fontSize: 9,
                        fontWeight: 800,
                        borderRadius: 20,
                        padding: '1px 7px',
                        letterSpacing: '0.05em',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        fontFamily: 'monospace',
                    }}
                >
                    S{semester}
                </div>
            )}

            {/* Lab badge */}
            {course.is_lab && (
                <div
                    style={{
                        position: 'absolute',
                        top: -12,
                        left: -6,
                        background: '#475569',
                        color: 'white',
                        fontSize: 9,
                        fontWeight: 800,
                        borderRadius: 20,
                        padding: '1px 7px',
                    }}
                >
                    LAB
                </div>
            )}

            {/* Completed tick */}
            {completed && (
                <div
                    style={{
                        position: 'absolute',
                        top: 6,
                        left: 10,
                        fontSize: 14,
                        color: 'white',
                    }}
                >
                    ✓
                </div>
            )}

            {/* Course name */}
            <div
                style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: completed ? 'white' : isDark ? colors.bg : colors.text,
                    textAlign: 'center',
                    lineHeight: 1.5,
                    direction: 'rtl',
                    fontFamily: "'Cairo','Tajawal',sans-serif",
                    wordBreak: 'break-word',
                }}
            >
                {course.name}
            </div>

            {/* Code + credits */}
            {(course.course_code || course.creditHours) && (
                <div
                    style={{
                        fontSize: 10,
                        marginTop: 5,
                        color: completed
                            ? 'rgba(255,255,255,0.75)'
                            : isDark
                              ? '#64748B'
                              : '#94A3B8',
                        fontFamily: 'monospace',
                        fontWeight: 600,
                    }}
                >
                    {course.course_code ?? ''}
                    {course.course_code && course.creditHours ? ' · ' : ''}
                    {course.creditHours ? `${course.creditHours}cr` : ''}
                </div>
            )}

            <Handle
                type="source"
                position={Position.Bottom}
                style={{
                    background: colors.bg,
                    width: 9,
                    height: 9,
                    border: '2px solid white',
                    bottom: -5,
                }}
            />
        </div>
    );
}
