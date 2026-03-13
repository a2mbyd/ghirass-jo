'use client';

import ReactFlow, {
    Background,
    BackgroundVariant,
    Controls,
    Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { GLOBAL_STYLES } from './GraphSection.styles';
import { CourseNode } from './CourseNode';
import { GraphSectionFullscreenButton } from './GraphSection.FullscreenButton';
import { GraphSectionFilterPanel } from './FilterPanel';
import { GraphSectionStatsPanel } from './StatsPanel';
import useInteractiveGraph from '@/hooks/useInteractiveGraph';
import { Course } from '@/types/course';
import { Section } from '@/types';
import { useThemeStore } from '@/store/theme.store';

const NODE_TYPES = { courseNode: CourseNode };

interface RoadmapGraphProps {
    sections: Section[];
    majorCourses: Course[];
    majorElectives: Course[];
    uniRequired: Course[];
    collegeRequired: Course[];
    uniElective: Course[];
}

export default function RoadmapGraph({
    sections,
    majorCourses,
    majorElectives,
    uniRequired,
    collegeRequired,
    uniElective,
}: RoadmapGraphProps) {
    const { darkMode: isDark } = useThemeStore();
    const {
        wrapperRef,
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onNodeClick,
        onNodeMouseEnter,
        onNodeMouseLeave,
        colorMap,
        usedSections,
        filterSec,
        setFilterSec,
        isFullscreen,
        toggleFullscreen,
        progress,
        completedHoursCount,
        totalCoursesCount,
    } = useInteractiveGraph({
        sections,
        majorCourses,
        majorElectives,
        uniRequired,
        collegeRequired,
        uniElective,
    });

    return (
        <div
            ref={wrapperRef}
            className={`relative min-h-[700px] w-full overflow-hidden bg-background ${isFullscreen ? 'h-full rounded-none border-none' : 'h-[85vh] rounded-2xl border border-border'}`}
        >
            <style>{GLOBAL_STYLES}</style>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                onNodeMouseEnter={onNodeMouseEnter}
                onNodeMouseLeave={onNodeMouseLeave}
                nodeTypes={NODE_TYPES}
                fitView
                fitViewOptions={{ padding: 0.12 }}
                minZoom={0.1}
                maxZoom={3}
                proOptions={{ hideAttribution: true }}
                preventScrolling
            >
                <Background
                    variant={'dots' as BackgroundVariant}
                    gap={24}
                    size={1}
                    color={isDark ? '#111827' : '#F3F4F6'}
                />
                <Controls />
                <Panel position="top-left">
                    <GraphSectionFullscreenButton
                        isFullscreen={isFullscreen}
                        onToggle={toggleFullscreen}
                    />
                </Panel>

                <Panel position="top-right">
                    <GraphSectionFilterPanel
                        sections={usedSections}
                        colorMap={colorMap}
                        filterSec={filterSec}
                        onFilterChange={setFilterSec}
                    />
                </Panel>

                <Panel position="bottom-right">
                    <GraphSectionStatsPanel
                        totalCourses={totalCoursesCount}
                        completedHoursCount={completedHoursCount}
                        progress={progress}
                    />
                </Panel>
            </ReactFlow>
        </div>
    );
}
