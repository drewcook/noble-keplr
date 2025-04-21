'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import { formatAddress } from '$/utils/formatters'

import { useClickOutside } from '../hooks/useClickOutside'
import { useKeplrWallet } from './KeplrWalletProvider'

export default function ConnectWalletButton() {
	// State
	const [isLoading, setIsLoading] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)

	// Hooks
	const { isConnected, address, connect, disconnect } = useKeplrWallet()
	useClickOutside(menuRef, () => setIsMenuOpen(false))

	// Handlers
	const handleConnectWallet = async () => {
		setIsLoading(true)
		try {
			await connect()
		} catch {
			console.error('[ConnectWalletButton]: Failed to connect to Keplr')
		} finally {
			setIsLoading(false)
		}
	}

	const handleDisconnectWallet = async () => {
		setIsLoading(true)
		try {
			await disconnect()
			setIsMenuOpen(false)
		} catch {
			console.error('[ConnectWalletButton]: Failed to disconnect from Keplr')
		} finally {
			setIsLoading(false)
		}
	}

	const handleButtonClick = () => {
		if (isConnected) {
			setIsMenuOpen(!isMenuOpen)
		} else {
			handleConnectWallet()
		}
	}

	return (
		<div className="relative" ref={menuRef}>
			<button
				onClick={handleButtonClick}
				disabled={isLoading}
				className={`
					flex items-center gap-2 hover:text-gray-400 transition-colors
					${isLoading ? 'opacity-75 cursor-not-allowed' : ''}
				`}
			>
				<div className="rounded-full p-3 bg-blue-50">
					<Image src="/icon_bank.svg" alt="Connect Wallet" height={18} width={18} />
				</div>
				{isLoading ? (
					<>
						<div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-purple animate-spin" />
						<span className="font-normal">Connecting...</span>
					</>
				) : (
					<span className="font-normal">{isConnected && address ? formatAddress(address) : 'Connect Wallet'}</span>
				)}
			</button>

			{isMenuOpen && isConnected && (
				<div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white border border-gray-100 py-1">
					<button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
						Profile
					</button>
					<button
						onClick={handleDisconnectWallet}
						className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
					>
						Disconnect
					</button>
				</div>
			)}
		</div>
	)
}
