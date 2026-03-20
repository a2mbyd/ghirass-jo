import React from 'react';

type NumberInputVariant = 'default' | 'stepper';

interface NumberInputProps {
    id?: string;
    label: string;
    value: number | string;
    onChange: (value: string) => void;
    variant?: NumberInputVariant;
    placeholder?: string;
    error?: string;
    required?: boolean;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
}

const inputBaseClass =
    'w-full rounded-xl border border-border bg-background shadow-(--shadow-soft) transition focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20';

const inputFieldClass =
    'bg-transparent text-sm text-text outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

const NumberInput = ({
    id,
    label,
    value,
    onChange,
    variant = 'default',
    placeholder,
    error,
    required = false,
    min,
    max,
    step = 1,
    className,
}: NumberInputProps) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;

    const handleDecrement = () => {
        const next = numericValue - step;
        if (min === undefined || next >= min) onChange(String(next));
    };

    const handleIncrement = () => {
        const next = numericValue + step;
        if (max === undefined || next <= max) onChange(String(next));
    };

    const isDecrementDisabled = min !== undefined && numericValue <= min;
    const isIncrementDisabled = max !== undefined && numericValue >= max;

    return (
        <div className={`space-y-1.5 ${className ?? ''}`}>
            <label className="block text-sm font-medium text-text" htmlFor={id}>
                {label}
                {required && <span className="mr-1 text-danger">*</span>}
            </label>

            {variant === 'default' ? (
                <input
                    id={id}
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    min={min}
                    max={max}
                    step={step}
                    className={`${inputBaseClass} ${inputFieldClass} px-4 py-2.5 placeholder-text-subtle focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20`}
                />
            ) : (
                <div className={`flex items-center overflow-hidden ${inputBaseClass}`}>
                    <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={isDecrementDisabled}
                        aria-label="Decrease value"
                        className="flex items-center justify-center w-10 h-full px-3 py-2.5 text-lg font-light text-text-subtle hover:text-text hover:bg-border/30 active:bg-border/50 transition disabled:opacity-30 disabled:cursor-not-allowed select-none shrink-0"
                    >
                        −
                    </button>
                    <input
                        id={id}
                        type="number"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        required={required}
                        min={min}
                        max={max}
                        step={step}
                        className={`flex-1 px-2 py-2.5 text-center ${inputFieldClass}`}
                    />
                    <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={isIncrementDisabled}
                        aria-label="Increase value"
                        className="flex items-center justify-center w-10 h-full px-3 py-2.5 text-lg font-light text-text-subtle hover:text-text hover:bg-border/30 active:bg-border/50 transition disabled:opacity-30 disabled:cursor-not-allowed select-none shrink-0"
                    >
                        +
                    </button>
                </div>
            )}

            {error && <p className="text-xs text-danger">{error}</p>}
        </div>
    );
};

export default NumberInput;