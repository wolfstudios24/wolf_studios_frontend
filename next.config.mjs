/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    esmExternals: 'loose',
   
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default config;
