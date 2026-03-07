import type { Major } from './major';

export interface Section {
    id: number;
    name: string;
    /** Present when eager-loaded via majors relationship */
    majors?: Major[];
}
