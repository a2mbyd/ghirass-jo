import { type ReactNode, useState, useRef, useEffect } from 'react';
import Topbar from '@/components/Topbar/Topbar';
import Footer from '@/components/Footer/Footer';

const SECRET_CODE = 'dana';

export default function MainLayout({ children }: { children: ReactNode }) {
    const [showHeart, setShowHeart] = useState(false);
    const typedRef = useRef('');

    useEffect(() => {
        let hideTimer: ReturnType<typeof setTimeout>;

        const handleKeyDown = (e: KeyboardEvent) => {
            typedRef.current = (typedRef.current + e.key).slice(
                -SECRET_CODE.length,
            );

            if (typedRef.current === SECRET_CODE) {
                setShowHeart(true);
                typedRef.current = '';
                hideTimer = setTimeout(() => setShowHeart(false), 4000);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Topbar />

            <main className="flex-1">{children}</main>

            <Footer />

            {showHeart && (
                <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
                    <span
                        className="animate-pulse text-[8rem]"
                        role="img"
                        aria-hidden
                    >
                        ❤️
                    </span>
                </div>
            )}
        </div>
    );
}
