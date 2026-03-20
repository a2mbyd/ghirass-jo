import { Course } from '@/types/course';
import { getByYear, isExcluded } from './CourseByYearSection.helpers';
import CourseByYearSectionHeader from './CourseByYearSection.header';
import CourseByYearSectionYearBlock from './CourseByYearSection.yearBlock';

interface CourseByYearSectionProps {
    courses: Course[];
}

const CourseByYearSection = ({ courses }: CourseByYearSectionProps) => {
    const filtered = courses.filter((c) => !isExcluded(c));

    const byYear = getByYear(filtered);

    const years = Object.keys(byYear)
        .map(Number)
        .sort((a, b) => a - b);

    return (
        <section className="rounded-2xl border border-border bg-surface px-8 py-10 shadow-sm shadow-slate-200/60">
            {/* ── Section header ── */}
            <CourseByYearSectionHeader filtered={filtered} years={years} />

            {/* ── Year blocks ── */}
            <div className="flex flex-col gap-5">
                {years.map((year, yearIdx) => (
                    <CourseByYearSectionYearBlock
                        key={year}
                        year={year}
                        yearIdx={yearIdx}
                        byYear={byYear}
                    />
                ))}
            </div>
        </section>
    );
};

export default CourseByYearSection;
