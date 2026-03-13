import { useMemo, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import SectionCard from '@/components/Doctors/SectionCard';
import { Doctor } from '@/types/doctors';

interface DoctorsProps {
    doctorsBySection: Record<string, Doctor[]>;
}

export default function Doctors({ doctorsBySection }: DoctorsProps) {
    const [search, setSearch] = useState('');
    const allDoctors = Object.values(doctorsBySection).flat();

    const filteredSections = useMemo(() => {
        if (!search.trim()) return doctorsBySection;

        const q = search.toLowerCase();
        const filtered: Record<string, Doctor[]> = {};

        for (const [section, doctors] of Object.entries(doctorsBySection)) {
            const matched = doctors.filter(
                (d) =>
                    d.name.toLowerCase().includes(q) ||
                    d.email.toLowerCase().includes(q) ||
                    d?.section?.includes(q) ||
                    (d.department || '').toLowerCase().includes(q),
            );
            if (matched.length > 0) {
                filtered[section] = matched;
            }
        }

        return filtered;
    }, [doctorsBySection, search]);

    const sectionEntries = Object.entries(filteredSections);
    const hasResults = sectionEntries.length > 0;

    return (
        <div className="container mx-auto max-w-5xl px-4 py-12">
            <PageHeader
                title="البريد الإلكتروني للدكاترة"
                subtitle="ابحث عن معلومات التواصل مع أعضاء الهيئة التدريسية"
            />

            {allDoctors.length > 0 && (
                <div className="mb-8">
                    <input
                        type="search"
                        placeholder="ابحث بالاسم، البريد، القسم، أو المادة..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text placeholder:text-text-subtle focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                    />
                </div>
            )}

            {!hasResults ? (
                <p className="rounded-xl border border-border bg-surface p-8 text-center text-text-muted">
                    {search ? 'لا توجد نتائج تطابق بحثك.' : 'لا يوجد أساتذة.'}
                </p>
            ) : (
                <div className="columns-1 gap-4 sm:columns-2">
                    {sectionEntries.map(([sectionName, doctors], index) => (
                        <SectionCard
                            key={`${sectionName}-${index}`}
                            sectionName={sectionName}
                            doctors={doctors}
                            defaultOpen={index === 0}
                            colorIndex={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
