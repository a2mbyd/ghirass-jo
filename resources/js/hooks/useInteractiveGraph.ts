import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useNodesState, useEdgesState, type Node } from 'reactflow';

import type {
    CourseNodeData,
    ColorScheme,
    Course,
    Section,
} from '@/components/Major/RoadMapSection/RoadMapBody/GraphSection/GraphSection.types';
import { PALETTE } from '@/components/Major/RoadMapSection/RoadMapBody/GraphSection/GraphSection.colors';
import {
    buildNodes,
    buildEdges,
} from '@/components/Major/RoadMapSection/RoadMapBody/GraphSection/GraphSection.helpers';
import {
    UNI_ELECTIVES,
    MAJOR_ELECTIVES,
} from '@/components/Major/RoadMapSection/RoadMapBody/GraphSection/GraphSection.constants';

interface RoadmapGraphProps {
    sections: Section[];
    allCourses: Course[];
}
const useInteractiveGraph = ({ sections, allCourses }: RoadmapGraphProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [filterSec, setFilterSec] = useState<number | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const allSections = sections;

    // ── colour map: section id → palette colour ─────────────────────────────
    const colorMap = useMemo<Record<number, ColorScheme>>(
        () =>
            Object.fromEntries(
                allSections.map((section, index) => [
                    section.id,
                    PALETTE[index % PALETTE.length],
                ]),
            ),
        [allSections],
    );

    // ── initial nodes / edges ────────────────────────────────────────────────
    const initNodes = useMemo(
        () => buildNodes(allCourses, colorMap),
        [allCourses, colorMap],
    );
    const initEdges = useMemo(() => buildEdges(allCourses), [allCourses]);

    const [nodes, setNodes, onNodesChange] =
        useNodesState<CourseNodeData>(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

    // ── ancestor / descendant walk for hover chain ───────────────────────────
    const { anc, desc } = useMemo<{
        anc: Set<number>;
        desc: Set<number>;
    }>(() => {
        if (!hoveredId) return { anc: new Set(), desc: new Set() };

        const anc: Set<number> = new Set();
        const desc: Set<number> = new Set();
        const map = Object.fromEntries(allCourses.map((c) => [c.id, c]));

        const up = (id: number) =>
            map[id]?.prerequisites?.forEach((p) => {
                anc.add(p);
                up(p);
            });
        const down = (id: number) =>
            allCourses.forEach((c) => {
                if (c.prerequisites?.includes(id)) {
                    desc.add(c.id);
                    down(c.id);
                }
            });

        up(parseInt(hoveredId));
        down(parseInt(hoveredId));
        return { anc, desc };
    }, [hoveredId, allCourses]);

    // ── sync highlight / dim / completed into node & edge data ──────────────
    useEffect(() => {
        const hid = hoveredId ? parseInt(hoveredId) : null;

        setNodes((ns) =>
            ns.map((n) => {
                const cid = parseInt(n.id);
                const isHov = cid === hid;
                const isRelated = anc.has(cid) || desc.has(cid);
                const inFilter =
                    filterSec === null || n.data.course.sectionId === filterSec;
                return {
                    ...n,
                    data: {
                        ...n.data,
                        highlighted: isHov || (hid !== null && isRelated),
                        dimmed:
                            !inFilter || (hid !== null && !isHov && !isRelated),
                        completed: completedIds.has(cid),
                    },
                };
            }),
        );

        setEdges((es) =>
            es.map((e) => {
                const s = parseInt(e.source);
                const t = parseInt(e.target);
                const chain =
                    hid !== null &&
                    (s === hid ||
                        t === hid ||
                        (anc.has(s) && (t === hid || anc.has(t))) ||
                        (s === hid && desc.has(t)) ||
                        (desc.has(s) && desc.has(t)));

                const inFilter =
                    filterSec === null ||
                    allCourses.find((c) => c.id === s)?.sectionId ===
                        filterSec ||
                    allCourses.find((c) => c.id === t)?.sectionId === filterSec;

                return {
                    ...e,
                    animated: chain,
                    style: {
                        ...e.style,
                        stroke: chain ? '#6366F1' : '#94A3B8',
                        strokeWidth: chain ? 3 : 1.8,
                        opacity:
                            (hid !== null && !chain) || !inFilter ? 0.1 : 1,
                    },
                    markerEnd: {
                        ...(e.markerEnd as any),
                        color: chain ? '#6366F1' : '#94A3B8',
                    },
                };
            }),
        );
    }, [hoveredId, filterSec, completedIds, anc, desc]);

    // ── toggle completed on node click ───────────────────────────────────────
    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        const cid = parseInt(node.id);
        setCompletedIds((prev) => {
            const next = new Set(prev);
            next.has(cid) ? next.delete(cid) : next.add(cid);
            return next;
        });
    }, []);

    // ── native fullscreen ────────────────────────────────────────────────────
    const toggleFullscreen = useCallback(async () => {
        if (!document.fullscreenElement) {
            await wrapperRef.current?.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    // ── scroll trap ──────────────────────────────────────────────────────────
    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const trap = (e: WheelEvent) => e.stopPropagation();
        el.addEventListener('wheel', trap, { passive: false });
        return () => el.removeEventListener('wheel', trap);
    }, []);

    // ── derived values ───────────────────────────────────────────────────────
    const usedSections = useMemo(
        () =>
            allSections.filter((s) =>
                allCourses.some((c) => c.sectionId === s.id),
            ),
        [allSections, allCourses],
    );

    // ── progress ─────────────────────────────────────────────────────────────
    const progress = allCourses.length
        ? Math.round((completedIds.size / allCourses.length) * 100)
        : 0;

    const completedHoursCount = Array.from(completedIds).reduce(
        (sum, completedId) => {
            const hours =
                allCourses.find((course) => course.id === completedId)
                    ?.credit_hours || 0;
            return hours + sum;
        },
        0,
    );

    return {
        wrapperRef,
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onNodeClick,
        onNodeMouseEnter: (_: React.MouseEvent, n: Node) => setHoveredId(n.id),
        onNodeMouseLeave: () => setHoveredId(null),
        colorMap,
        usedSections,
        filterSec,
        setFilterSec,
        isFullscreen,
        toggleFullscreen,
        progress,
        completedHoursCount,
        totalCoursesCount: allCourses.length,
    };
};

export default useInteractiveGraph;
