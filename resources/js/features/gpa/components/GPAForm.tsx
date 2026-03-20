import { Plus } from 'lucide-react';
import useGPA from "@/features/gpa/hooks/useGPA";
import CourseCard from './CourseCard';
import CumulativeGPA from './CumulativeGPA';
import SemesterGPA from './SemesterGPA';

export default function GPAForm() {
    const {
        courses,
        totalCredits,
        gpa,
        previousGpa,
        previousCredits,
        cumulativeGpa,
        cumulativeTotalCredits,
        addCourse,
        removeCourse,
        updateCourse,
        setPreviousGpa,
        setPreviousCredits,
    } = useGPA();

    return (
        <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-4">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        courses={courses}
                        updateCourse={updateCourse}
                        removeCourse={removeCourse}
                    />
                ))}
            </div>
            {totalCredits < 22 && (
                <button
                    type="button"
                    onClick={addCourse}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-3 text-sm font-medium text-text-muted transition-colors hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-600"
                >
                    <Plus className="h-4 w-4" />
                    إضافة مقرر
                </button>
            )}

            <div className="flex flex-col gap-4 md:flex-row">
                <SemesterGPA gpa={gpa} totalCredits={totalCredits} />

                <CumulativeGPA
                    previousGpa={previousGpa}
                    previousCredits={previousCredits}
                    cumulativeGpa={cumulativeGpa}
                    cumulativeTotalCredits={cumulativeTotalCredits}
                    setPreviousGpa={setPreviousGpa}
                    setPreviousCredits={setPreviousCredits}
                />
            </div>
        </div>
    );
}
