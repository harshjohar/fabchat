/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
    dest: "public",
});

const nextConfig = {
    reactStrictMode: true,
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
        domains: [
            "lh3.googleusercontent.com",
            "firebasestorage.googleapis.com",
        ],
    },
};
module.exports = withPWA({
    ...nextConfig,
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
});
