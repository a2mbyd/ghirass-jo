import { Users } from 'lucide-react';
import React from 'react';
import { index } from '@/actions/App/Http/Controllers/AdminUserController';
import UsersForm from '@/components/Admin/Users/UsersForm/UsersForm';
import FormHeader from "@/shared/ui/admin/form/FormHeader";

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
