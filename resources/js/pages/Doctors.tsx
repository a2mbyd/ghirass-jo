import { useEffect, useState, useMemo } from 'react';
import PageHeader from '@/components/PageHeader';
import DoctorCard from '@/components/DoctorCard';

interface Doctor {
    id: string;
    name: string;
    email: string;
    department: string;
    subjects: string[];
}

export default function Doctors() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('/data/doctors.json')
            .then((res) => res.json())
            .then((data: Doctor[]) => {
                setDoctors(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredDoctors = useMemo(() => {
        if (!search.trim()) return doctors;
        const q = search.toLowerCase();
        return doctors.filter(
            (d) =>
                d.name.toLowerCase().includes(q) ||
                d.email.toLowerCase().includes(q) ||
                d.department.toLowerCase().includes(q) ||
                d.subjects.some((s) => s.toLowerCase().includes(q)),
        );
    }, [doctors, search]);

    return (
        <div className="container mx-auto max-w-3xl px-4 py-12">
            <PageHeader
                title="البريد الإلكتروني للأساتذة"
                subtitle="ابحث عن معلومات التواصل مع أعضاء الهيئة التدريسية"
            />

            {!loading && doctors.length > 0 && (
                <div className="mb-8">
                    <input
                        type="search"
                        placeholder="ابحث بالاسم، البريد، القسم، أو المادة..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text placeholder:text-text-subtle focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                </div>
            )}

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-32 animate-pulse rounded-2xl bg-surface-alt"
                        />
                    ))}
                </div>
            ) : filteredDoctors.length === 0 ? (
                <p className="rounded-xl border border-border bg-surface p-8 text-center text-text-muted">
                    {search ? 'لا توجد نتائج تطابق بحثك.' : 'لا يوجد أساتذة.'}
                </p>
            ) : (
                <div className="space-y-4">
                    {filteredDoctors.map((doctor, index) => (
                        <DoctorCard
                            key={doctor.id}
                            name={doctor.name}
                            email={doctor.email}
                            department={doctor.department}
                            subjects={doctor.subjects}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
