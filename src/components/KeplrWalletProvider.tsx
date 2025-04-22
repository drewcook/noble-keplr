'use client'

import { AccountData, OfflineSigner } from '@cosmjs/proto-signing'
import { SigningStargateClient } from '@cosmjs/stargate'
import { KeplrFallback } from '@keplr-wallet/provider-extension'
import { ChainInfo, Keplr, Key } from '@keplr-wallet/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { Address } from 'viem'

import { PREFERRED_NETWORK } from '$/lib/constants'
import { displayDenom } from '$/utils/formatters'

type KeplrWalletProviderProps = {
	children: React.ReactNode
}

type KeplrWalletContextType = {
	isConnected: boolean
	address: Address | null
	account: Key | null
	connect: () => Promise<void>
	disconnect: () => Promise<void>
	getBalance: (denom: string) => Promise<string>
	successMsg: string
	errorMsg: string
}

// Context
const defaultValues: KeplrWalletContextType = {
	isConnected: false,
	address: null,
	account: null,
	connect: async () => {},
	disconnect: async () => {},
	getBalance: async () => '',
	successMsg: '',
	errorMsg: '',
}
const KeplrWalletContext = createContext<KeplrWalletContextType>(defaultValues)

// Provider Component
export const KeplrWalletProvider = ({ children }: KeplrWalletProviderProps) => {
	// State
	const [isConnected, setIsConnected] = useState(defaultValues.isConnected)
	const [keplrInstance, setKeplrInstance] = useState<Keplr | null>(null)
	const [account, setAccount] = useState<Key | null>(defaultValues.account)
	const [address, setAddress] = useState(defaultValues.address)
	const [successMsg, setSuccessMsg] = useState(defaultValues.successMsg)
	const [errorMsg, setErrorMsg] = useState(defaultValues.errorMsg)

	// Get/Set Keplr Instance on init
	useEffect(() => {
		const keplr = getKeplr()
		if (keplr) {
			setKeplrInstance(keplr)
		}
	}, [])

	const getKeplr = (): Keplr | undefined => {
		if (typeof window === 'undefined') return undefined

		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
		if ((window as any).keplr) {
			return new KeplrFallback(() => {
				// Handler called when real Keplr is not installed.
				// Show appropriate warning to users.
				setErrorMsg(
					'Please install the Keplr Wallet extension to use Noble. (https://chromewebstore.google.com/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en)',
				)
			})
		}

		return undefined
	}

	const resetMessages = () => {
		setSuccessMsg('')
		setErrorMsg('')
	}

	const handleConnectWallet = async () => {
		if (!keplrInstance) return
		resetMessages()

		try {
			// Set up Keplr
			await keplrInstance.enable(PREFERRED_NETWORK.CHAIN_ID)

			// Suggest the preferred chain if user doesn't have it selected in Keplr
			try {
				const chainInfoWithoutEndpoints = await keplrInstance.getChainInfoWithoutEndpoints(PREFERRED_NETWORK.CHAIN_ID)
				const chainInfo: ChainInfo = {
					...chainInfoWithoutEndpoints,
					rpc: PREFERRED_NETWORK.RPC_URL,
					rest: PREFERRED_NETWORK.RPC_URL,
					// Just some TS finagling with this implementation. There's probably a better way to get a ChainInfo object for 'grand-1'
					evm: {
						chainId: parseInt(PREFERRED_NETWORK.CHAIN_ID), // NaN
						rpc: PREFERRED_NETWORK.RPC_URL,
					},
				}
				await keplrInstance.experimentalSuggestChain(chainInfo)
				setSuccessMsg('Wallet connected!')
			} catch (error) {
				setErrorMsg('Failed to suggest chain')
			}

			// Get the current account and address
			const key = await keplrInstance.getKey(PREFERRED_NETWORK.CHAIN_ID)
			if (key.ethereumHexAddress) {
				setIsConnected(true)
				setAccount(key)
				setAddress(key.ethereumHexAddress as Address)
			}

			setSuccessMsg('Wallet connected!')
		} catch {
			setErrorMsg('Failed to connect to Keplr')
		}
	}

	const handleDisconnectWallet = async () => {
		if (!keplrInstance) return
		resetMessages()

		try {
			await keplrInstance.disable()
			setIsConnected(false)
			setAddress(null)
			setSuccessMsg('Wallet disconnected!')
		} catch {
			setErrorMsg('Failed to disconnect from Keplr')
		}
	}

	const handleGetBalance = async (denom: string): Promise<string> => {
		if (!keplrInstance || (!isConnected && !address)) return ''

		try {
			// Create signing client
			const offlineSigner: OfflineSigner = window.getOfflineSigner!(PREFERRED_NETWORK.CHAIN_ID)
			const signingClient = await SigningStargateClient.connectWithSigner(PREFERRED_NETWORK.RPC_URL, offlineSigner)
			// Get balance for first account
			const account: AccountData = (await offlineSigner.getAccounts())[0]
			const balance = await signingClient.getBalance(account.address, denom)
			return balance.amount
		} catch {
			setErrorMsg(`Failed to get ${displayDenom(denom)} balance for ${address}`)
		}

		return ''
	}

	return (
		<KeplrWalletContext.Provider
			value={{
				isConnected,
				account,
				address,
				connect: handleConnectWallet,
				disconnect: handleDisconnectWallet,
				getBalance: handleGetBalance,
				successMsg,
				errorMsg,
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
