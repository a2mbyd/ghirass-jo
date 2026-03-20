import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectInputProps {
    id?: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    error?: string;
    required?: boolean;
    className?: string;
}

const SelectInput = ({
    id,
    label,
    value,
    onChange,
    options,
    placeholder,
    error,
    required = false,
    className,
}: SelectInputProps) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selected = options.find((o) => o.value === value);
    const displayLabel = selected?.label ?? placeholder ?? '';
    const hasValue = !!selected;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const pick = (val: string) => {
        onChange(val);
        setOpen(false);
    };

    return (
        <div className={`space-y-1.5 ${className ?? ''}`} ref={containerRef}>
            <label className="block text-sm font-medium text-text" htmlFor={id}>
                {label}
                {required && <span className="mr-1 text-danger">*</span>}
            </label>

            <div className="relative">
                <button
                    type="button"
                    id={id}
                    onClick={() => setOpen((o) => !o)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text shadow-(--shadow-soft) outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 flex items-center justify-between transition-all duration-200"
                >
                    <span className={hasValue ? 'text-text' : 'text-text-subtle'}>
                        {displayLabel}
                    </span>
                    <motion.svg
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-text-subtle shrink-0"
                    >
                        <path d="M4 6l4 4 4-4" />
                    </motion.svg>
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.ul
                            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            style={{ transformOrigin: 'top' }}
                            className="absolute z-50 mt-1.5 w-full rounded-xl border border-border bg-background shadow-(--shadow-soft) py-1 overflow-y-auto max-h-48 [scrollbar-width:thin] [scrollbar-color:var(--color-border)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border hover:[&::-webkit-scrollbar-thumb]:bg-primary-500/50"
                        >
                            {options.map((option) => {
                                const isSelected = option.value === value;
                                return (
                                    <motion.li
                                        key={option.value}
                                        onClick={() => pick(option.value)}
                                        whileHover={{ backgroundColor: 'var(--color-border)' }}
                                        transition={{ duration: 0.12 }}
                                        className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between ${
                                            isSelected ? 'text-primary-500 font-medium' : 'text-text'
                                        }`}
                                    >
                                        {option.label}
                                        {isSelected && (
                                            <motion.svg
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.15, ease: 'backOut' }}
                                                width="14"
                                                height="14"
                                                viewBox="0 0 14 14"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M2 7l3.5 3.5L12 3" />
                                            </motion.svg>
                                        )}
                                    </motion.li>
                                );
                            })}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="text-xs text-danger"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SelectInput;