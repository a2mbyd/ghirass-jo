export interface AdminUser {
    id: number;
    username: string;
    role: 'admin' | 'contributor';
    unhashed_password?: string;
}
