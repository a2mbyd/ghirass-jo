import { ImageIcon, Upload, User, X } from 'lucide-react';
import React, { DragEvent, useRef, useState } from 'react';

interface FileInputProps {
    label?: string;
    preview?: string | null;
    file?: File | null;
    onFileChange: (file: File) => void;
    onRemove?: () => void;
    accept?: string;
    hint?: string;
    error?: string;
    variant?: 'dropzone' | 'avatar';
}

const FileInput = ({
    label,
    preview,
    file,
    onFileChange,
    onRemove,
    accept = 'image/*',
    hint = 'PNG, JPG, WEBP — حتى 4 ميغابايت',
    error,
    variant = 'dropzone',
}: FileInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) {
            onFileChange(dropped);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            onFileChange(selected);
        }
    };

    if (variant === 'avatar') {
        return (
            <div className="flex items-center gap-6">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-border bg-surface-alt">
                    {preview ? (
                        <img
                            src={preview}
                            alt="avatar"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <User className="h-10 w-10 text-text-subtle" />
                        </div>
                    )}
                </div>
                <div className="flex-1 space-y-2">
                    {hint && <p className="text-sm text-text-muted">{hint}</p>}
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-text-muted transition hover:border-primary-500 hover:text-primary-500"
                    >
                        {label ?? 'اختيار صورة'}
                    </button>
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        className="hidden"
                        onChange={handleChange}
                    />
                    {error && <p className="text-xs text-danger">{error}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Drop Zone */}
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition ${
                    isDragging
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-border bg-surface-alt hover:border-primary-400 hover:bg-primary-50/50'
                }`}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                    <Upload className="h-6 w-6 text-primary-500" />
                </div>
                <div>
                    <p className="text-sm font-medium text-text">
                        {label ?? 'اسحب الصورة هنا أو انقر للرفع'}
                    </p>
                    {hint && (
                        <p className="mt-1 text-xs text-text-muted">{hint}</p>
                    )}
                </div>
                {file && (
                    <p className="text-xs font-medium text-primary-500">
                        {file.name}
                    </p>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={handleChange}
                />
            </div>

            {/* Preview */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-medium tracking-wider text-text uppercase">
                    المعاينة
                </p>
                {preview ? (
                    <div className="group relative overflow-hidden rounded-xl border border-border">
                        <img
                            src={preview}
                            alt="preview"
                            className="h-full w-full object-contain"
                        />
                        {onRemove && (
                            <button
                                type="button"
                                onClick={onRemove}
                                className="absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface/80 text-text-muted opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:text-danger"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt">
                        <div className="flex flex-col items-center gap-2 text-text-subtle">
                            <ImageIcon className="h-8 w-8" />
                            <p className="text-xs">لا توجد صورة</p>
                        </div>
                    </div>
                )}
                {error && <p className="text-xs text-danger">{error}</p>}
            </div>
        </div>
    );
};

export default FileInput;
