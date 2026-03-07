import React from 'react';
import { Link } from '@inertiajs/react';
import { BookOpen, Calculator, ArrowUpLeft, Zap } from 'lucide-react';
import Badge from '@/components/ui/Badge';

const TextColumn = () => {
    return (
        <div className="flex flex-col justify-center gap-12 px-8 py-12 md:px-12 lg:px-14">
            {/* Top block: badge + headline + sub + CTAs */}
            <div className="flex flex-col items-center justify-center gap-6">
                {/* Badge */}
                <Badge
                    text="بوابتك للتنقل في تكنولوجيا المعلومات"
                    icon={
                        <Zap
                            className="h-3 w-3 text-primary-500"
                            strokeWidth={2.5}
                        />
                    }
                />

                {/* Headline */}
                <h1 className="hero-anim-2 hero-font m-0 text-center text-5xl leading-[1.07] font-extrabold tracking-tight text-text xl:text-6xl">
                    انطلق في{' '}
                    <span className="bg-linear-to-l from-primary-600 via-primary-500 to-primary-500 bg-clip-text text-transparent">
                        رحلة تكنولوجيا
                    </span>
                    <br />
                    المعلومات بثقة
                </h1>

                {/* Subtext */}
                <p className="hero-anim-3 m-0 text-center text-[15px] leading-relaxed text-text-muted">
                    روابط المواد، خطط التخصصات، أدوات المعدل ومعلومات أعضاء
                    الهيئة التدريسية — كل ما تحتاجه في مكان واحد.
                </p>

                {/* CTAs */}
                <div className="hero-anim-4 flex flex-wrap items-center gap-3">
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

            {/* Bottom CTA */}
            <div className="hero-anim-5 flex shrink-0 flex-col items-center gap-3">
                <p className="m-0 text-center text-sm text-text-muted">
                    ✦ لا حاجة للتسجيل — استخدم الروابط والخطط والأدوات فوراً
                </p>
            </div>
        </div>
    );
};

export default TextColumn;
