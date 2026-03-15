import { LucideIcon, Plus } from 'lucide-react'
import { Link } from '@inertiajs/react'
import React from 'react'

interface IndexPageHeaderProps {
    title: string;
    subtitle: string;
    link: string;
    icon: LucideIcon;
    linkText: string;
}
const IndexPageHeader = ({ title, subtitle, link, linkText, icon: Icon }: IndexPageHeaderProps) => {
  return (
     <div className="animate-fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-accent-violet">
                    <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="font-display text-2xl font-bold text-text">
                        {title}
                    </h1>
                    <p className="text-sm text-text-muted">
                        {subtitle}
                    </p>
                </div>
            </div>

            <Link
                href={link}
                className="flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md"
            >
                <Plus className="h-4 w-4" />
                {linkText}
            </Link>
        </div>
  )
}

export default IndexPageHeader