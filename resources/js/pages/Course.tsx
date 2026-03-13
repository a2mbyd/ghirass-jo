import type { Course } from '@/types/course';
import useCourse from '@/hooks/useCourse';
import CourseHero from '@/components/Course/Course.CourseHero';
import Sidebar from '@/components/Course/Course.Sidebar';
import Content from '@/components/Course/Course.Content';

const Course = ({ course }: { course: Course | null }) => {
    const {
        activeTab,
        setActiveTab,
        files,
        course_code,
        videos,
        pastYearQuestions,
        is_lab,
        course_type,
        year,
        semester,
        credit_hours,
        counts,
    } = useCourse(course);

    if (!course) {
        return (
            <div
                className="flex min-h-screen items-center justify-center bg-background"
                dir="rtl"
            >
                <p className="text-text-muted">المادة غير موجودة</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background font-sans" dir="rtl">
            {/* ── Top gradient strip ─────────────────────────────────────────── */}
            <div className="h-1.5 w-full bg-linear-to-r from-primary-500 via-accent-cyan to-accent-pink" />

            {/* ── Hero header ────────────────────────────────────────────────── */}
            <CourseHero
                course_code={course_code ?? ''}
                is_lab={is_lab ?? false}
                course_type={course_type ?? ''}
                year={year ?? 1}
                semester={semester ?? 1}
                credit_hours={credit_hours ?? 3}
                name={course.name}
            />

            {/* ── Body: sidebar + content ────────────────────────────────────── */}
            <div className="mx-auto max-w-5xl gap-6 px-6 py-8 lg:flex lg:items-start">
                {/* ── Sidebar ───────────────────────────────────────────────── */}
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    files={files}
                    videos={videos}
                    counts={counts}
                />

                {/* ── Content panel ─────────────────────────────────────────── */}
                <div className="min-w-0 flex-1">
                    <Content
                        activeTab={activeTab}
                        files={files}
                        videos={videos}
                        pastYearQuestions={pastYearQuestions}
                    />
                </div>
            </div>
        </div>
    );
};

export default Course;
