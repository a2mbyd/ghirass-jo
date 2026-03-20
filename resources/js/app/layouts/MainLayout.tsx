import { router } from '@inertiajs/react';
import { type ReactNode, useRef, useEffect } from 'react';
import { dashboard } from '@/routes/admin';
import Footer from "@/shared/ui/footer/Footer/Footer";
import Topbar from "@/shared/ui/topbar/Topbar/Topbar";

const SECRET_CODE = 'admin';

export default function MainLayout({ children }: { children: ReactNode }) {
    const typedRef = useRef('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            typedRef.current = (typedRef.current + e.key).slice(
                -SECRET_CODE.length,
            );

            if (typedRef.current === SECRET_CODE) {
                router.visit(dashboard.url());
                typedRef.current = '';
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Topbar />

            <main className="flex-1">{children}</main>

            <Footer />
        </div>
    );
}
