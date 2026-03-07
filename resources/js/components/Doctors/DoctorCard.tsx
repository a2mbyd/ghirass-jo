import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { Doctor } from '@/types/doctors';

interface DoctorCardProps {
    doctor: Doctor;
    index?: number;
}

export default function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
    const [copied, setCopied] = useState(false);
    const delay = `stagger-${Math.min(index + 1, 10)}`;
    const gradients = [
        'from-primary-500 to-accent-cyan',
        'from-accent-violet to-accent-rose',
        'from-accent-emerald to-accent-cyan',
    ];
    const gradient = gradients[index % gradients.length];
    const { name, email, department, subjects } = doctor;
    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback for older browsers
            const input = document.createElement('input');
            input.value = email;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

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
                    onClick={copyEmail}
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
            {subjects.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {subjects.map((subject) => (
                        <span
                            key={subject}
                            className="rounded-lg bg-surface-alt px-2 py-1 text-xs text-text-muted"
                        >
                            {subject}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
