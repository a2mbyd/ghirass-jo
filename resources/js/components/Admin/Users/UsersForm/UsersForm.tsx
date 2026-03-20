import { User } from 'lucide-react';
import { index } from '@/actions/App/Http/Controllers/AdminUserController';
import { useUsersForm } from "@/features/admin/users/hooks/useUsersForm";
import type { AdminUser } from "@/shared/types/auth";
import Actions from "@/shared/ui/admin/form/Actions";
import FormCard from "@/shared/ui/admin/form/index";
import PasswordInput from "@/shared/ui/admin/inputs/PasswordInput";
import TextInput from "@/shared/ui/admin/inputs/TextInput";

interface UsersFormProps {
    mode: 'create' | 'edit';
    user?: AdminUser;
}

const UsersForm = ({ mode, user }: UsersFormProps) => {
    const { form, isEdit, handleSubmit } = useUsersForm({ mode, user });

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormCard
                title="المعلومات الأساسية"
                icon={<User className="h-4 w-4 text-primary-500" />}
                allowOverflow
            >
                <div className="flex flex-col gap-5 p-6">
                    <div className="flex gap-5">
                        <TextInput
                            id="username"
                            label="اسم المستخدم"
                            value={form.data.username}
                            onChange={(v) => form.setData('username', v)}
                            placeholder="ex: Mohammad Ali"
                            error={form.errors.username}
                            required
                            dir="ltr"
                            className="flex-1"
                        />
                    </div>

                    <div className="flex gap-5">
                        <PasswordInput
                            id="password"
                            label={
                                isEdit
                                    ? 'كلمة المرور (اتركها فارغة للإبقاء على الحالية)'
                                    : 'كلمة المرور'
                            }
                            value={form.data.password}
                            onChange={(v) => form.setData('password', v)}
                            placeholder={isEdit ? '••••••••' : ''}
                            error={form.errors.password}
                            required={!isEdit}
                            dir="ltr"
                            className="flex-1"
                        />
                        <PasswordInput
                            id="password_confirmation"
                            label={
                                isEdit
                                    ? 'تأكيد كلمة المرور'
                                    : 'تأكيد كلمة المرور'
                            }
                            value={form.data.password_confirmation}
                            onChange={(v) =>
                                form.setData('password_confirmation', v)
                            }
                            placeholder={isEdit ? '••••••••' : ''}
                            error={form.errors.password_confirmation}
                            required={!isEdit}
                            dir="ltr"
                            className="flex-1"
                        />
                    </div>
                </div>
            </FormCard>

            <Actions
                cancelLink={index.url()}
                submitText={isEdit ? 'حفظ التعديلات' : 'إضافة المستخدم'}
                processing={form.processing}
            />
        </form>
    );
};

export default UsersForm;
