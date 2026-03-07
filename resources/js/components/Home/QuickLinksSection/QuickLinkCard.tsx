import { Link } from '@inertiajs/react';
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { QuickLinkConfig } from './types';

const QuickLinkCard = ({ link }: { link: QuickLinkConfig }) => {
    const Icon = link.icon;
    return (
        <Link
            key={link.href}
            href={link.href}
            className={`card-hover animate-fade-in-up opacity-0 ${link.delay} group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-md`}
        >
            <div
                className={`mb-4 inline-flex rounded-xl bg-linear-to-br ${link.gradient} p-3`}
            >
                <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-2 font-display font-semibold text-text group-hover:text-primary-600">
                {link.label}
            </h3>
            <p className="mb-4 text-sm text-text-muted">{link.description}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                استكشف
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </span>
        </Link>
    );
};

export default QuickLinkCard;
