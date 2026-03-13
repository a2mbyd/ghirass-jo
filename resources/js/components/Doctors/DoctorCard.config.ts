const GRADIENTS = [
    'from-primary-500 to-accent-cyan',
    'from-accent-violet to-accent-rose',
    'from-accent-emerald to-accent-cyan',
    'from-accent-amber to-accent-pink',
    'from-accent-rose to-accent-amber',
    'from-accent-cyan to-accent-emerald',
    'from-accent-pink to-accent-violet',
    'from-accent-violet to-accent-cyan',
    'from-accent-emerald to-accent-amber',
    'from-accent-amber to-accent-pink',
    'from-accent-pink to-accent-violet',
];

export const getGradient = (index: number) => {
    return GRADIENTS[index % GRADIENTS.length];
};

export const getDelay = (index: number) => {
    return `stagger-${Math.min(index + 1, 10)}`;
};

export const copyEmail = async (email: string, callback?: () => void) => {
    try {
        await navigator.clipboard.writeText(email);
        callback?.();
        return true;
    } catch {
        try {
            const input = document.createElement('input');
            input.value = email;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            callback?.();
            return true;
        } catch {
            return false;
        }
    }
};
