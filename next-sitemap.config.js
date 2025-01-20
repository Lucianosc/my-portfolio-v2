/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://lucianodev.xyz",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  outDir: "public",
  exclude: ["/api/*"],
};
