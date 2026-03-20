import { Link } from '@inertiajs/react'
import { ArrowRight, GraduationCap, LucideIcon } from 'lucide-react';
import React from 'react'

interface FormHeaderProps {
    title: string;
    subtitle: string;
    backLink: string;
    icon?: LucideIcon;
}
const FormHeader = ({ title, subtitle, backLink, icon: Icon = GraduationCap }: FormHeaderProps) => {
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
                        <p className="text-sm text-text-muted">{subtitle}</p>
                    </div>
                </div>
                <Link
                    href={backLink}
                    className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-muted shadow-(--shadow-soft) transition hover:border-primary-500 hover:text-primary-500"
                >
                    <ArrowRight className="h-4 w-4" />
                    العودة للقائمة
                </Link>
        </div>
  )
}

export default FormHeader