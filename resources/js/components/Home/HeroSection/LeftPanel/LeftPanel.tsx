import { FEATURE_CARDS } from './FeatireCard.config';
import FeatureCard from './FeatureCard';
import { Major } from '@/types';

const LeftPanel = ({ majors }: { majors: Major[] }) => {
    return (
        <div className="hero-anim-5 hidden flex-col justify-center gap-4 border-r border-border bg-surface-alt px-8 py-12 lg:flex">
            {/* Logo card */}
            <div
                className="hero-float-a w-full rounded-2xl border border-border bg-surface p-6 text-center"
                style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}
            >
                <img
                    src="/images/ghirass-logo.png"
                    alt="بوابة غراس للطالب"
                    className="mx-auto w-full max-w-[200px] object-contain"
                    style={{
                        filter: 'drop-shadow(0 4px 10px rgba(59,130,246,0.2))',
                    }}
                />
                <p className="mt-3 text-[11px] tracking-wide text-text">
                    بوابة غراس للطالب
                </p>
            </div>

            {/* Stats card */}
            <div
                className="hero-float-b w-full rounded-2xl border border-border bg-surface p-4"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            >
                <p className="mb-3 text-center text-[10px] font-semibold tracking-widest text-text-muted uppercase">
                    بالأرقام
                </p>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center gap-1 px-2">
                        <span className="text-lg font-semibold text-primary-600">
                            100+
                        </span>
                        <span className="text-[10px] text-text-muted">
                            مادة
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 px-2">
                        <span className="text-lg font-semibold text-primary-600">
                            {majors.length}
                        </span>
                        <span className="text-[10px] text-text-muted">
                            تخصص
                        </span>
                    </div>
                </div>
            </div>

            {/* Features cards */}
            <div className="hero-float-b-d1 grid grid-cols-2 gap-2">
                {FEATURE_CARDS.map((feature) => (
                    <FeatureCard
                        key={feature.title}
                        icon={feature.icon}
                        title={feature.title}
                    />
                ))}
            </div>
        </div>
    );
};

export default LeftPanel;
