import { Major } from '@/types';
import { Download } from 'lucide-react';
import React from 'react';
import { RoadmapView } from './RoadMapSection.types';

interface DownloadImageButtonProps {
    roadmapView: RoadmapView;
    major: Major;
}

const DownloadImageButton = ({
    roadmapView,
    major,
}: DownloadImageButtonProps) => {
    if (roadmapView === 'image' && major.roadmap_image)
        return (
            <div className="mb-4 flex justify-center">
                <a
                    href={major.roadmap_image}
                    download={`roadmap-${major.slug}.png`}
                    className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-xl border border-primary-200 bg-primary-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600"
                >
                    <Download className="h-4 w-4" />
                    تحميل الصورة
                </a>
            </div>
        );
};

export default DownloadImageButton;
