/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        apiUrl: process.env.API_URL,
    },
};

module.exports = {
    webpack: (config) => {
        config.resolve.alias["@emotion/core"] = "@emotion/react";
        return config;
    },
};

module.exports = nextConfig;
