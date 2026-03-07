import CollapsibleSection from '@/components/Courses/CollapsibleSection';
import MajorPanel from '@/components/Courses/MajorPanel';
import CourseCard from '@/components/Courses/CourseCard';
import { slideUp } from '@/motion';
import { Course, MajorWithCourses } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import {
    BookMarked,
    BookOpen,
    Building2,
    GraduationCap,
    Star,
} from 'lucide-react';
import { useState } from 'react';
import useCourses from '@/hooks/useCourses';
import CoursesHero from '@/components/Courses/CoursesHero';
import MajorCard from '@/components/Courses/MajorCard';

interface CoursesProps {
    universityRequired: Course[];
    universityElective: Course[];
    collegeRequired: Course[];
    majors: MajorWithCourses[];
}

export default function Courses({
    universityRequired,
    universityElective,
    collegeRequired,
    majors,
}: CoursesProps) {
    const {
        selectedMajorSlug,
        setSelectedMajorSlug,
        selectedMajor,
        totalCourses,
        handleMajorClick,
    } = useCourses(
        majors,
        universityRequired,
        universityElective,
        collegeRequired,
    );

    return (
        <div dir="rtl" className="flex flex-col gap-8">
            {/* ── Hero ── */}
            <CoursesHero
                universityRequired={universityRequired}
                collegeRequired={collegeRequired}
                majors={majors}
                totalCourses={totalCourses}
            />

            {/* ── University Required — always visible, no toggle ── */}
            {collegeRequired.length > 0 && (
                <motion.section
                    initial={slideUp.initial}
                    animate={slideUp.animate}
                    transition={{ ...slideUp.transition, delay: 0.1 }}
                    className="rounded-2xl border border-blue-100 bg-surface px-8 py-7 shadow-sm shadow-border/60"
                >
                    <div className="mb-5 flex items-center justify-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
                            <Building2 className="h-4 w-4 text-blue-600" />
                        </div>
                        <h2 className="text-[15px] font-bold text-text">
                            أجباري كلية تكنولوجيا المعلومات
                        </h2>
                        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-nowrap text-blue-700">
                            {collegeRequired.length} مادة
                        </span>
                    </div>
                    <div className="xs:grid-col-2 grid gap-3 sm:grid-cols-3">
                        {collegeRequired.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </motion.section>
            )}

            {/* ── Collapsible: College Required ── */}
            {universityRequired.length > 0 && (
                <CollapsibleSection
                    title="متطلبات الجامعة"
                    icon={GraduationCap}
                    courses={universityRequired}
                    accentBg="bg-violet-50"
                    accentText="text-violet-600"
                    accentBorder="border-violet-100"
                    badgeBg="bg-violet-100"
                    badgeText="text-violet-700"
                />
            )}

            {/* ── Collapsible: University Elective ── */}
            {universityElective.length > 0 && (
                <CollapsibleSection
                    title="اختيارية الجامعة"
                    icon={BookOpen}
                    courses={universityElective}
                    accentBg="bg-rose-50"
                    accentText="text-rose-600"
                    accentBorder="border-rose-100"
                    badgeBg="bg-rose-100"
                    badgeText="text-rose-700"
                />
            )}

            {/* ── Majors Section ── */}
            {majors.length > 0 && (
                <section className="mb-4 flex flex-col gap-5">
                    {/* Divider label */}
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-border" />
                        <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 shadow-sm">
                            <Star className="h-3.5 w-3.5 text-indigo-500" />
                            <span className="text-[12px] font-bold text-text-muted">
                                متطلبات التخصصات
                            </span>
                        </div>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    {/* Major cards grid */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {majors.map((major) => (
                            <MajorCard
                                key={major.id}
                                major={major}
                                isSelected={selectedMajorSlug === major.slug}
                                onClick={() => handleMajorClick(major.slug)}
                            />
                        ))}
                    </div>

                    {/* Expanded major panel */}
                    <AnimatePresence mode="wait">
                        {selectedMajor && (
                            <motion.div
                                key={selectedMajor.slug}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 12 }}
                                transition={{
                                    duration: 0.35,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <MajorPanel
                                    major={selectedMajor}
                                    onClose={() => setSelectedMajorSlug(null)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            )}
        </div>
    );
}
