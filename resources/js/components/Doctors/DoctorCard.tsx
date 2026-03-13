import { useCallback, useRef, useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { Doctor } from '@/types/doctors';
import { copyEmail, getDelay, getGradient } from './DoctorCard.config';

interface DoctorCardProps {
    doctor: Doctor;
    index?: number;
}

export default function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
    const [copied, setCopied] = useState(false);
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { name, email, department } = doctor;

    const delay = getDelay(index ?? 0);
    const gradient = getGradient(index ?? 0);

    const handleCopyEmail = useCallback(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        copyEmail(email, () => {
            setCopied(true);
            timeout.current = setTimeout(() => setCopied(false), 2000);
        });
    }, [email]);

    return (
        <div
            className={`animate-fade-in-up opacity-0 ${delay} flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-md`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div
                        className={`rounded-xl bg-linear-to-br ${gradient} p-3`}
                    >
                        <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-display font-semibold text-text">
                            {name}
                        </h3>
                        <p className="text-sm text-primary-600">
                            مكتب الدكتور في: {department}{' '}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                        copied
                            ? 'bg-success/10 text-success'
                            : 'bg-surface-alt text-text-muted hover:bg-primary-50 hover:text-primary-600'
                    }`}
                >
                    {copied ? (
                        <>
                            <Check className="h-4 w-4" />
                            تم النسخ
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4" />
                            نسخ البريد
                        </>
                    )}
                </button>
            </div>
            <a
                href={`mailto:${email}`}
                className="text-sm text-primary-600 underline underline-offset-2 hover:text-primary-700"
            >
                {email}
            </a>
        </div>
    );
}
