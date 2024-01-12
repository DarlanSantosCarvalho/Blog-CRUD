/** @type {import('next').NextConfig} */
const nextConfig = {};

(module.exports = nextConfig),
  {
    pageExtensions: ["js", "jsx", "ts", "tsx"],
    webpack(config, { isServer }) {
      if (!isServer) {
        config.node = {
          fs: "empty",
        };
      }

      return config;
    },
  };
