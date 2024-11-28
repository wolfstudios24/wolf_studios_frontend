/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    esmExternals: 'loose',

  },
  images: {
    domains: ['res.cloudinary.com', "gravatar.com", "avatar.iran.liara.run"],
  },
};

export default config;
