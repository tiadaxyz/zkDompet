/* eslint-disable @typescript-eslint/no-non-null-assertion */

/**
 * Environment Variables defined in `.env.local`.
 * See `env.local.example` for documentation.
 */
export const env = {
  url:
    process.env.NEXT_PUBLIC_VERCEL_URL && process.env.NEXT_PUBLIC_VERCEL_ENV! === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_URL,
  isProduction: process.env.NEXT_PUBLIC_PRODUCTION_MODE === 'true',

  defaultChain: parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN!),
  supportedChains: JSON.parse(process.env.NEXT_PUBLIC_SUPPORTED_CHAINS!),

  rpcUrls: {
    1337: process.env.NEXT_PUBLIC_RPC_1337!, // Hardhat

    1: process.env.NEXT_PUBLIC_RPC_1!, // Ethereum Mainnet
    5: process.env.NEXT_PUBLIC_RPC_5!, // Goerli

    137: process.env.NEXT_PUBLIC_RPC_137!, // Polygon Mainnet
    80001: process.env.NEXT_PUBLIC_RPC_80001!, // Mumbai
  },
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  mumbai: {
    relayerApiKey: process.env.NEXT_PUBLIC_RELAYER_API_KEY,
    relayerSecretApiKey: process.env.NEXT_PUBLIC_RELAYER_SECRET_API_KEY,
    alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    polygonScan: process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY,
  },

  contract: {
    multisig: process.env.NEXT_PUBLIC_MULTISIG_CONTRACT || '',
    forwarder: process.env.NEXT_PUBLIC_MINIMALFORWARDER_CONTRACT || '',
    factory: process.env.NEXT_PUBLIC_FACTORY_CONTRACT || '',
    factoryOwner: process.env.NEXT_PUBLIC_FACTORYOWNER_CONTRACT || '',
    relayer: process.env.NEXT_PUBLIC_RELAYER_CONTRACT || '',
  },
  autotask: {
    apiKey: process.env.NEXT_PUBLIC_TEAM_API_KEY || '',
    apiSecret: process.env.NEXT_PUBLIC_TEAM_API_SECRET || '',
  },
}
