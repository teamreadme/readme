const { withPlausibleProxy } = require('next-plausible')


const ContentSecurityPolicy = `
  default-src 'self';
  style-src 'self' 'unsafe-inline';
  connect-src 'self';
  script-src 'self' 'sha256-/6SBPqW+GW+//4nlXX6Y1nR9dWlh0gsQJ6KK71djH6A=' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''}
`
const securityHeaders = [{
  key: 'Content-Security-Policy',
  value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
}]

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ['picsum.photos'],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  optimizeFonts: false, //https://github.com/vercel/next.js/issues/24781
}

module.exports = withPlausibleProxy()(nextConfig)
