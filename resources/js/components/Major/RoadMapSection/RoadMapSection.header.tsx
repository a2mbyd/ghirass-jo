import Badge from '@/components/ui/Badge';
import { Network } from 'lucide-react';

const RoadMapSectionHeader = () => {
    return (
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <Badge
                text="الخريطة الدراسية"
                icon={
                    <Network
                        className="h-3.5 w-3.5 text-primary-600"
                        strokeWidth={2.5}
                    />
                }
            />
            <h2 className="major-hero-font m-0 text-2xl font-extrabold tracking-tight text-text md:text-3xl">
                خريطة التخصص
            </h2>
            <p className="m-0 max-w-md text-sm leading-relaxed text-text-muted">
                استعرض مسار تخصصك كصورة أو كمخطط تفاعلي
            </p>
        </div>
    );
};

export default RoadMapSectionHeader;
