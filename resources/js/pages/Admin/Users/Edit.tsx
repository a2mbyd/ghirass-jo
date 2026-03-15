import { index } from '@/actions/App/Http/Controllers/AdminUserController';
import UsersForm from '@/components/Admin/Users/UsersForm/UsersForm';
import FormHeader from '@/components/ui/Admin/CreateAndEditForm/FormCard/FormHeader';
import { Users } from 'lucide-react';
import React from 'react';

interface AdminUser {
    id: number;
    username: string;
    role: 'admin' | 'contributor';
}

interface EditProps {
    user: AdminUser;
}

const Edit = ({ user }: EditProps) => {
    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            <FormHeader
                backLink={index.url()}
                title="تعديل المستخدم"
                subtitle={user.username}
                icon={Users}
            />
            <UsersForm mode="edit" user={user} />
        </div>
    );
};

export default Edit;