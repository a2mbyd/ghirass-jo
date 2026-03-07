import { ImageIcon, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

interface RoadMapSectionToggleButtonsProps {
    roadmapView: 'image' | 'graph';
    setRoadmapView: React.Dispatch<React.SetStateAction<'image' | 'graph'>>;
}
const RoadMapSectionToggleButtons = ({
    roadmapView,
    setRoadmapView,
}: RoadMapSectionToggleButtonsProps) => {
    return (
        <div className="mb-6 hidden justify-center sm:flex">
            <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
                <motion.button
                    onClick={() => setRoadmapView('image')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold ${
                        roadmapView === 'image'
                            ? 'border border-primary-100 bg-surface text-primary-600 shadow-[0_2px_12px_rgba(25,111,194,0.25)]'
                            : 'text-text-muted hover:text-text'
                    }`}
                >
                    <ImageIcon className="h-4 w-4" />
                    صورة
                </motion.button>
                <motion.button
                    onClick={() => setRoadmapView('graph')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold ${
                        roadmapView === 'graph'
                            ? 'border border-primary-100 bg-surface text-primary-600 shadow-[0_2px_12px_rgba(25,111,194,0.25)]'
                            : 'text-text-muted hover:text-text'
                    }`}
                >
                    <Network className="h-4 w-4" />
                    مخطط تفاعلي
                </motion.button>
            </div>
        </div>
    );
};

export default RoadMapSectionToggleButtons;
