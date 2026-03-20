import { Download } from 'lucide-react';
import type { Major } from "@/shared/types/index";

interface DownloadImageButtonProps {
    major: Major;
}

const DownloadImageButton = ({ major }: DownloadImageButtonProps) => {
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
