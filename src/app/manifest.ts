import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Noor Al Khan Printing | Premium Printing Sharjah',
        short_name: 'Noor Al Khan',
        description: 'Elite commercial printing, luxury packaging, and corporate branding solutions in Sharjah and Dubai.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#8B0D1B', // Using brand primary color
        icons: [
            {
                src: '/icon.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    };
}
