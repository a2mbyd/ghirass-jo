import { majors } from '@/data/majors';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

const MajorsSection = () => {
    return (
        <section dir="rtl" className="px-4 py-14" id="majors">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-10 flex flex-col items-center gap-3 text-center">
                    <h2 className="m-0 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                        اختر تخصصك
                    </h2>
                    <p className="m-0 max-w-md text-sm leading-relaxed text-slate-500">
                        تصفح خطط المقررات لجميع تخصصات كلية تكنولوجيا المعلومات
                    </p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {majors.map((major) => {
                        const Icon = major.Icon;
                        return (
                            <Link
                                key={major.slug}
                                href={`/majors/${major.slug.toLocaleLowerCase()}`}
                                className="group card relative flex h-full cursor-pointer flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_26px_rgba(25,111,194,0.45)] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                            >
                                <div
                                    className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r ${major.accent} text-white shadow-[0_0_18px_rgba(25,111,194,0.45)]`}
                                >
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-text-primary mb-3 text-center text-base font-extrabold md:text-lg">
                                    {major.label}
                                </h3>
                                <p className="grow text-center text-sm leading-relaxed text-text-muted">
                                    {major.description}
                                </p>
                                <div className="mt-4 flex justify-center">
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br ${major.accent} text-white`}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </div>
                                </div>
                                <div className="bg-accent-500 pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default MajorsSection;
