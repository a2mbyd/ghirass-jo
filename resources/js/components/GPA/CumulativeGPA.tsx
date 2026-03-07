import React from 'react';

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
                            <input
                                id="previous-gpa"
                                type="text"
                                inputMode="decimal"
                                value={previousGpa}
                                onChange={(e) => setPreviousGpa(e.target.value)}
                                onBlur={() => {
                                    const num = parseFloat(previousGpa);
                                    if (isNaN(num) || num < 0) {
                                        setPreviousGpa('');
                                    } else if (num > 4.2) {
                                        setPreviousGpa('4.2');
                                    } else {
                                        setPreviousGpa(String(num));
                                    }
                                }}
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
                            <input
                                id="previous-credits"
                                type="number"
                                min={0}
                                max={200}
                                value={previousCredits}
                                onChange={(e) => {
                                    const raw = e.target.value;
                                    if (raw === '') {
                                        setPreviousCredits('');
                                        return;
                                    }
                                    const num = parseInt(raw);
                                    if (!isNaN(num) && num <= 300) {
                                        setPreviousCredits(String(num));
                                    } else if (!isNaN(num) && num > 300) {
                                        setPreviousCredits('300');
                                    }
                                }}
                                placeholder="مثال: 90"
                                className="gpa-number-input w-full rounded-lg border border-border bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-linaer-to-br rounded-xl from-primary-50 to-accent-violet/10 p-4 text-center">
                    <p className="text-sm leading-6 font-medium text-text-muted">
                        معدلك التراكمي (بحد أقصى 4.2)
                    </p>
                    <p className="text-sm leading-6 font-medium text-text-muted">
                        عدد الساعات (بحد أقصى 300 ساعة)
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
