import type { Major } from '@/features/majors/types/major';

export interface Section {
    id: number;
    name: string;
    /** Present when eager-loaded via majors relationship */
    majors?: Major[];
    /** Present when loaded with withCount('courses') */
    courses_count?: number;
}
