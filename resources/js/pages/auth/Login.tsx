import AuthenticatedSessionController from '@/actions/Laravel/Fortify/Http/Controllers/AuthenticatedSessionController';
import { useForm } from '@inertiajs/react';
import { GraduationCap, Lock, Mail } from 'lucide-react';
import React from 'react';

interface LoginProps {
    status?: string;
}

const Login = ({ status }: LoginProps) => {
    const form = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.submit(AuthenticatedSessionController.store.post());
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            {
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary-500/5 blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-primary-500/5 blur-3xl" />
                </div>
            }

            <div className="relative w-full max-w-md">
                <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-8 shadow-(--shadow-soft)">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-500">
                        <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl font-bold text-text">
                            تسجيل الدخول
                        </h1>
                        <p className="mt-1 text-sm text-text-muted">
                            لوحة التحكم
                        </p>
                    </div>

                    {status && (
                        <p className="w-full rounded-lg bg-primary-50 px-4 py-2 text-sm text-primary-700">
                            {status}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        <div>
                            <label
                                htmlFor="username"
                                className="mb-1.5 block text-sm font-medium text-text"
                            >
                                اسم المستخدم
                            </label>
                            <div className="relative">
                                <Mail className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                                <input
                                    id="username"
                                    value={form.data.username}
                                    onChange={(e) =>
                                        form.setData('username', e.target.value)
                                    }
                                    required
                                    autoFocus
                                    placeholder="John Doe"
                                    dir="ltr"
                                    className="w-full rounded-xl border border-border bg-background py-2.5 pr-10 pl-4 text-sm text-text placeholder-text-subtle shadow-sm transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                />
                            </div>
                            {form.errors.username && (
                                <p className="mt-1 text-xs text-danger">
                                    {form.errors.username}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-medium text-text"
                            >
                                كلمة المرور
                            </label>
                            <div className="relative">
                                <Lock className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                                <input
                                    id="password"
                                    type="password"
                                    value={form.data.password}
                                    onChange={(e) =>
                                        form.setData('password', e.target.value)
                                    }
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    dir="ltr"
                                    className="w-full rounded-xl border border-border bg-background py-2.5 pr-10 pl-4 text-sm text-text placeholder-text-subtle shadow-sm transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                />
                            </div>
                            {form.errors.password && (
                                <p className="mt-1 text-xs text-danger">
                                    {form.errors.password}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="w-full rounded-xl bg-primary-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none disabled:opacity-60"
                        >
                            {form.processing
                                ? 'جاري الدخول...'
                                : 'تسجيل الدخول'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
