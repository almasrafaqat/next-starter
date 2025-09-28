import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains:
      process.env.NODE_ENV === "production"
        ? ["api.newyousports.shop"]
        : ["api.newyousports.shop", "127.0.0.1", "localhost", "tijaratplus.test", "randomuser.me"],
  },

  // Add any other configuration options here
};

export default withNextIntl(nextConfig);

// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin();

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   images: {
//     domains: ['127.0.0.1', 'localhost'],
//   },
// };

// export default withNextIntl(nextConfig);
