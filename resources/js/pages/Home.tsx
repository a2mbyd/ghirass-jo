import HeroSection from '@/components/Home/HeroSection';
import MajorsSection from '@/components/Home/MajorsSection';
import QuickLinksSection from '@/components/Home/QuickLinksSection';

export default function Home() {
    return (
        <div>
            <HeroSection />
            <QuickLinksSection />
            <MajorsSection />
        </div>
    );
}
