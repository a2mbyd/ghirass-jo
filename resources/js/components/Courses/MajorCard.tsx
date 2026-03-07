import { MAJOR_ACCENT_COLOR_MAP } from '@/lib/MajorAccentColorMap';
import { MAJOR_ICON_MAP } from '@/lib/MajorIconMap';
import { BookOpen, GraduationCap, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { MajorWithCourses } from '@/types';

interface MajorCardProps {
    major: MajorWithCourses;
    isSelected: boolean;
    onClick: () => void;
}
const MajorCard = ({ major, isSelected, onClick }: MajorCardProps) => {
    const Icon = MAJOR_ICON_MAP[major.slug] ?? GraduationCap;
    const accentColor =
        MAJOR_ACCENT_COLOR_MAP[major.slug] ?? 'from-primary-500 to-violet-500';

    return (
        <motion.button
            type="button"
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex flex-col gap-3 rounded-2xl border-2 bg-surface p-5 text-right transition-all duration-200 ${
                isSelected
                    ? 'border-indigo-400 shadow-lg shadow-indigo-100/60'
                    : 'border-border shadow-sm hover:border-slate-300 hover:shadow-md'
            }`}
        >
            {isSelected && (
                <div className="absolute top-3 left-3 h-2.5 w-2.5 rounded-full bg-indigo-500" />
            )}

            <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br ${accentColor} text-white shadow-md`}
            >
                <Icon className="h-5.5 w-5.5" />
            </div>

            <h3 className="text-[13.5px] leading-snug font-extrabold text-text">
                {major.name}
            </h3>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-text-muted">
                <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-emerald-500" />
                    {major.required.length} إجباري
                </span>
                {major.elective.length > 0 && (
                    <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-500" />
                        {major.elective.length} اختياري
                    </span>
                )}
            </div>
        </motion.button>
    );
};

export default MajorCard;
