import Sidebar from '@/components/Admin/Sidebar';
import React, { ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-background">
            <main className="min-w-0 flex-1">{children}</main>
            <Sidebar />
        </div>
    );
};

export default AdminLayout;
