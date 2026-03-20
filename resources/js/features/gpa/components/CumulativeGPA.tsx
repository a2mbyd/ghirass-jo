import DirectedNumberInput from '@/shared/ui/gpa/DirectedNumberInput';
import IncrementalInput from '@/shared/ui/gpa/IncrementalInput';

const MAX_CREDITS = 300;
const MAX_GPA = 4.2;

interface CumulativeGPAProps {
    previousGpa: string;
    previousCredits: string;
    cumulativeGpa: number;
    cumulativeTotalCredits: number;
    setPreviousGpa: (value: string) => void;
    setPreviousCredits: (value: string) => void;
}
export default function CumulativeGPA({
    previousGpa,
    previousCredits,
    cumulativeGpa,
    cumulativeTotalCredits,
    setPreviousGpa,
    setPreviousCredits,
}: CumulativeGPAProps) {
    return (
        <div className="md:flex-1">
            <div className="flex h-full flex-col justify-between space-y-4 rounded-2xl border border-border bg-surface p-6">
                <div>
                    <p className="text-sm font-medium text-text-muted">
                        حساب المعدل التراكمي
                    </p>
                    <div className="mt-4 flex flex-wrap items-end gap-4">
                        <div className="min-w-[140px] flex-1">
                            <label
                                htmlFor="previous-gpa"
                                className="mb-1 block text-sm font-medium text-text-muted"
                            >
                                المعدل السابق
                            </label>
                            <DirectedNumberInput
                                id="previous-gpa"
                                value={previousGpa}
                                onSuccess={(value) => setPreviousGpa(value)}
                                max={MAX_GPA}
                                min={0}
                                placeholder="مثال: 3.25"
                                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                            />
                        </div>
                        <div className="w-28">
                            <label
                                htmlFor="previous-credits"
                                className="mb-1 block text-sm font-medium text-text-muted"
                            >
                                الساعات السابقة
                            </label>
                            <IncrementalInput
                                id="previous-credits"
                                value={+previousCredits}
                                onChange={(value) =>
                                    setPreviousCredits(String(value))
                                }
                                min={0}
                                max={MAX_CREDITS}
                                className="gpa-number-input w-full rounded-lg border border-border bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                                placeholder="مثال: 90"
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-linaer-to-br rounded-xl from-primary-50 to-accent-violet/10 p-4 text-center">
                    <p className="text-sm leading-6 font-medium text-text-muted">
                        معدلك التراكمي (بحد أقصى {MAX_GPA})
                    </p>
                    <p className="text-sm leading-6 font-medium text-text-muted">
                        عدد الساعات (بحد أقصى {MAX_CREDITS} ساعة)
                    </p>
                    <p className="mt-2 font-display text-4xl font-bold text-primary-600">
                        {cumulativeGpa.toFixed(2)}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">
                        {cumulativeTotalCredits} ساعة معتمدة
                    </p>
                </div>
            </div>
        </div>
    );
}
