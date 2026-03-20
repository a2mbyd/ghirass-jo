import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Brain, Building2, GraduationCap, Star } from 'lucide-react';
import CollapsibleSection from "@/features/courses/components/CollapsibleSection";
import MajorCard from "@/features/courses/components/MajorCard";
import useCourses from "@/features/courses/hooks/useCourses";
import CoursesHero from "@/features/courses/sections/CoursesHero/CoursesHero/index";
import MajorPanel from "@/features/courses/sections/MajorPanel/MajorPanel/MajorPanel";
import type { Course, MajorWithCourses } from "@/shared/types/index";
import SectionDivider from "@/shared/ui/SectionDivider";

interface CoursesProps {
    majors: MajorWithCourses[];
    uniRequired: Course[];
    uniElective: Course[];
    collegeRequired: Course[];
    remedialCourses: Course[];
}

export default function Courses({
    majors,
    uniRequired,
    uniElective,
    collegeRequired,
    remedialCourses,
}: CoursesProps) {
    const {
        selectedMajorSlug,
        setSelectedMajorSlug,
        selectedMajor,
        totalCourses,
        handleMajorClick,
    } = useCourses(majors);

    const hasGlobalCourses =
        uniRequired.length > 0 ||
        uniElective.length > 0 ||
        collegeRequired.length > 0;
    
    return (
        <div dir="rtl" className="flex flex-col gap-8">
            {/* ── Hero ── */}
            <CoursesHero
                totalCourses={totalCourses}
                uniRequired={uniRequired}
                uniElective={uniElective}
                collegeRequired={collegeRequired}
            />

            {/* ── Global (uni + college) sections ── */}
            {hasGlobalCourses && (
                <section className="flex flex-col gap-4">
                    <SectionDivider
                        icon={GraduationCap}
                        label="متطلبات عامة"
                        iconClass="text-blue-500"
                    />

                    {uniRequired.length > 0 && (
                        <CollapsibleSection
                            title="اجباري جامعة"
                            icon={BookOpen}
                            courses={uniRequired}
                            sectionType="uni_required"
                            defaultOpen
                        />
                    )}

                    {uniElective.length > 0 && (
                        <CollapsibleSection
                            title="اختياري جامعة"
                            icon={Star}
                            courses={uniElective}
                            sectionType="uni_elective"
                        />
                    )}

                    {collegeRequired.length > 0 && (
                        <CollapsibleSection
                            title="اجباري كلية"
                            icon={Building2}
                            courses={collegeRequired}
                            sectionType="college_required"
                        />
                    )}

                    {remedialCourses.length > 0 && (
                        <CollapsibleSection
                            title="متطلبات استدراكية"
                            icon={Brain}
                            courses={remedialCourses}
                            sectionType="remedial_course"
                        />
                    )}
                </section>
            )}

            {/* ── Majors section ── */}
            {majors.length > 0 && (
                <section className="mb-4 flex flex-col gap-5">
                    <SectionDivider
                        icon={Star}
                        label="متطلبات التخصص"
                        iconClass="text-indigo-500"
                    />

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
