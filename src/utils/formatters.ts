import { Address, formatUnits } from 'viem'

import { DEFAULT_DECIMALS_PRECISION, USDN_DECIMALS } from '$/lib/constants'

import { toBigInt } from './bigint'

/**
 * Converts a value a string represented with USDN decimals
 * @param value The value to convert
 * @returns A formatted USDN string
 */
export const toUSDN = (value: string | number | bigint | undefined | null): string => {
	if (!value) return '-'
	return formatUnits(toBigInt(value), USDN_DECIMALS)
}

/**
 * Formats a number in compact notation and optionally in USD
 * @param value The number to format
 * @param decimals Number of decimal places
 * @param displayAsUSD Whether to display the number as USD
 * @returns A formatted string
 */
export const formatCompact = (
	value: number | string | null,
	decimals = DEFAULT_DECIMALS_PRECISION,
	displayAsUSD = false,
): string => {
	if (!value) return '-'

	let options: Intl.NumberFormatOptions = {
		notation: 'compact',
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	}

	if (displayAsUSD) {
		options = {
			...options,
			style: 'currency',
			currency: 'USD',
			currencyDisplay: 'narrowSymbol',
		}
	}

	return Intl.NumberFormat('en-US', options).format(Number(value)).toLowerCase()
}

/**
 * Formats a number with proper decimal places and optionally in USD
 * @param value The number to format
 * @param decimals Number of decimal places
 * @param displayAsUSD Whether to display the number as USD
 * @returns A formatted string with proper decimal places
 */
export const formatDecimal = (
	value: number | string | null,
	decimals = DEFAULT_DECIMALS_PRECISION,
	displayAsUSD = false,
): string => {
	if (!value) return '-'

	let options: Intl.NumberFormatOptions = {
		style: 'decimal',
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	}

	if (displayAsUSD) {
		options = {
			...options,
			style: 'currency',
			currency: 'USD',
			currencyDisplay: 'narrowSymbol',
		}
	}

	return Intl.NumberFormat('en-US', options).format(Number(value)).toLowerCase()
}

/**
 * Formats a number as a percentage with specified decimal places
 * @param value The number to format (e.g., 0.42 for 42%)
 * @param decimals Number of decimal places
 * @returns A formatted percentage string
 */
export const formatPercentage = (value: number | string | null, decimals = DEFAULT_DECIMALS_PRECISION): string => {
	if (!value) return '-'

	const options: Intl.NumberFormatOptions = {
		style: 'percent',
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	}

	return Intl.NumberFormat('en-US', options).format(Number(value))
}

/**
 * Abbreviates a wallet address to be more compact, showing the first 6 and the last 4 characters. This assumes passing an Ethereum hex address, however it supports any string.
 * @param address The wallet address
 * @returns An obfuscated address 0xABCD..........1234
 */
export const formatAddress = (address: Address | string | undefined): string => {
	if (!address) return ''
	return address.substring(0, 6) + '..........' + address.substring(address.length - 4)
}
