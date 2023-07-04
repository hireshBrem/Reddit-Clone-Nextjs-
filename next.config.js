/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        appDir: true,
        serverActions: true,
    },
    images:{
        domains: ['lh3.googleusercontent.com', 'fastly.picsum.photos']
    },typescript: {
        ignoreBuildErrors: true,
      },
}

module.exports = nextConfig
