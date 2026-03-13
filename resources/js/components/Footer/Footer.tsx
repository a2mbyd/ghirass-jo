import { Link } from '@inertiajs/react';
import {
    Facebook,
    GraduationCap,
    Instagram,
    Send,
    Twitter,
} from 'lucide-react';
import { FOOTER_CONFIG } from './Footer.config';

const SOCIAL_ICONS = {
    facebook: Facebook,
    instagram: Instagram,
    x: Twitter,
    telegram: Send,
} as const;

const Footer = () => {
    return (
        <footer className="border-color-border border-t bg-surface">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
                    <div className="flex flex-col items-center gap-3">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-display font-semibold text-text"
                        >
                            <GraduationCap className="h-5 w-5 text-primary-500" />
                            بوابة غراس للطالب
                        </Link>
                        <div
                            className="flex gap-2"
                            aria-label="روابط التواصل الاجتماعي"
                        >
                            {FOOTER_CONFIG.socialLinks.map((link) => {
                                const Icon = SOCIAL_ICONS[link.platform];
                                return (
                                    <a
                                        key={link.platform}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.label}
                                        className="rounded-lg p-2 text-text-muted transition-all duration-300 hover:scale-110 hover:text-primary-500 hover:ring-2 hover:ring-primary-500 hover:ring-offset-surface hover:drop-shadow-[0_0_12px_rgba(25,111,194,0.5)] hover:outline-none"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-6 text-sm text-text-muted">
                        {FOOTER_CONFIG.links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="transition-colors hover:text-text"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <p className="mt-6 text-center text-sm text-text-subtle">
                    روابط المواد، خطط التخصصات، أدوات المعدل والمزيد
                </p>
            </div>
        </footer>
    );
};

export default Footer;
