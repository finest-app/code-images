const path = require("node:path");
const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  transpilePackages: ["geist"],
  experimental: {
    optimizePackageImports: ["shiki"],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "removeViewBox",
                    active: false,
                  },
                ],
              },
            },
          },
        ],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    // find the built-in loader
    const imageLoaderRule = config.module.rules.find((rule) => rule.loader === "next-image-loader");
    // make the loader ignore *.inline files
    imageLoaderRule.exclude = /\.inline\.(png|jpg|svg)$/i;

    // add a new URL loader for *.inline files
    config.module.rules.push({
      test: /\.inline\.(png|jpg|gif)$/i,
      use: [
        {
          loader: "url-loader",
        },
      ],
    });

    // Add the necessary fallbacks for the language detection model
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      encoding: false,
    };

    // Copy the language detection model to the public folder
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/@vscode/vscode-languagedetection/model/group1-shard1of1.bin",
            to: path.join(__dirname, "public/"),
          },
          {
            from: "node_modules/@vscode/vscode-languagedetection/model/model.json",
            to: path.join(__dirname, "public/"),
          },
        ],
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
