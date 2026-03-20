import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ReactNode } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminLayout from "./app/layouts/AdminLayout";
import MainLayout from "./app/layouts/MainLayout";
import '../css/app.css';
import ThemeProvider from "./app/providers/ThemeProvider";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ).then((module) => {
            const mod = module as {
                default: { layout?: (page: ReactNode) => ReactNode };
            };
            const isAdminPage = name.startsWith('Admin/');
            const DefaultLayout = isAdminPage ? AdminLayout : MainLayout;
            mod.default.layout ??= (page: ReactNode) => (
                <DefaultLayout>{page}</DefaultLayout>
            );
            return mod;
        }),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <ThemeProvider>
                    <App {...props} />
                </ThemeProvider>
            </StrictMode>,
        );
    },
    progress: {
        color: '#196fc2',
        showSpinner: true,
    },
});
