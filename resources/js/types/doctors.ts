export interface Doctor {
    id: number;
    name: string;
    email: string;
    department: string | null;
    image: string | null;
    section?: string;
    section_id: number;
}
