import { MarkerType, type Node, type Edge } from 'reactflow';
import type { Course } from './GraphSection.types';
import type { ColorScheme } from './GraphSection.types';
import type { CourseNodeData } from './GraphSection.types';
import { PALETTE } from './GraphSection.colors';
import { NODE_W, NODE_H, H_GAP, V_GAP } from './GraphSection.constants';

/**
 * @param courses        - All courses (all groups already merged with virtual sectionIds)
 * @param colorMap       - Section id → colour scheme (includes virtual section IDs)
 * @param sideSectionIds - Section IDs that are always placed in side columns
 *                         regardless of prerequisite relationships.
 *                         Defaults to major_elective (-4), uni_required (-1), uni_elective (-2).
 */
export function buildNodes(
    courses: Course[],
    colorMap: Record<number, ColorScheme>,
    sideSectionIds: Set<number> = new Set([-4, -1, -2]),
): Node<CourseNodeData>[] {
    // ── Split forced-side courses from body courses ───────────────────────────
    const forcedSide = courses.filter((c) =>
        sideSectionIds.has(c.sectionId ?? NaN),
    );
    const bodyCourses = courses.filter(
        (c) => !sideSectionIds.has(c.sectionId ?? NaN),
    );

    // ── Isolated detection (within body only) ────────────────────────────────
    const referencedAsPrereq = new Set<number>();
    bodyCourses.forEach((c) => {
        (c.prerequisites ?? []).forEach((pid) => referencedAsPrereq.add(pid));
    });

    const isolated = bodyCourses.filter(
        (c) =>
            (c.prerequisites ?? []).length === 0 &&
            !referencedAsPrereq.has(c.id),
    );
    const isolatedIds = new Set(isolated.map((c) => c.id));
    const mainCourses = bodyCourses.filter((c) => !isolatedIds.has(c.id));

    // ── Main graph: depth-based rows ─────────────────────────────────────────
    const cache: Record<number, number> = {};
    const rows: Record<number, Course[]> = {};
    mainCourses.forEach((c) => {
        const d = getDepth(c.id, mainCourses, cache);
        (rows[d] = rows[d] || []).push(c);
    });

    const depths = Object.keys(rows)
        .map(Number)
        .sort((a, b) => a - b);
    const maxDepth = depths.length > 0 ? Math.max(...depths) : 0;
    const totalMainHeight = (maxDepth + 1) * NODE_H + maxDepth * V_GAP;

    const mainNodes = depths.flatMap((depth) => {
        const row = rows[depth];
        const rowWidth = row.length * NODE_W + (row.length - 1) * H_GAP;
        const startX = -rowWidth / 2;
        const y = depth * (NODE_H + V_GAP);
        return row.map((course, i) => ({
            id: String(course.id),
            type: 'courseNode',
            position: { x: startX + i * (NODE_W + H_GAP), y },
            data: {
                course,
                colors: colorMap[course.sectionId ?? -1] ?? PALETTE[0],
                semester: depth + 1,
            },
        }));
    });

    // ── Side columns: isolated courses flanking the main graph ───────────────
    const maxRowWidth = depths.reduce((max, d) => {
        const row = rows[d];
        return Math.max(max, row.length * NODE_W + (row.length - 1) * H_GAP);
    }, 0);

    const SIDE_OFFSET = H_GAP * 3;
    const rightX = maxRowWidth / 2 + SIDE_OFFSET;
    const leftX = -(maxRowWidth / 2 + SIDE_OFFSET + NODE_W);

    // Group side courses (forced + body-isolated) by section
    const allSideCourses = [...forcedSide, ...isolated];
    const sectionGroups = new Map<number, Course[]>();
    allSideCourses.forEach((c) => {
        const key = c.sectionId ?? -1;
        if (!sectionGroups.has(key)) {
            sectionGroups.set(key, []);
        }
        sectionGroups.get(key)!.push(c);
    });

    const groupEntries = [...sectionGroups.entries()].sort(([a], [b]) => a - b);
    const mid = Math.ceil(groupEntries.length / 2);
    const leftGroups = groupEntries.slice(0, mid).map(([, g]) => g);
    const rightGroups = groupEntries.slice(mid).map(([, g]) => g);

    const SIDE_V_GAP = 30;
    const GROUP_GAP = 50;

    const calcHeight = (groups: Course[][]) =>
        groups.reduce(
            (h, g, i) =>
                h +
                g.length * (NODE_H + SIDE_V_GAP) +
                (i < groups.length - 1 ? GROUP_GAP : 0),
            0,
        );

    const sideNodes: Node<CourseNodeData>[] = [];

    const placeSide = (groups: Course[][], x: number) => {
        const sideHeight = calcHeight(groups);
        let y = (totalMainHeight - sideHeight) / 2;
        groups.forEach((group, gi) => {
            group.forEach((course) => {
                sideNodes.push({
                    id: String(course.id),
                    type: 'courseNode',
                    position: { x, y },
                    data: {
                        course,
                        colors: colorMap[course.sectionId ?? -1] ?? PALETTE[0],
                        semester: null,
                    },
                });
                y += NODE_H + SIDE_V_GAP;
            });
            if (gi < groups.length - 1) {
                y += GROUP_GAP;
            }
        });
    };

    placeSide(leftGroups, leftX);
    placeSide(rightGroups, rightX);

    return [...mainNodes, ...sideNodes];
}

export function buildEdges(courses: Course[]): Edge[] {
    const edges: Edge[] = [];
    courses.forEach((c) => {
        (c.prerequisites ?? []).forEach((pid) =>
            edges.push({
                id: `pre-${pid}-${c.id}`,
                source: String(pid),
                target: String(c.id),
                type: 'smoothstep',
                style: { stroke: '#94A3B8', strokeWidth: 1.8 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: '#94A3B8',
                    width: 14,
                    height: 14,
                },
            }),
        );
    });
    return edges;
}

/**
 * @param id - The id of the course
 * @param courses - All courses
 * @param cache - The cache of the courses
 * @returns The depth of the course
 */
function getDepth(
    id: number,
    courses: Course[],
    cache: Record<number, number>,
): number {
    if (cache[id] !== undefined) return cache[id];
    const c = courses.find((x) => x.id === id);
    if (!c || !c.prerequisites?.length) {
        cache[id] = 0;
        return 0;
    }
    cache[id] =
        Math.max(...c.prerequisites.map((p) => getDepth(p, courses, cache))) +
        1;
    return cache[id];
}
