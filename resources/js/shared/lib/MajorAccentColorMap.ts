import { hashString } from './hashString';

const GRADIENTS = [
    'from-sky-600 to-cyan-500',
    'from-red-600 to-orange-500',
    'from-blue-700 to-cyan-500',
    'from-violet-600 to-purple-500',
    'from-indigo-600 to-blue-500',
    'from-cyan-600 to-teal-500',
    'from-emerald-600 to-green-500',
    'from-teal-600 to-cyan-400',
    'from-fuchsia-600 to-pink-400',
    'from-rose-600 to-pink-500',
    'from-lime-600 to-green-400',
    'from-amber-600 to-yellow-400',
];

const cache: Record<string, string> = {};
const usedIndices = new Set<number>();

export function getMajorAccentColor(code: string): string {
    if (code in cache) return cache[code];

    let index = hashString(code) % GRADIENTS.length;
    let steps = 0;
    while (usedIndices.has(index) && steps < GRADIENTS.length) {
        index = (index + 1) % GRADIENTS.length;
        steps++;
    }

    usedIndices.add(index);
    cache[code] = GRADIENTS[index];
    return cache[code];
}
