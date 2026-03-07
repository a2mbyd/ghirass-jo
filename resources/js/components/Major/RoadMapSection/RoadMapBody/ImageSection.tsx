import React from 'react';
import { motion } from 'framer-motion';
import { Major } from '@/types';
import { ImageIcon } from 'lucide-react';

const ImageSection = ({ major }: { major: Major }) => {
    if (major.roadmap_image)
        return (
            <motion.img
                key="roadmap-image"
                src={major.roadmap_image}
                alt={`خريطة تخصص ${major.name}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-auto max-h-[980px] w-full object-contain"
            />
        );
    else
        return (
            <motion.div
                key="roadmap-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-3 py-20 text-center"
            >
                <ImageIcon className="h-12 w-12 text-text-muted" />
                <p className="text-sm text-text-muted">
                    لا توجد صورة خريطة متاحة لهذا التخصص
                </p>
            </motion.div>
        );
};

export default ImageSection;
