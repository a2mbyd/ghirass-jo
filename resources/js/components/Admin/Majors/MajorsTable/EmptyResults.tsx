import { GraduationCap } from 'lucide-react';

interface EmptyResultsProps {
    search: string;
    setSearch: (search: string) => void;
}
const EmptyResults = ({ search, setSearch }: EmptyResultsProps) => {
    return (
        <tr>
            <td colSpan={5} className="px-5 py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt">
                        <GraduationCap className="h-7 w-7 text-text-subtle" />
                    </div>
                    <p className="font-semibold text-text">لا توجد تخصصات</p>
                    <p className="text-sm text-text-muted">
                        {search
                            ? 'لم يتطابق أي تخصص مع بحثك'
                            : 'ابدأ بإضافة تخصص جديد'}
                    </p>
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="mt-1 text-xs font-medium text-primary-500 hover:underline"
                        >
                            مسح الفلتر
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default EmptyResults;
