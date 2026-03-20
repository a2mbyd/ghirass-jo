import type { Doctor } from "@/features/doctors/types/doctors";
import type { Section } from "@/features/doctors/types/section";

export interface SectionWithDoctors extends Section {
    doctors: Doctor[];
}
