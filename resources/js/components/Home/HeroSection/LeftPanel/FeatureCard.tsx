import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
}
const FeatureCard = ({ icon: Icon, title }: FeatureCardProps) => {
    return (
        <div className="flex flex-col items-center gap-1.5 rounded-xl border border-primary-200 bg-primary-50 p-3 text-center">
            <Icon className="h-4 w-4 text-primary-500" />
            <span className="text-[11px] leading-tight font-medium text-text">
                {title}
            </span>
        </div>
    );
};

export default FeatureCard;
