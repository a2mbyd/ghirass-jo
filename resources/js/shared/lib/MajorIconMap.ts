import type {
    LucideIcon} from 'lucide-react';
import {
    BarChart3,
    Bot,
    BrainCircuit,
    Code2,
    Cpu,
    Gamepad2,
    Laptop,
    Network,
    RadioTower,
    ServerCog,
    ShieldCheck,
    Stethoscope,
} from 'lucide-react';
import { hashString } from './hashString';

export const ICONS = [
    Network,
    ShieldCheck,
    Cpu,
    Code2,
    ServerCog,
    Laptop,
    BrainCircuit,
    BarChart3,
    RadioTower,
    Gamepad2,
    Bot,
    Stethoscope,
];

const cache: Record<string, LucideIcon> = {};
const usedIndices = new Set<number>();

export function getMajorIcon(code: string): LucideIcon {
    if (code in cache) return cache[code];

    let index = hashString(code) % ICONS.length;
    let steps = 0;
    while (usedIndices.has(index) && steps < ICONS.length) {
        index = (index + 1) % ICONS.length;
        steps++;
    }

    usedIndices.add(index);
    cache[code] = ICONS[index];
    return cache[code];
}
