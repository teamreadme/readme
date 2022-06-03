const { withPlausibleProxy } = require('next-plausible')


const ContentSecurityPolicy = `
  default-src 'self';
  style-src 'self' 'unsafe-inline';
  connect-src 'self';
  script-src 'self' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''}
`
const securityHeaders = [{
  key: 'Content-Security-Policy',
  value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
}]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
