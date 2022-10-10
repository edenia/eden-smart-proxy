/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es']
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  }
}
