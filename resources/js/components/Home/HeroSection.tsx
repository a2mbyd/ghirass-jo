import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Calculator,
    ArrowUpLeft,
    Zap,
    Users,
    CheckCircle,
    Layers,
    LayoutGrid,
} from 'lucide-react';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Instrument+Sans:wght@400;500;600&display=swap');

  .hero-font { font-family: 'Syne', sans-serif; }
  .body-font  { font-family: 'Instrument Sans', sans-serif; }

  @keyframes slide-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes float-a {
    0%, 100% { transform: translateY(0px) rotate(-0.5deg); }
    50%       { transform: translateY(-8px) rotate(0.5deg); }
  }
  @keyframes float-b {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }

  .anim-1 { animation: slide-up 0.65s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
  .anim-2 { animation: slide-up 0.65s cubic-bezier(0.16,1,0.3,1) 0.18s both; }
  .anim-3 { animation: slide-up 0.65s cubic-bezier(0.16,1,0.3,1) 0.30s both; }
  .anim-4 { animation: slide-up 0.65s cubic-bezier(0.16,1,0.3,1) 0.42s both; }
  .anim-5 { animation: fade-in  0.8s ease               0.60s both; }

  .float-a        { animation: float-a 5s ease-in-out infinite; }
  .float-b        { animation: float-b 6s ease-in-out infinite; }
  .float-b-d1     { animation: float-b 6s ease-in-out 0.8s infinite; }
  .float-b-d2     { animation: float-b 6s ease-in-out 1.6s infinite; }

  .cta-primary            { transition: all 0.15s ease; }
  .cta-primary:hover      { box-shadow: 0 8px 28px rgba(37,99,235,0.35); transform: translateY(-1px); }
  .cta-secondary          { transition: background-color 0.15s ease; }
  .cta-secondary:hover    { background-color: rgb(239 246 255); }
`;

export default function HeroSection() {
    return (
        <>
            <style>{style}</style>

            <section
                dir="rtl"
                className="body-font relative overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-200/80"
            >
                {/* Subtle dot grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-100"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)`,
                        backgroundSize: '28px 28px',
                    }}
                />

                
                {/* Glow blobs */}
                <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-100 opacity-70 blur-3xl" />
                <div className="pointer-events-none absolute right-1/3 -bottom-12 h-56 w-56 rounded-full bg-violet-100 opacity-50 blur-3xl" />

                <div className="relative grid min-h-[500px] lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">
                    {/* ── Text column ── */}
                    <div className="flex flex-col justify-center gap-12 px-8 py-12 md:px-12 lg:px-14">
                        {/* Top block: badge + headline + sub + CTAs */}
                        <div className="flex flex-col items-center justify-center gap-6">
                            {/* Badge */}
                            <div className="anim-1 flex w-fit items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5">
                                <Zap
                                    className="h-3 w-3 text-blue-500"
                                    strokeWidth={2.5}
                                />
                                <span className="text-[11px] font-semibold tracking-widest text-blue-600 uppercase">
                                    بوابتك للتنقل في تكنولوجيا المعلومات
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="anim-2 hero-font m-0 text-center text-5xl leading-[1.07] font-extrabold tracking-tight text-slate-900 xl:text-6xl">
                                انطلق في{' '}
                                <span className="bg-linear-to-l from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                                    رحلة تكنولوجية
                                </span>
                                <br />
                                المعلومات بثقة
                            </h1>

                            {/* Subtext */}
                            <p className="anim-3 m-0 text-center text-[15px] leading-relaxed text-slate-500">
                                روابط المواد، خطط التخصصات، أدوات المعدل
                                ومعلومات أعضاء الهيئة التدريسية — كل ما تحتاجه
                                في مكان واحد.
                            </p>

                            {/* CTAs */}
                            <div className="anim-4 flex flex-wrap items-center gap-3">
                                <Link
                                    href="/#majors"
                                    className="cta-primary text-md inline-flex items-center gap-2 rounded-xl bg-linear-to-l from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-md shadow-blue-200"
                                >
                                    <BookOpen className="h-4 w-4" />
                                    اختار تخصصك
                                </Link>

                                <Link
                                    href="/gpa"
                                    className="cta-secondary text-md inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700"
                                >
                                    <Calculator className="h-4 w-4 text-slate-500" />
                                    حساب المعدل
                                    <ArrowUpLeft className="h-3.5 w-3.5 text-slate-400" />
                                </Link>
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="anim-5 flex shrink-0 flex-col items-center gap-3">
                            <p className="m-0 text-center text-sm text-slate-400">
                                ✦ لا حاجة للتسجيل — استخدم الروابط والخطط
                                والأدوات فوراً
                            </p>
                        </div>
                    </div>
                
                    {/* ── Visual panel ── */}
                    <div className="anim-5 hidden flex-col justify-center gap-4 border-r border-slate-100 bg-slate-50/80 px-8 py-12 lg:flex">
                        {/* Logo card */}
                        <div
                            className="float-a w-full rounded-2xl border border-slate-200 bg-white p-6 text-center"
                            style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}
                        >
                            <img
                                src="/images/ghirass-logo.png"
                                alt="بوابة غراس للطالب"
                                className="mx-auto w-full max-w-[160px] object-contain"
                                style={{
                                    filter: 'drop-shadow(0 4px 10px rgba(59,130,246,0.2))',
                                }}
                            />
                            <p className="mt-3 text-[11px] tracking-wide text-slate-400">
                                بوابة غراس للطالب
                            </p>
                        </div>

                        {/* Stats card */}
                        <div
                            className="float-b w-full rounded-2xl border border-slate-100 bg-white p-4"
                            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
                        >
                            <p className="mb-3 text-center text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                                بالأرقام
                            </p>
                            <div className="grid grid-cols-2 divide-x divide-slate-100 divide-x-reverse">
                                <div className="flex flex-col items-center gap-1 px-2">
                                    <span className="text-xl font-extrabold text-blue-600">
                                        100+
                                    </span>
                                    <span className="text-[10px] text-slate-500">
                                        مادة
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-1 px-2">
                                    <span className="text-xl font-extrabold text-violet-600">
                                        12
                                    </span>
                                    <span className="text-[10px] text-slate-500">
                                        تخصص
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="float-b-d1 grid grid-cols-2 gap-2">
                            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-green-100 bg-green-50 p-3 text-center">
                                <CheckCircle
                                    size={16}
                                    className="text-green-500"
                                />
                                <span className="text-[11px] leading-tight font-medium text-slate-600">
                                    لا حاجة للتسجيل
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50 p-3 text-center">
                                <Layers size={16} className="text-blue-500" />
                                <span className="text-[11px] leading-tight font-medium text-slate-600">
                                    محتوى منظّم
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-violet-100 bg-violet-50 p-3 text-center">
                                <BookOpen
                                    size={16}
                                    className="text-violet-500"
                                />
                                <span className="text-[11px] leading-tight font-medium text-slate-600">
                                    مواد وروابط
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-orange-100 bg-orange-50 p-3 text-center">
                                <Users size={16} className="text-orange-500" />
                                <span className="text-[11px] leading-tight font-medium text-slate-600">
                                    أعضاء هيئة تدريس
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
