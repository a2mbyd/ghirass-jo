import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { fadeIn } from "@/shared/motion/index";
import type { Course, Major, Section } from "@/shared/types/index";
import DownloadImageButton from './DownloadImageButton';
import GraphSection from './RoadMapBody/GraphSection/GraphSection';
import ImageSection from './RoadMapBody/ImageSection';
import RoadMapSectionHeader from './RoadMapSection.header';
import RoadMapSectionToggleButtons from './RoadMapSection.toggleButtons';
import type { RoadmapView } from './RoadMapSection.types';
interface RoadMapSectionProps {
    major: Major;
    sections: Section[];
    allCourses: Course[];
}

const RoadMapSection = ({
    major,
    sections,
    allCourses,
}: RoadMapSectionProps) => {
    const [roadmapView, setRoadmapView] = useState<RoadmapView>('image');

    // Virtual section IDs must match useInteractiveGraph (college→-3, uni_required→-1, major_elective→-4, uni_elective→-2, remedial→-6)
    const extraSections: Section[] = [
        { id: -6, name: 'متطلبات استدراكية' },
        { id: -3, name: 'متطلبات الكلية' },
        { id: -1, name: 'متطلبات الجامعة الإلزامية' },
        { id: -4, name: 'اختياريات التخصص' },
        { id: -2, name: 'اختياريات الجامعة' },
    ];

    const newSections = [...sections, ...extraSections];

    return (
        <section className="rounded-2xl border border-border bg-surface px-8 py-10 shadow-sm shadow-slate-200/60">
            {/* Section Header */}
            <RoadMapSectionHeader />

            {/* Toggle tabs */}
            <RoadMapSectionToggleButtons
                roadmapView={roadmapView}
                setRoadmapView={setRoadmapView}
            />

            {/* Download button (image view only) */}
            {roadmapView === 'image' && major.roadmap_image && (
                <DownloadImageButton major={major} />
            )}

            {/* View area */}
            <motion.div
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={fadeIn.transition}
                className="overflow-hidden rounded-2xl border border-border bg-background"
            >
                <AnimatePresence mode="wait">
                    {roadmapView === 'image' ? (
                        <ImageSection major={major} />
                    ) : (
                        <GraphSection
                            sections={newSections}
                            allCourses={allCourses}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default RoadMapSection;
