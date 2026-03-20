import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import React from 'react';
import { getImageUrl } from "@/shared/lib/utils";
import type { Major } from "@/shared/types/index";

const ImageSection = ({ major }: { major: Major }) => {
    if (major.roadmap_image)
        return (
            <motion.img
                key="roadmap-image"
                src={getImageUrl(major.roadmap_image) as string}
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
