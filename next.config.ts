import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // env: {
  //   BASE_URL: process.env.BASE_URL, // pulls from .env file
  // },
  images: {
    domains: ["dummyjson.com"],
  },
};

export default nextConfig;
