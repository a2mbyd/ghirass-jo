import { Section } from '@/types';
import { PALETTE } from '../GraphSection.colors';
import { ColorScheme } from '../GraphSection.types';

interface SectionOptionCardProps {
    section: Section;
    colorMap: Record<number, ColorScheme>;
    filterSec: number | null;
    onFilterChange: (sectionId: number | null) => void;
}
const SectionOptionCard = ({
    section,
    colorMap,
    filterSec,
    onFilterChange,
}: SectionOptionCardProps) => {
    const c = colorMap[section.id] ?? PALETTE[0];
    const active = filterSec === section.id;
    return (
        <div
            key={section.id}
            onClick={() => onFilterChange(active ? null : section.id)}
            className="mb-[3px] flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-all duration-120"
            style={{
                background: active ? c.light : 'transparent',
                border: active
                    ? `1px solid ${c.bg}55`
                    : '1px solid transparent',
            }}
        >
            <span
                className="size-[11px] shrink-0 rounded-full"
                style={{ background: c.bg }}
            />
            <span
                className={` ${active ? 'font-bold text-primary-500' : 'font-normal text-text'}`}
            >
                {section.name}
            </span>
        </div>
    );
};

export default SectionOptionCard;
