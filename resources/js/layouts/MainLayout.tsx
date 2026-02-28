import { type ReactNode } from 'react';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Topbar />

            <main className="flex-1">{children}</main>

            <Footer />
        </div>
    );
}
