import { Plus, X } from 'lucide-react';
import type { ReactNode } from 'react';
import FormCard from "@/shared/ui/admin/form/FormCard";
import { RESOURCE_FORM_PALETTE } from '../CourseForm.constants';
import ExistingRow from './ExistingRow';
import type { ExistingItem } from './ExistingRow';
import PendingRow from './PendingRow';
import type { PendingItem } from './PendingRow';

interface ResourceCardFormProps {
    title: string;
    icon: ReactNode;
    countLabel: string;
    color: 'emerald' | 'rose' | 'amber';

    /** Existing (saved) items */
    existingItems: ExistingItem[];
    deletedIds: Set<string | number>;
    onToggleDelete: (id: number) => void;

    /** Pending (unsaved) items */
    pendingItems: PendingItem[];
    onRemovePending: (index: number) => void;

    /** Optional icon shown inside rows (omit for badge-style rows like PYQ) */
    rowIcon?: ReactNode;
    rowIconBg?: string;

    /** Add-form */
    isFormVisible: boolean;
    onToggleForm: () => void;
    addButtonLabel: string;
    formTitle: string;
    formContent: ReactNode;

    emptyIcon: ReactNode;
    emptyText: string;
}

export default function ResourceCardForm({
    title,
    icon,
    countLabel,
    color,
    existingItems,
    deletedIds,
    onToggleDelete,
    pendingItems,
    onRemovePending,
    rowIcon,
    rowIconBg,
    isFormVisible,
    onToggleForm,
    addButtonLabel,
    formTitle,
    formContent,
    emptyIcon,
    emptyText,
}: ResourceCardFormProps) {
    const palette = RESOURCE_FORM_PALETTE[color];
    const isEmpty = existingItems.length === 0 && pendingItems.length === 0;

    return (
        <FormCard title={title} icon={icon}>
            <div className="space-y-4 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-text-muted">
                        {countLabel}
                    </span>
                    <button
                        type="button"
                        onClick={onToggleForm}
                        className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                            isFormVisible
                                ? 'border-border bg-surface-alt text-text-muted hover:border-danger hover:text-danger'
                                : palette.button
                        }`}
                    >
                        {isFormVisible ? (
                            <>
                                <X className="h-3.5 w-3.5" />
                                إلغاء
                            </>
                        ) : (
                            <>
                                <Plus className="h-3.5 w-3.5" />
                                {addButtonLabel}
                            </>
                        )}
                    </button>
                </div>

                {/* Add form */}
                {isFormVisible && (
                    <div className={`rounded-xl border p-4 ${palette.wrapper}`}>
                        <p
                            className={`mb-3 text-sm font-semibold ${palette.title}`}
                        >
                            {formTitle}
                        </p>
                        {formContent}
                    </div>
                )}

                {/* Items list / empty state */}
                {isEmpty ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt py-12">
                        {emptyIcon}
                        <p className="mt-2 text-sm text-text-subtle">
                            {emptyText}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl border border-border">
                        <div className="divide-y divide-border">
                            {existingItems.map((item) => (
                                <ExistingRow
                                    key={item.id}
                                    item={item}
                                    isDeleted={deletedIds.has(item.id)}
                                    onToggleDelete={() =>
                                        onToggleDelete(Number(item.id))
                                    }
                                    icon={rowIcon}
                                    iconBg={rowIconBg}
                                />
                            ))}
                            {pendingItems.map((item, idx) => (
                                <PendingRow
                                    key={`pending-${idx}`}
                                    item={item}
                                    onRemove={() => onRemovePending(idx)}
                                    color={color}
                                    icon={rowIcon}
                                    iconBg={rowIconBg}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </FormCard>
    );
}
