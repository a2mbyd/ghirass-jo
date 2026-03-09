export const generateId = () =>
    typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

const BASE_URL = import.meta.env.VITE_APP_URL;
export const getImageUrl = (image: string | null) => {
    if (!image) return null;

    if (image.startsWith('http://') || image.startsWith('https://')) {
        return image;
    }

    if (image.startsWith('/')) {
        return `${BASE_URL}${image}`;
    }

    if (image.startsWith('storage/')) {
            return `${BASE_URL}/storage/${image}`;
    }

    return `${BASE_URL}/storage/${image}`;
};
