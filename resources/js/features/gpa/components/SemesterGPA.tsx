import React from 'react';

interface SemesterGPAProps {
    gpa: number;
    totalCredits: number;
}
const SemesterGPA = ({ gpa, totalCredits }: SemesterGPAProps) => {
    return (
        <div className="md:flex-1">
            <div className="bg-linaer-to-br flex h-full flex-col justify-center rounded-2xl border border-border from-primary-50 to-accent-violet/10 p-6 text-center">
                <p className="text-sm font-medium text-text-muted">
                    معدلك الفصلي
                </p>
                <p className="mt-2 font-display text-5xl font-bold text-primary-600">
                    {gpa.toFixed(2)}
                </p>
                <p className="mt-1 text-sm text-text-muted">
                    {totalCredits} ساعة معتمدة
                </p>
            </div>
        </div>
    );
};

export default SemesterGPA;
