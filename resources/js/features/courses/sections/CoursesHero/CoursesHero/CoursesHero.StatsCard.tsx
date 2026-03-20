interface StatsCardProps {
    label: string;
    value: number;
}
const StatsCard = ({ label, value }: StatsCardProps) => {
    return (
        <div className="flex flex-col items-center gap-1 px-4 py-4 text-center">
            <span className="text-2xl font-extrabold text-text">{value}</span>
            <span className="text-[10px] font-medium text-text-muted">
                {label}
            </span>
        </div>
    );
};

export default StatsCard;
