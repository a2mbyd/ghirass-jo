import type { ReactNode } from 'react';
import React from 'react';
import Sidebar from "@/features/admin/sidebar/components/Sidebar/Sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-background">
            <main className="min-w-0 flex-1">{children}</main>
            <Sidebar />
        </div>
    );
};

export default AdminLayout;
