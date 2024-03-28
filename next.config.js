module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    API_POST_URL: process.env.API_POST_URL,
    AUTH_URL: process.env.AUTH_URL,
    SEARCH_URL: process.env.SEARCH_URL,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     "/": { page: "/" },
  //     "/about": { page: "/about" },
  //     "/glossary": { page: "/glossary" },
  //     "/resources": { page: "/resources" },
  //     "/admin": { page: "/admin" },
  //     "/contact": { page: "/contact" },
  //     "/search": { page: "/search" },
  //     "/login": { page: "/login" },
  //     "/plants": { page: "/plants" },
  //     "/plants/[id]": { page: "/plants/[id]" },
  //     "/families": { page: "/families" },
  //     "/home": {page: "/home"}
  //   }
  // },
  trailingSlash: true,
}