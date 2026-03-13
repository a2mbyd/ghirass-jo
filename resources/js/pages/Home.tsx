import HeroSection from '@/components/Home/HeroSection/HeroSection';
import MajorsSection from '@/components/Home/MajorsSection/MajorsSection';
import QuickLinksSection from '@/components/Home/QuickLinksSection/QuickLinksSection';
import { Major } from '@/types';

export default function Home({ majors }: { majors: Major[] }) {
    return (
        <div>
            <HeroSection majors={majors} />
            <QuickLinksSection />
            <MajorsSection majors={majors} />
        </div>
    );
}

