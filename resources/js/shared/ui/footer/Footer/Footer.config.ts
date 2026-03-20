export type SocialPlatform = 'facebook' | 'instagram' | 'x' | 'telegram';

export interface SocialLink {
    platform: SocialPlatform;
    label: string;
    href: string;
}

export const FOOTER_CONFIG = {
    links: [
        {
            label: 'مواد تكنولوجيا المعلومات',
            href: '/courses',
        },
        {
            label: 'التخصصات',
            href: '/#majors',
        },
        {
            label: 'حساب المعدل',
            href: '/gpa',
        },
        {
            label: 'البريد الإلكتروني للدكاترة',
            href: '/doctors',
        },
    ],
    socialLinks: [
        {
            platform: 'facebook' as const,
            label: 'Facebook',
            href: 'https://www.facebook.com/groups/263161875461386',
        },
        {
            platform: 'instagram' as const,
            label: 'Instagram',
            href: 'https://www.instagram.com/ghirass_it/',
        },
        {
            platform: 'x' as const,
            label: 'X',
            href: 'https://x.com/ghirassjo',
        },
        {
            platform: 'telegram' as const,
            label: 'Telegram',
            href: 'https://t.me/ghirassjo',
        },
    ],
};
