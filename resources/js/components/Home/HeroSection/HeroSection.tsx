import LeftPanel from './LeftPanel';
import TextColumn from './TextColumn';

export default function HeroSection() {
    return (
        <section
            dir="rtl"
            className="body-font relative overflow-hidden rounded-2xl bg-background shadow-sm shadow-border/80 "
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

            <div className="relative grid min-h-[500px] lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">
                {/* ── Text column ── */}
                <TextColumn />

                {/* ── Visual panel ── */}
                <LeftPanel />
            </div>
        </section>
    );
}
