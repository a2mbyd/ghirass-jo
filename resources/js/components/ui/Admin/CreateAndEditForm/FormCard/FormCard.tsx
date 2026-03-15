import React from 'react'
import FormCardHeader from './FormCardHeader';

interface FormCardProps {
    children: React.ReactNode;
    title: string;
    icon?: React.ReactNode;
    allowOverflow?: boolean;
}

const FormCard = ({
    children,
    title,
    icon,
    allowOverflow = false,
}: FormCardProps) => {
  return (
    <div
        className={`animate-fade-in-up stagger-1 rounded-2xl border border-border bg-surface shadow-(--shadow-soft) ${
            allowOverflow
                ? 'relative z-20 overflow-visible'
                : 'overflow-hidden'
        }`}
    >
        <FormCardHeader title={title} icon={icon} />
        {children}
    </div>
  )
}

export default FormCard