const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repo = 'gitlost'; // your repo name

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  assetPrefix: isGithubPages ? `/${repo}/` : '',
  basePath: isGithubPages ? `/${repo}` : '',
}
 
module.exports = nextConfig 