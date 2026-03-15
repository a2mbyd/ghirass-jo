import React from 'react';
import { Major } from '@/types/major';
import { Link } from '@inertiajs/react';
import AdminMajorController from '@/actions/App/Http/Controllers/AdminMajorController';
import { Pencil, Trash2, GraduationCap } from 'lucide-react';

interface MajorsRowProps {
    major: Major;
    index: number;
    setShowDeleteAssertionModal: (slug: string) => void;
}

const MajorsRow = ({
    major,
    index,
    setShowDeleteAssertionModal,
}: MajorsRowProps) => {
    return (
        <tr
            key={major.id}
            className="group transition-colors hover:bg-surface-alt"
        >
            <td className="px-5 py-4 text-text-subtle">{index + 1}</td>
            <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                        <GraduationCap className="h-4 w-4 text-primary-500" />
                    </div>
                    <span className="font-medium text-text">{major.name}</span>
                </div>
            </td>
            <td className="px-5 py-4">
                <code className="rounded-md bg-surface-alt px-2 py-1 font-mono text-xs text-text-muted">
                    {major.slug}
                </code>
            </td>
            <td className="max-w-xs px-5 py-4">
                <p className="truncate text-text-muted">
                    {major.description || '—'}
                </p>
            </td>
            <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                    <Link
                        href={AdminMajorController.edit.url(major.slug)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent-amber hover:text-accent-amber"
                        title="تعديل"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </Link>
                    <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-accent-rose hover:text-accent-rose"
                        title="حذف"
                        onClick={() => setShowDeleteAssertionModal(major.slug)}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default MajorsRow;
