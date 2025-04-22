// URLs
export const BASE_API_URL = 'https://api.noble.xyz'

// Networks
export const SUPPORTED_NETWORKS = {
	NOBLE_MAINNET: {
		CHAIN_ID: 'noble-1',
		RPC_URL: 'https://noble-rpc.polkachu.com',
	},
	NOBLE_TESTNET: {
		CHAIN_ID: 'grand-1',
		RPC_URL: 'https://rpc.testnet.noble.xyz',
	},
}
export const PREFERRED_NETWORK = SUPPORTED_NETWORKS.NOBLE_TESTNET

// USDN
export const USDN_DENOM = 'uusdn'
export const USDN_DECIMALS = 6

// USDC (future proofing)
export const USDC_DENOM = 'uusdc'
export const USDC_DECIMALS = 6

// Other
export const DEFAULT_DECIMALS_PRECISION = 3
export const NOTIFICATION_DURATION_MS = 5000
