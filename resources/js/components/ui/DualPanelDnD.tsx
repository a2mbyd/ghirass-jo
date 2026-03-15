import { Plus, Search, X } from 'lucide-react';
import React, { DragEvent, useState } from 'react';

export interface DnDItemRenderProps {
    isDragging: boolean;
    isAssigned: boolean;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    onDragEnd: () => void;
    onAssign: () => void;
    onUnassign: () => void;
}

export interface DnDGroup {
    key: string | number;
    label: string;
}

interface DualPanelDnDProps<T extends { id: number }> {
    items: T[];
    assignedIds: number[];
    onAssign: (id: number) => void;
    onUnassign: (id: number) => void;
    onAssignAll?: (ids: number[]) => void;

    getSearchText: (item: T) => string;
    searchPlaceholder?: string;

    getGroupKey?: (item: T) => string | number | null | undefined;
    groups?: DnDGroup[];
    ungroupedLabel?: string;

    renderItem: (item: T, props: DnDItemRenderProps) => React.ReactNode;

    availableLabel?: string;
    assignedLabel?: string;
    emptyAvailableLabel?: string;
    emptyAssignedLabel?: string;
    emptySearchLabel?: string;

    error?: string;
    className?: string;
}

function DualPanelDnD<T extends { id: number }>({
    items,
    assignedIds,
    onAssign,
    onUnassign,
    onAssignAll,
    getSearchText,
    searchPlaceholder = 'ابحث...',
    getGroupKey,
    groups,
    ungroupedLabel = 'غير مصنف',
    renderItem,
    availableLabel = 'المتاحة',
    assignedLabel = 'المُضافة',
    emptyAvailableLabel = 'جميع العناصر مُضافة',
    emptyAssignedLabel = 'اسحب عنصراً لإضافته',
    emptySearchLabel = 'لا توجد نتائج',
    error,
    className,
}: DualPanelDnDProps<T>) {
    const [search, setSearch] = useState('');
    const [draggedId, setDraggedId] = useState<number | null>(null);
    const [dragOver, setDragOver] = useState<'available' | 'assigned' | null>(
        null,
    );

    const assignedSet = new Set(assignedIds);
    const q = search.toLowerCase();

    const matchesSearch = (item: T) =>
        !q || getSearchText(item).toLowerCase().includes(q);

    const available = items.filter(
        (i) => !assignedSet.has(i.id) && matchesSearch(i),
    );
    const assigned = items.filter(
        (i) => assignedSet.has(i.id) && matchesSearch(i),
    );

    const useGrouping = Boolean(getGroupKey && groups);

    type GroupMap = Map<
        string | number,
        { label: string; items: T[] }
    >;

    const buildGroupMap = (list: T[]): GroupMap => {
        const map: GroupMap = new Map();
        if (!getGroupKey || !groups) {
            return map;
        }
        for (const group of groups) {
            const grouped = list.filter((i) => getGroupKey(i) === group.key);
            if (grouped.length > 0) {
                map.set(group.key, { label: group.label, items: grouped });
            }
        }
        const ungrouped = list.filter(
            (i) => getGroupKey(i) == null,
        );
        if (ungrouped.length > 0) {
            map.set('__ungrouped__', {
                label: ungroupedLabel,
                items: ungrouped,
            });
        }
        return map;
    };

    const availableGrouped = useGrouping ? buildGroupMap(available) : null;
    const assignedGrouped = useGrouping ? buildGroupMap(assigned) : null;

    const makeItemProps = (item: T): DnDItemRenderProps => ({
        isDragging: draggedId === item.id,
        isAssigned: assignedSet.has(item.id),
        onDragStart: (e: DragEvent<HTMLDivElement>) => {
            setDraggedId(item.id);
            e.dataTransfer.effectAllowed = 'move';
        },
        onDragEnd: () => setDraggedId(null),
        onAssign: () => onAssign(item.id),
        onUnassign: () => onUnassign(item.id),
    });

    const handleDropAvailable = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedId !== null && assignedSet.has(draggedId)) {
            onUnassign(draggedId);
        }
        setDraggedId(null);
        setDragOver(null);
    };

    const handleDropAssigned = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedId !== null && !assignedSet.has(draggedId)) {
            onAssign(draggedId);
        }
        setDraggedId(null);
        setDragOver(null);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragOver(null);
        }
    };

    const renderGrouped = (
        groupMap: GroupMap,
        side: 'available' | 'assigned',
    ) =>
        Array.from(groupMap.entries()).map(([key, { label, items: groupItems }]) => (
            <div key={String(key)} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-text-muted">
                        {label}
                    </p>
                    {side === 'available' && onAssignAll && (
                        <button
                            type="button"
                            onClick={() =>
                                onAssignAll(groupItems.map((i) => i.id))
                            }
                            className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-accent-cyan transition hover:bg-cyan-50"
                        >
                            <Plus className="h-3 w-3" />
                            إضافة الكل
                        </button>
                    )}
                </div>
                <div className="space-y-1.5">
                    {groupItems.map((item) =>
                        renderItem(item, makeItemProps(item)),
                    )}
                </div>
            </div>
        ));

    const renderFlat = (list: T[]) =>
        list.map((item) => renderItem(item, makeItemProps(item)));

    const panelClass = (active: boolean, accent: 'cyan' | 'primary') =>
        `flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto rounded-xl border-2 border-dashed p-2.5 transition-colors duration-200 ${
            active
                ? accent === 'cyan'
                    ? 'border-accent-cyan bg-cyan-50/30'
                    : 'border-primary-500 bg-primary-50/30'
                : 'border-border bg-surface-alt'
        }`;

    return (
        <div className={`space-y-3 ${className ?? ''}`}>
            <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-text-subtle" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full rounded-xl border border-border bg-background py-2 pr-9 pl-8 text-sm text-text placeholder-text-subtle outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => setSearch('')}
                        className="absolute top-1/2 left-2 -translate-y-1/2 text-text-subtle hover:text-text"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>

            <div className="grid min-h-[400px] grid-cols-1 auto-rows-fr gap-3 md:grid-cols-2">
                {/* Available */}
                <div className="flex min-h-0 flex-col gap-1.5">
                    <p className="text-xs font-semibold tracking-wider text-text-subtle uppercase">
                        {availableLabel} ({available.length})
                    </p>
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'move';
                            setDragOver('available');
                        }}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDropAvailable}
                        className={panelClass(dragOver === 'available', 'cyan')}
                    >
                        {available.length === 0 ? (
                            <div className="flex h-full min-h-[180px] items-center justify-center">
                                <p className="text-xs text-text-subtle">
                                    {search
                                        ? emptySearchLabel
                                        : emptyAvailableLabel}
                                </p>
                            </div>
                        ) : availableGrouped ? (
                            <div className="space-y-3">
                                {renderGrouped(availableGrouped, 'available')}
                            </div>
                        ) : (
                            renderFlat(available)
                        )}
                    </div>
                </div>

                {/* Assigned */}
                <div className="flex min-h-0 flex-col gap-1.5">
                    <p className="text-xs font-semibold tracking-wider text-text-subtle uppercase">
                        {assignedLabel} ({assigned.length})
                    </p>
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'move';
                            setDragOver('assigned');
                        }}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDropAssigned}
                        className={panelClass(
                            dragOver === 'assigned',
                            'primary',
                        )}
                    >
                        {assigned.length === 0 ? (
                            <div className="flex h-full min-h-[180px] items-center justify-center">
                                <p className="text-xs text-text-subtle">
                                    {search
                                        ? emptySearchLabel
                                        : emptyAssignedLabel}
                                </p>
                            </div>
                        ) : assignedGrouped ? (
                            <div className="space-y-3">
                                {renderGrouped(assignedGrouped, 'assigned')}
                            </div>
                        ) : (
                            renderFlat(assigned)
                        )}
                    </div>
                </div>
            </div>

            {error && <p className="text-xs text-danger">{error}</p>}
        </div>
    );
}

export default DualPanelDnD;
