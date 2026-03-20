import HeroSection from '@/features/home/sections/HeroSection/HeroSection';
import MajorsSection from '@/features/home/sections/MajorsSection/MajorsSection/MajorsSection';
import QuickLinksSection from '@/features/home/sections/QuickLinksSection/QuickLinksSection/QuickLinksSection';
import type { Major } from '@/shared/types/index';

export default function Home({ majors }: { majors: Major[] }) {
    return (
        <div>
            <HeroSection majors={majors} />
            <QuickLinksSection />
            <MajorsSection majors={majors} />
        </div>
    );
}
