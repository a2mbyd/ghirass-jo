import React from 'react';

interface TextAreaInputProps {
    id?: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    required?: boolean;
    rows?: number;
    className?: string;
}

const TextAreaInput = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    rows = 4,
    className,
}: TextAreaInputProps) => {
    return (
        <div className={`space-y-1.5 ${className ?? ''}`}>
            <label className="block text-sm font-medium text-text" htmlFor={id}>
                {label}
                {required && <span className="mr-1 text-danger">*</span>}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                rows={rows}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text placeholder-text-subtle shadow-(--shadow-soft) transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
            {error && <p className="text-xs text-danger">{error}</p>}
        </div>
    );
};

export default TextAreaInput;
