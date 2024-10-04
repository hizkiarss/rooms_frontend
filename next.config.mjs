/** @type {import('next').NextConfig} */
//const nextConfig = {};
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'plus.unsplash.com', 'res.cloudinary.com'],
    },
    remotePatterns: [
        {
            protocol: "https",
            hostname: "res.cloudinary.com",
            pathname: "/**",
        },
    ],
};

export default nextConfig;
