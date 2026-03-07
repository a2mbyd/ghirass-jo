import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Download, Image as ImageIcon, Network } from 'lucide-react';
import { fadeIn } from '@/motion';
import { Course, Major, Section } from '@/types';
import RoadMapSectionHeader from './RoadMapSection.header';
import RoadMapSectionToggleButtons from './RoadMapSection.toggleButtons';
import DownloadImageButton from './DownloadImageButton';
import { RoadmapView } from './RoadMapSection.types';
import ImageSection from './RoadMapBody/ImageSection';
import GraphSection from './RoadMapBody/GraphSection/GraphSection';

interface RoadMapSectionProps {
    major: Major;
    sections: Section[];
    courses: Course[];
}
const RoadMapSection = ({ major, sections, courses }: RoadMapSectionProps) => {
    const [roadmapView, setRoadmapView] = useState<RoadmapView>('image');

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
            <DownloadImageButton major={major} roadmapView={roadmapView} />

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
                        /* ── Graph View Placeholder ── */
                        <GraphSection
                            sections={sections}
                            courses={courses}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default RoadMapSection;
