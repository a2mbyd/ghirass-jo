import React from 'react';
import { YearConfig } from './CourseByYearSection.types';
import { BookOpen, Clock } from 'lucide-react';

interface CourseByYearSectionYearBlockHeaderProps {
    year: number;
    config: YearConfig;
    totalYearCourses: number;
    totalHours: number;
}
const CourseByYearSectionYearBlockHeader = ({
    year,
    config,
    totalYearCourses,
    totalHours,
}: CourseByYearSectionYearBlockHeaderProps) => {
    return (
        <div
            className={`flex items-center justify-between px-5 py-3.5 ${config.headerBg}`}
        >
            <div className="flex items-center gap-3">
                <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${config.badgeBg} text-xs font-bold text-white shadow-sm`}
                >
                    {year}
                </span>
                <span className={`text-[15px] font-bold text-white`}>
                    {config.label}
                </span>
            </div>
            <div
                className={`flex items-center gap-4 text-[12px] font-medium text-white opacity-90`}
            >
                <span className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" />
                    {totalYearCourses} مقرر
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {totalHours} ساعة
                </span>
            </div>
        </div>
    );
};

export default CourseByYearSectionYearBlockHeader;
