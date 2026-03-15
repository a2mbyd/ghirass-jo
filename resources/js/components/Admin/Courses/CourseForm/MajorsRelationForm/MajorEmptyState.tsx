import { GraduationCap } from 'lucide-react';

export function MajorEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt py-12">
            <GraduationCap className="h-9 w-9 text-text-subtle" />
            <p className="mt-2 text-sm text-text-subtle">
                لا توجد تخصصات مرتبطة بهذه المادة بعد
            </p>
        </div>
    );
}
