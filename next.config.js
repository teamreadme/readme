/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
  optimizeFonts: false, //https://github.com/vercel/next.js/issues/24781
}

module.exports = nextConfig
