interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <header className="mb-10 text-center md:mb-14">
            <h1 className="font-display text-3xl font-bold text-text md:text-4xl">
                {title}
            </h1>
            {subtitle && (
                <p className="mt-3 text-lg text-text-muted">{subtitle}</p>
            )}
        </header>
    );
}
