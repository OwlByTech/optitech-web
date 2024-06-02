/** @type {import('next').NextConfig} */
const { withStoreConfig } = require("./store-config")

/**
 * @type {import('next').NextConfig}
 */
const nextEnv = require("@next/env")
const path = require("path")
const dotenv = require("dotenv")

const envPath = path.join(__dirname, ".env")
dotenv.config({
    path: envPath,
})
const nextConfig = withStoreConfig({
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // TODO: Fix all typescript errors
        ignoreBuildErrors: true,
    },
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        ENV: process.env.ENV,
    },
    reactStrictMode: true,
    transpilePackages: ['next-auth'],
})

module.exports = nextConfig
