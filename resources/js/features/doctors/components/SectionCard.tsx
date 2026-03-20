import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Users } from 'lucide-react';
import { useState } from 'react';
import DoctorCard from "@/features/doctors/components/DoctorCard";
import type { Doctor } from "@/features/doctors/types/doctors";
import { accentPalette } from './SectionCard.config';

interface SectionCardProps {
    sectionName: string;
    doctors: Doctor[];
    defaultOpen?: boolean;
    colorIndex?: number;
}

const SectionCard = ({
    sectionName,
    doctors,
    defaultOpen = false,
    colorIndex = 0,
}: SectionCardProps) => {
    const [open, setOpen] = useState(defaultOpen);
    const accent = accentPalette[colorIndex % accentPalette.length];

    return (
        <div
            className={`mb-4 inline-block w-full break-inside-avoid overflow-hidden rounded-2xl border bg-surface shadow-sm shadow-border/60 transition-shadow hover:shadow-md ${accent.border}`}
        >
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-right transition-colors hover:bg-surface-alt/60"
            >
                <div className="flex items-center gap-3">
                    <div
                        className={`relative flex h-10 w-10 items-center justify-center rounded-xl ${accent.iconBg}`}
                    >
                        <Users className={`h-5 w-5 ${accent.iconText}`} />
                        {open && (
                            <span
                                className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full ${accent.dot} ring-2 ring-surface`}
                            />
                        )}
                    </div>

                    <div className="text-right">
                        <span className="block text-[15px] font-bold text-text">
                            {sectionName || 'غير مصنّف'}
                        </span>
                        <span className="block text-xs text-text-subtle">
                            {open ? 'اضغط للإخفاء' : 'اضغط للعرض'}
                        </span>
                    </div>

                    <span
                        className={`rounded-full bg-primary-500/10 px-2.5 py-0.5 text-[11px] font-bold text-primary-500`}
                    >
                        {doctors.length} دكتور
                    </span>
                </div>

                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                    <ChevronDown className="h-5 w-5 text-text-subtle" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="doctors-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-border-subtle px-6 py-5">
                            {doctors.length === 0 ? (
                                <p className="py-4 text-center text-sm text-text-muted">
                                    لا يوجد دكاترة في هذا القسم.
                                </p>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {doctors.map((doctor, index) => (
                                        <DoctorCard
                                            doctor={doctor}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SectionCard;
