const dotenv = require("dotenv");
dotenv.config();

// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        url: false,
        http: false,
        https: false,
        zlib: false,
      };
      return webpackConfig;
    },
  },
};
