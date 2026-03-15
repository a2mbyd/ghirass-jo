import { BookMarked } from 'lucide-react';

interface EmptyStateSearchProps {
    search: string;
    setSearch: (search: string) => void;
}
const EmptyStateSearch = ({ search, setSearch }: EmptyStateSearchProps) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface py-20 shadow-(--shadow-soft)">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt">
                <BookMarked className="h-8 w-8 text-text-subtle" />
            </div>
            <p className="mt-4 font-semibold text-text">
                لا توجد مواد تطابق بحثك
            </p>
            {search && (
                <button
                    onClick={() => setSearch('')}
                    className="mt-3 text-xs font-medium text-primary-500 hover:underline"
                >
                    مسح الفلتر
                </button>
            )}
        </div>
    );
};

export default EmptyStateSearch;
