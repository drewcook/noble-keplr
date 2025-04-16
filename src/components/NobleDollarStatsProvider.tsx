'use client'

import { Key } from '@keplr-wallet/types'
import { createContext, useContext, useEffect, useState } from 'react'

import { BASE_API_URL, USDN_DENOM } from '$/lib/constants'
import { toUSDN } from '$/utils/formatters'

type NobleDollarStatsProviderProps = {
	children: React.ReactNode
}

type NobleDollarStatsContextType = {
	totalSupply: string
	totalHolders: string
	totalPrincipal: string
	totalYieldAccrued: string
	getAccountBalance: (account: Key) => Promise<string>
}

// Context
const defaultValues: NobleDollarStatsContextType = {
	totalSupply: '',
	totalHolders: '',
	totalPrincipal: '',
	totalYieldAccrued: '',
	getAccountBalance: async () => '',
}
const NobleDollarStatsContext = createContext<NobleDollarStatsContextType>(defaultValues)

// Provider Component
export const NobleDollarStatsProvider = ({ children }: NobleDollarStatsProviderProps) => {
	// State
	const [totalSupply, setTotalSupply] = useState(defaultValues.totalSupply)
	const [totalHolders, setTotalHolders] = useState(defaultValues.totalHolders)
	const [totalPrincipal, setTotalPrincipal] = useState(defaultValues.totalPrincipal)
	const [totalYieldAccrued, setTotalYieldAccrued] = useState(defaultValues.totalYieldAccrued)

	// API Fetchers
	const getTotalSupply = async () => {
		const url = `${BASE_API_URL}/cosmos/bank/v1beta1/supply/by_denom?denom=${USDN_DENOM}`
		const response = await fetch(url)
		const data = await response.json()
		setTotalSupply(toUSDN(data.amount.amount))
	}

	const getStats = async () => {
		const url = `${BASE_API_URL}/noble/dollar/v1/stats`
		const response = await fetch(url)
		const data = await response.json()
		setTotalHolders(data.total_holders)
		setTotalPrincipal(toUSDN(data.total_principal))
		setTotalYieldAccrued(toUSDN(data.total_yield_accrued))
	}

	// NOTE: For some reason, this endpoint is returning zero even when passing in the correct testnet bech32 address
	const getAccountBalance = async (account: Key): Promise<string> => {
		const url = `${BASE_API_URL}/cosmos/bank/v1beta1/balances/${account.bech32Address}/by_denom?denom=${USDN_DENOM}`
		const response = await fetch(url)
		const data = await response.json()
		return toUSDN(data.balance.amount)
	}

	// TODO: Stub out other endpoints and expose them. f it expands to other tokens, rename the provider to represent that (i.e. TokenStatsProvider)

	useEffect(() => {
		getStats()
		getTotalSupply()
	}, [])

	return (
		<NobleDollarStatsContext.Provider
			value={{
				totalSupply,
				totalHolders,
				totalPrincipal,
				totalYieldAccrued,
				getAccountBalance,
			}}
		>
			{children}
		</NobleDollarStatsContext.Provider>
	)
}

// Provider Hook
export const useNobleDollarStats = () => {
	const context = useContext(NobleDollarStatsContext)
	if (context === undefined) {
		throw new Error('useNobleDollarStats must be used within a NobleDollarStatsProvider component.')
	}
	return context
}
