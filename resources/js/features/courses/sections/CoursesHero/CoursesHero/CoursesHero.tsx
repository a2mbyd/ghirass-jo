import { motion } from 'framer-motion';
import { BookMarked } from 'lucide-react';
import type { Course} from "@/features/courses/types/course";
import { slideUp } from "@/shared/motion/animations";
import { getStats } from './CoursesHero.config';
import StatsCard from './CoursesHero.StatsCard';

interface CoursesHeroProps {
    totalCourses: number;
    uniRequired: Course[];
    uniElective: Course[];
    collegeRequired: Course[];
}

const CoursesHero = ({
    totalCourses,
    uniRequired,
    uniElective,
    collegeRequired,
}: CoursesHeroProps) => {
    const stats = getStats(
        totalCourses,
        uniRequired,
        uniElective,
        collegeRequired,
    );

    return (
        <section className="relative overflow-hidden rounded-2xl bg-surface shadow-sm shadow-border/80">
            <div
                className="pointer-events-none absolute inset-0 opacity-100"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)`,
                    backgroundSize: '28px 28px',
                }}
            />
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary-100 opacity-60 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-primary-100 opacity-40 blur-3xl" />

            <div className="relative flex flex-col items-center gap-6 px-8 py-10 md:px-12">
                <motion.div
                    initial={slideUp.initial}
                    animate={slideUp.animate}
                    transition={{ ...slideUp.transition, delay: 0.05 }}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-blue-500 text-white shadow-lg"
                >
                    <BookMarked className="h-8 w-8" />
                </motion.div>

                <motion.div
                    initial={slideUp.initial}
                    animate={slideUp.animate}
                    transition={{ ...slideUp.transition, delay: 0.15 }}
                    className="flex flex-col items-center gap-2 text-center"
                >
                    <h1 className="text-3xl font-extrabold tracking-tight text-text md:text-4xl">
                        المقررات الدراسية
                    </h1>
                    <p className="max-w-xl text-[15px] leading-relaxed text-text-muted">
                        استعراض شامل لجميع المقررات الدراسية مرتبةً حسب نوعها
                        ومتطلباتها
                    </p>
                </motion.div>

                {/* Stats strip */}
                <motion.div
                    initial={slideUp.initial}
                    animate={slideUp.animate}
                    transition={{ ...slideUp.transition, delay: 0.25 }}
                    className="grid w-full max-w-2xl grid-cols-4 gap-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface-alt md:grid-cols-4 md:divide-x md:divide-y-0 md:divide-x-reverse"
                >
                    {stats.map((stat) => (
                        <StatsCard
                            key={stat.label}
                            label={stat.label}
                            value={stat.value}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CoursesHero;
