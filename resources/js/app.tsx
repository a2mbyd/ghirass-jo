import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ReactNode } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainLayout from './layouts/MainLayout';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ).then((module: { default: { layout?: (page: ReactNode) => ReactNode } }) => {
            module.default.layout ??= ((page: ReactNode) => <MainLayout>{page}</MainLayout>);
            return module;
        }),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#196fc2',
        showSpinner: true,
    },
});

