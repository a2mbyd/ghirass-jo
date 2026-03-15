import { index } from '@/actions/App/Http/Controllers/AdminUserController';
import UsersForm from '@/components/Admin/Users/UsersForm/UsersForm';
import FormHeader from '@/components/ui/Admin/CreateAndEditForm/FormCard/FormHeader';
import { Users } from 'lucide-react';
import React from 'react';

const Create = () => {
    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            <FormHeader
                backLink={index.url()}
                title="إضافة مستخدم"
                subtitle="إنشاء مستخدم جديد للوحة التحكم"
                icon={Users}
            />
            <UsersForm mode="create" />
        </div>
    );
};

export default Create;
