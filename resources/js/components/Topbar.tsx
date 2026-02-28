import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Calculator, GraduationCap, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Topbar = () => {
    const navItems = [
        { href: '/', label: 'الرئيسية', icon: GraduationCap },
        { href: '/subjects', label: 'مواد تكنولوجيا المعلومات', icon: BookOpen },
        { href: '/#majors', label: 'التخصصات', icon: BookOpen },
        { href: '/gpa', label: 'حساب المعدل', icon: Calculator },
        { href: '/doctors', label: 'البريد الإلكتروني للأساتذة', icon: Mail },
    ];
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="border-color-border sticky top-0 z-50 w-full border-b border-border bg-glass-bg backdrop-blur-xl supports-backdrop-filter:bg-glass-bg">
            <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-text transition-opacity hover:opacity-80"
                >
                    <span className="bg-linear-to-br rounded-lg from-primary-500 to-accent-violet p-2">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </span>
                    غراس
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            url === item.href ||
                            (item.href !== '/' && url.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-primary-500/10 text-primary-600'
                                        : 'text-text-muted hover:bg-surface-alt hover:text-text'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="rounded-lg p-2 text-text hover:bg-surface-alt md:hidden"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile nav */}
            {mobileMenuOpen && (
                <nav className="animate-fade-in border-t border-color-border bg-surface px-4 py-3 md:hidden">
                    <ul className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive =
                                url === item.href ||
                                (item.href !== '/' &&
                                    url.startsWith(item.href));
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                                            isActive
                                                ? 'bg-primary-500/10 text-primary-600'
                                                : 'text-text-muted hover:bg-surface-alt'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Topbar;
