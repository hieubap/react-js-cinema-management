const path = require("path");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  config.resolve.fallback = fallback;

  config.resolve = {
    ...config.resolve,
    alias: {
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/config": path.resolve(__dirname, "src/config"),
      "@/contexts": path.resolve(__dirname, "src/contexts"),
      "@/layouts": path.resolve(__dirname, "src/layouts"),
      "@/redux": path.resolve(__dirname, "src/redux"),
      "@/hooks": path.resolve(__dirname, "src/hooks"),
      "@/service": path.resolve(__dirname, "src/service"),
      "@/theme": path.resolve(__dirname, "src/theme"),
      "@/variables": path.resolve(__dirname, "src/variables"),
      "@/views": path.resolve(__dirname, "src/views"),
      "@/routes": path.resolve(__dirname, "src/routes.js"),
      "@/utils": path.resolve(__dirname, "src/utils"),
      "@/*": path.resolve(__dirname, "src/*"),
    },
  };
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
};
