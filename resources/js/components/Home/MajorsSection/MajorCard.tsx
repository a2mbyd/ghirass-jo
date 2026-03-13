import { Major } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { getMajorAccentColor } from '@/lib/MajorAccentColorMap';
import { getMajorIcon } from '@/lib/MajorIconMap';

const MajorCard = ({ major }: { major: Major }) => {
    const Icon = getMajorIcon(major.slug);
    const accentColor =
        getMajorAccentColor(major.slug);

    return (
        <Link
            key={major.slug}
            href={`/majors/${major.slug.toLocaleLowerCase()}`}
            className="group card relative flex h-full cursor-pointer flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_26px_rgba(25,111,194,0.45)] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
        >
            <div
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r ${accentColor} text-white shadow-[0_0_18px_rgba(25,111,194,0.45)]`}
            >
                <Icon className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-center text-base font-extrabold text-text md:text-lg">
                {major.name}
            </h3>
            <p className="grow text-center text-sm leading-relaxed text-text-muted">
                {major.description}
            </p>
            <div className="mt-4 flex justify-center">
                <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br ${accentColor} text-white`}
                >
                    <ChevronLeft className="h-4 w-4" />
                </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-primary-500 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
        </Link>
    );
};

export default MajorCard;
