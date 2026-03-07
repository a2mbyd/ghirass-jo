import { QUICK_LINKS_CONFIG } from './config';
import QuickLinkCard from './QuickLinkCard';

const QuickLinksSection = () => {
    return (
        <section className="px-4 py-14">
            <div className="container mx-auto max-w-5xl">
                <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-text md:text-4xl">
                    روابط سريعة
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {QUICK_LINKS_CONFIG.map((link) => (
                        <QuickLinkCard key={link.href} link={link} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickLinksSection;
