import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordIconPosition = 'left' | 'right';

interface PasswordInputProps {
    id?: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    required?: boolean;
    dir?: string;
    className?: string;
    iconPosition?: PasswordIconPosition;
}

const PasswordInput = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    dir,
    className,
    iconPosition = 'right',
}: PasswordInputProps) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className={`space-y-1.5 ${className ?? ''}`}>
            <label className="block text-sm font-medium text-text" htmlFor={id}>
                {label}
                {required && <span className="mr-1 text-danger">*</span>}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={visible ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    dir={dir}
                    className={`w-full rounded-xl border border-border bg-background py-2.5 text-sm text-text placeholder-text-subtle shadow-(--shadow-soft) transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
                        iconPosition === 'right' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                    }`}
                />
                <button
                    type="button"
                    onClick={() => setVisible((prev) => !prev)}
                    className={`absolute inset-y-0 flex items-center text-text-subtle hover:text-text focus:outline-none ${
                        iconPosition === 'right' ? 'right-3' : 'left-3'
                    }`}
                    aria-label={visible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                    {visible ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            </div>
            {error && <p className="text-xs text-danger">{error}</p>}
        </div>
    );
};

export default PasswordInput;

