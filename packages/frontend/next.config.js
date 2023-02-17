/* eslint-env node */
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }

    return config
  },
}

// eslint-disable-next-line
const withTM = require('next-transpile-modules')(['@zkdumpet/contracts']) // TODO

module.exports = withTM(nextConfig)
