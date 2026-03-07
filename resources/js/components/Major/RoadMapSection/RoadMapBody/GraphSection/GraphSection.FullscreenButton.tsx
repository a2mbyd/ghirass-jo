'use client';

interface GraphSectionFullscreenButtonProps {
    isFullscreen: boolean;
    onToggle: () => void;
}

export function GraphSectionFullscreenButton({
    isFullscreen,
    onToggle,
}: GraphSectionFullscreenButtonProps) {
    return (
        <button
            onClick={onToggle}
            title={isFullscreen ? 'خروج من ملء الشاشة' : 'ملء الشاشة'}
            className="flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-border bg-surface px-3.5 py-2 font-[Cairo,sans-serif] text-lg font-semibold text-primary-500 shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
            dir="rtl"
        >
            {isFullscreen ? 'خروج' : 'ملء الشاشة'}
        </button>
    );
}
