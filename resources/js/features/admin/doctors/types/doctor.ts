import type { Doctor } from '@/types/doctors';
import type { Section } from '@/types/section';

export interface SectionWithDoctors extends Section {
    doctors: Doctor[];
}
