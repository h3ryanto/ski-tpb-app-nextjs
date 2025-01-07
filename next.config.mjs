/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xjmmjizaw0muiipq.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
