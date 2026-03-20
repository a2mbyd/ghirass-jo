import { Major } from '@/types';
import MajorCard from './MajorCard';

interface MajorsSectionProps {
    majors: Major[];
}
const MajorsSection = ({ majors }: MajorsSectionProps) => {
    return (
        <section dir="rtl" className="px-4 py-14" id="majors">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-10 flex flex-col items-center gap-3 text-center">
                    <h2 className="m-0 text-3xl font-extrabold tracking-tight text-text md:text-4xl">
                        اختر تخصصك
                    </h2>
                    <p className="m-0 max-w-md text-sm leading-relaxed text-text-muted">
                        تصفح خطط المقررات لجميع تخصصات كلية تكنولوجيا المعلومات
                    </p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {majors.map((major) => (
                        <MajorCard key={major.slug} major={major} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MajorsSection;
