import { Link } from '@inertiajs/react';
import { ChevronLeft, Loader2 } from 'lucide-react';
import React from 'react'

interface ActionsProps {
    cancelLink: string;
    submitText: string;
    processing: boolean;
}
const Actions = ({ cancelLink, submitText, processing }: ActionsProps) => {
  return (
     <div className="animate-fade-in-up stagger-5 flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-6 py-4 shadow-(--shadow-soft)">
        <Link
            href={cancelLink}
            className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-text-muted transition hover:border-text-subtle hover:text-text"
        >
            <ChevronLeft  className="h-4 w-4" />
            إلغاء
        </Link>
        <button
            type="submit"
            disabled={processing}
            className="flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600 hover:shadow-md disabled:opacity-60"
        >
            {processing && (
                <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {submitText}
        </button>   
    </div>
  )
}

export default Actions