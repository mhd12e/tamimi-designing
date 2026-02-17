import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Al Tamimi Designing | Premium Printing & Packaging',
        short_name: 'Al Tamimi',
        description: 'Luxury packaging, event fabrication, and corporate branding solutions in Sharjah (Majas 3) and UAE.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#FFD700', // Gold
        icons: [
            {
                src: '/logo.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    };
}
