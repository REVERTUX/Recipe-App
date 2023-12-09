/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './dist', // Changes the build output directory to `./dist/`.
    reactStrictMode: true,
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '127.0.0.1:3000',
          pathname: '/files/**',
        },
      ],
    }
  }
   
  export default nextConfig