import { Link } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-color-border border-t bg-surface">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-display font-semibold text-text"
                    >
                        <GraduationCap className="h-5 w-5 text-primary-500" />
                        بوابة غراس للطالب
                    </Link>
                    <nav className="flex flex-wrap justify-center gap-6 text-sm text-text-muted">
                        <Link
                            href="/courses"
                            className="transition-colors hover:text-text"
                        >
                            مواد تكنولوجيا المعلومات
                        </Link>
                        <Link
                            href="/#majors"
                            className="transition-colors hover:text-text"
                        >
                            التخصصات
                        </Link>
                        <Link
                            href="/gpa"
                            className="transition-colors hover:text-text"
                        >
                            حساب المعدل
                        </Link>
                        <Link
                            href="/doctors"
                            className="transition-colors hover:text-text"
                        >
                            البريد الإلكتروني للدكاترة
                        </Link>
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
