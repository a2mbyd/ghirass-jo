import useTheme from "@/shared/hooks/useTheme";

const MainVisual = () => {
    const { darkMode } = useTheme();

    return (
        <div className="hero-anim-5 flex flex-col gap-6 bg-surface-alt">
            <img
                src={
                    darkMode
                        ? '/images/ghirass-hero-dark.jpg'
                        : '/images/ghirass-hero.png'
                }
                alt="بوابة غراس للطالب"
                className="mx-auto w-full object-contain"
                style={{
                    filter: 'drop-shadow(0 12px 24px rgba(59,130,246,0.25))',
                }}
            />
        </div>
    );
};

export default MainVisual;
