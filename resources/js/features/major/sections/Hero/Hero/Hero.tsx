import { motion } from 'framer-motion';
import { BookMarked } from 'lucide-react';
import { createElement } from 'react';
import { getMajorAccentColor } from "@/shared/lib/MajorAccentColorMap";
import { getMajorIcon } from "@/shared/lib/MajorIconMap";
import { slideUp } from "@/shared/motion/index";
import type { Course, Major, Section } from "@/shared/types/index";
import Badge from "@/shared/ui/Badge";
import HeroStatsCards from './Hero.StatsCards';

interface HeroProps {
    allCourses: Course[];
    major: Major;
    sections: Section[];
}
const Hero = ({ major, allCourses, sections }: HeroProps) => {
    const majorAccentColor = getMajorAccentColor(major.slug);

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
                        {createElement(getMajorIcon(major.slug), { className: 'h-8 w-8' })}
                    </motion.div>

                    {/* Badge */}
                    <Badge
                        text=" تخصص"
                        icon={
                            <BookMarked className="h-4 w-4 text-primary-500" />
                        }
                    />
                    {/* Title */}
                    <motion.h1
                        initial={slideUp.initial}
                        animate={slideUp.animate}
                        transition={{ ...slideUp.transition, delay: 0.18 }}
                        className="major-hero-font mt-4 text-3xl leading-tight font-extrabold tracking-tight text-text md:text-4xl"
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
                <HeroStatsCards allCourses={allCourses} sections={sections} />
            </div>
        </section>
    );
};

export default Hero;
