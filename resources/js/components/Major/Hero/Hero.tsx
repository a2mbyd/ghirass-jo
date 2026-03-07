import { slideUp } from '@/motion';
import { BookOpen, Clock, GraduationCap, Layers } from 'lucide-react';
import { major } from '@/routes';
import { MAJOR_ACCENT_COLOR_MAP } from '@/lib/MajorAccentColorMap';
import { MAJOR_ICON_MAP } from '@/lib/MajorIconMap';
import { Course, Major, Section } from '@/types';
import { motion } from 'framer-motion';
import HeroBadge from './Hero.badage';
import HeroStatsCards from './Hero.StatsCards';

interface HeroProps {
    courses: Course[];
    major: Major;
    sections: Section[];
}
const Hero = ({ major, courses, sections }: HeroProps) => {
    const MajorIcon = MAJOR_ICON_MAP[major.slug] ?? GraduationCap;
    const majorAccentColor =
        MAJOR_ACCENT_COLOR_MAP[major.slug] ?? 'from-primary-500 to-violet-500';

    return (
        <section className="relative overflow-hidden rounded-2xl bg-background shadow-sm shadow-border/80">
            {/* dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-100"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)`,
                    backgroundSize: '28px 28px',
                }}
            />
            {/* blobs */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary-100 opacity-60 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-primary-100 opacity-40 blur-3xl" />

            <div className="relative flex flex-col items-center gap-8 px-8 py-10 md:px-12">
                {/* Icon + Title + Description — centered */}
                <div className="flex flex-col items-center text-center">
                    {/* Major icon */}
                    <motion.div
                        initial={slideUp.initial}
                        animate={slideUp.animate}
                        transition={{ ...slideUp.transition, delay: 0.05 }}
                        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${majorAccentColor} text-white shadow-lg`}
                    >
                        <MajorIcon className="h-8 w-8" />
                    </motion.div>

                    {/* Badge */}
                    <HeroBadge />

                    {/* Title */}
                    <motion.h1
                        initial={slideUp.initial}
                        animate={slideUp.animate}
                        transition={{ ...slideUp.transition, delay: 0.18 }}
                        className="major-hero-font m-0 text-3xl leading-tight font-extrabold tracking-tight text-text md:text-4xl"
                    >
                        {major.name}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={slideUp.initial}
                        animate={slideUp.animate}
                        transition={{ ...slideUp.transition, delay: 0.26 }}
                        className="m-0 mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted"
                    >
                        {major.description}
                    </motion.p>
                </div>

                {/* Stats row — full width, horizontal */}
                <HeroStatsCards courses={courses} sections={sections} />
            </div>
        </section>
    );
};

export default Hero;
