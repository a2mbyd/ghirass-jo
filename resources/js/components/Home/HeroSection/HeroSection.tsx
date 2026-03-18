import type { Major } from '@/types';
import MainVisual from './MainVisual';
import TextColumn from './TextColumn/TextColumn';

export default function HeroSection({ majors }: { majors: Major[] }) {
    return (
        <section
            dir="rtl"
            className="body-font relative overflow-hidden  bg-background shadow-sm shadow-border/80"
        >
            {/* Subtle dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-100"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)`,
                    backgroundSize: '28px 28px',
                }}
            />

            {/* Glow blobs */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary-100 opacity-70 blur-3xl" />
            <div className="pointer-events-none absolute right-1/3 -bottom-12 h-56 w-56 rounded-full bg-primary-100 opacity-70 blur-3xl" />

            <div className="relative flex min-h-[620px] flex-col">
                {/* Main visual first */}
                <MainVisual />

                {/* Supporting text below */}
                <div className="border-t border-border/70 bg-background/70">
                    <TextColumn majors={majors} />
                </div>
            </div>
        </section>
    );
}
