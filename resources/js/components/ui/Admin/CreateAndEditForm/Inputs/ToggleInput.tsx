import React from 'react';

interface ToggleInputProps {
    id?: string;
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
    onLabel: string;
    offLabel: string;
    onIcon?: React.ReactNode;
    offIcon?: React.ReactNode;
    error?: string;
    className?: string;
}

const ToggleInput = ({
    id,
    label,
    value,
    onChange,
    onLabel,
    offLabel,
    onIcon,
    offIcon,
    error,
    className,
}: ToggleInputProps) => {
    return (
        <div className={`space-y-1.5 ${className ?? ''}`}>
            <label className="block text-sm font-medium text-text" htmlFor={id}>
                {label}
            </label>
            <button
                type="button"
                id={id}
                onClick={() => onChange(!value)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-(--shadow-soft) transition ${
                    value
                        ? 'border-accent-cyan bg-primary-500 text-white'
                        : 'border-border bg-background text-text-muted hover:border-primary-300'
                }`}
            >
                <span
                    className={`relative flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ${
                        value ? 'bg-accent-cyan' : 'bg-border'
                    }`}
                >
                    <span
                        className={`absolute h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                            value ? '-translate-x-[19px]' : 'translate-x-0.5'
                        }`}
                    />
                </span>
                <span className="flex items-center gap-1.5">
                    {value ? (
                        <>
                            {onIcon}
                            {onLabel}
                        </>
                    ) : (
                        <>
                            {offIcon}
                            {offLabel}
                        </>
                    )}
                </span>
            </button>
            {error && <p className="text-xs text-danger">{error}</p>}
        </div>
    );
};

export default ToggleInput;
