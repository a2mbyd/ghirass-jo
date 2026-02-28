import { useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import SubjectCard from '@/components/SubjectCard';

interface Subject {
    id: string;
    title: string;
    description: string;
    url: string;
    icon?: string;
}

export default function ITSubjects() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/subjects.json')
            .then((res) => res.json())
            .then((data: Subject[]) => {
                setSubjects(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="container mx-auto max-w-6xl px-4 py-12">
            <PageHeader
                title="مواد تكنولوجيا المعلومات"
                subtitle="تصفح روابط جميع مواد تكنولوجيا المعلومات والموارد الدراسية"
            />

            {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-48 animate-pulse rounded-2xl bg-surface-alt"
                        />
                    ))}
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((subject, index) => (
                        <SubjectCard
                            key={subject.id}
                            title={subject.title}
                            description={subject.description}
                            url={subject.url}
                            icon={subject.icon}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
