'use client'

import { Key } from '@keplr-wallet/types'
import { createContext, useContext, useState } from 'react'
import { Address } from 'viem'

import { NOBLE_TESTNET_CHAIN_ID } from '$/lib/constants'
import { getKeplr } from '$/lib/keplr'

type KeplrWalletProviderProps = {
	children: React.ReactNode
}

type KeplrWalletContextType = {
	isConnected: boolean
	address: Address | null
	account: Key | null
	connect: () => Promise<void>
	disconnect: () => Promise<void>
}

// Context
const defaultValues: KeplrWalletContextType = {
	isConnected: false,
	address: null,
	account: null,
	connect: async () => {},
	disconnect: async () => {},
}
const KeplrWalletContext = createContext<KeplrWalletContextType>(defaultValues)

// Provider Component
export const KeplrWalletProvider = ({ children }: KeplrWalletProviderProps) => {
	// State
	const [isConnected, setIsConnected] = useState(defaultValues.isConnected)
	const [account, setAccount] = useState<Key | null>(defaultValues.account)
	const [address, setAddress] = useState(defaultValues.address)

	const handleConnectWallet = async () => {
		try {
			const keplr = getKeplr()
			if (!keplr) return
			await keplr.enable(NOBLE_TESTNET_CHAIN_ID)
			const key = await keplr.getKey(NOBLE_TESTNET_CHAIN_ID)
			if (key.ethereumHexAddress) {
				setIsConnected(true)
				setAccount(key)
				setAddress(key.ethereumHexAddress as Address)
			}
		} catch {
			console.error('Failed to connect to Keplr')
		}
	}

	const handleDisconnectWallet = async () => {
		try {
			const keplr = getKeplr()
			if (!keplr) return
			await keplr.disable()
			setIsConnected(false)
			setAddress(null)
		} catch {
			console.error('Failed to disconnect from Keplr')
		}
	}

	return (
		<KeplrWalletContext.Provider
			value={{
				isConnected,
				account,
				address,
				connect: handleConnectWallet,
				disconnect: handleDisconnectWallet,
			}}
		>
			{children}
		</KeplrWalletContext.Provider>
	)
}

// Provider Hook
export const useKeplrWallet = () => {
	const context = useContext(KeplrWalletContext)
	if (context === undefined) {
		throw new Error('useKeplrWallet must be used within a KeplrWalletProvider component.')
	}
	return context
}
