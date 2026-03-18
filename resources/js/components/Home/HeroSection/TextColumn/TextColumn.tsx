import { Link } from '@inertiajs/react';
import { BookOpen, Calculator, ArrowUpLeft, Zap } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import type { Major } from '@/types';

const TextColumn = ({ majors }: { majors: Major[] }) => {
    
    return (
        <div className="px-8 py-12 md:px-12 lg:px-14">
            <div className="flex flex-col gap-12 lg:items-center">
                {/* Center content */}
                <div className="flex flex-col justify-center gap-12">
                    {/* Top block: badge + headline + sub + CTAs */}
                    <div className="flex flex-col items-center justify-center gap-6">
                        <Badge
                            text="بوابتك للتنقل في تكنولوجيا المعلومات"
                            icon={
                                <Zap
                                    className="h-3 w-3 text-primary-500"
                                    strokeWidth={2.5}
                                />
                            }
                        />

                        <h1 className="hero-anim-2 hero-font m-0 text-center text-5xl leading-[1.07] font-extrabold tracking-tight text-text xl:text-6xl">
                            انطلق في{' '}
                            <span className="bg-linear-to-l from-primary-600 via-primary-500 to-primary-500 bg-clip-text text-transparent">
                                رحلة تكنولوجيا
                            </span>
                            <br />
                            المعلومات بثقة
                        </h1>

                        <p className="hero-anim-3 m-0 text-center text-[15px] leading-relaxed text-text-muted">
                            روابط المواد، خطط التخصصات، أدوات المعدل ومعلومات
                            أعضاء الهيئة التدريسية — كل ما تحتاجه في مكان واحد.
                        </p>

                        <div className="hero-anim-4 flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href="/#majors"
                                className="cta-primary text-md inline-flex items-center gap-2 rounded-xl bg-linear-to-l from-primary-600 to-primary-500 px-6 py-3 font-semibold text-white shadow-md shadow-primary-200"
                            >
                                <BookOpen className="h-4 w-4" />
                                اختار تخصصك
                            </Link>

                            <Link
                                href="/gpa"
                                className="cta-secondary text-md text-text-inversed inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 font-medium"
                            >
                                <Calculator className="text-text-inversed h-4 w-4" />
                                حساب المعدل
                                <ArrowUpLeft className="text-text-inversed h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>

                    <div className="hero-anim-5 flex shrink-0 flex-col items-center gap-3">
                        <p className="m-0 text-center text-sm text-text-muted">
                            ✦ لا حاجة للتسجيل — استخدم الروابط والخطط والأدوات
                            فوراً
                        </p>
                    </div>
                </div>

                {/* Bottom centered stats card */}
                <div className="flex justify-center">
                    <div
                        className="w-full max-w-md rounded-2xl border border-border bg-surface p-4"
                        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
                    >
                        <p className="mb-3 text-center text-[10px] font-semibold tracking-widest text-text-muted uppercase">
                            بالأرقام
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex w-32 flex-col items-center gap-1 px-2">
                                <span className="text-lg font-semibold text-primary-600">
                                    100+
                                </span>
                                <span className="text-[10px] text-text-muted">
                                    مادة
                                </span>
                            </div>
                            <div className="flex w-32 flex-col items-center gap-1 px-2">
                                <span className="text-lg font-semibold text-primary-600">
                                    {majors.length}
                                </span>
                                <span className="text-[10px] text-text-muted">
                                    تخصص
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextColumn;
