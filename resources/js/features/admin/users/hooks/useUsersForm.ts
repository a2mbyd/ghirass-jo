import { useForm } from '@inertiajs/react';
import type React from 'react';
import AdminUserController from '@/actions/App/Http/Controllers/AdminUserController';
import type { AdminUser } from "@/shared/types/auth";

interface UserFormData {
    username: string;
    password: string;
    password_confirmation: string;
    _method: string;
    unhashed_password?: string;
}

interface UseUsersFormParams {
    mode: 'create' | 'edit';
    user?: AdminUser;
}
export function useUsersForm({ mode, user }: UseUsersFormParams) {
    const isEdit = mode === 'edit';
    const form = useForm<UserFormData>({
        username: isEdit ? (user?.username ?? '') : '',
        password: isEdit ? (user?.unhashed_password ?? '') : '',
        password_confirmation: isEdit ? (user?.unhashed_password ?? '') : '',
        _method: isEdit ? 'PUT' : '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && user) {
            form.transform((data) => ({
                username: data.username,
                ...(data.password && {
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                    unhashed_password: data.password,
                }),
            }));
            form.put(AdminUserController.update.url(user.id));
        } else {
            form.transform((data) => ({
                ...data,
                unhashed_password: data.password,
            }));
            form.post(AdminUserController.store.url());
        }
    };

    return {
        form,
        isEdit,
        handleSubmit,
    };
}
