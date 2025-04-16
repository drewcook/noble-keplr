'use client'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'

import { useClickOutside } from '../../hooks/useClickOutside'
import ConnectWalletButton from '../ConnectWalletButton'
import { GridColumn, GridContainer } from './Grid'

const NAVIGATION_ITEMS = [
	{ label: 'USDN', href: '/' },
	{ label: 'Points', href: '/points' },
	{ label: 'Swap', href: '/swap' },
] as const

export default function AppHeader() {
	// State
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const mobileMenuRef = useRef<HTMLDivElement>(null)
	const pathname = usePathname()

	// Hooks
	useClickOutside(mobileMenuRef, () => setIsMobileMenuOpen(false))

	// Helpers
	const isActiveLink = (href: string) => {
		if (href === '/') {
			return pathname === '/'
		}
		return pathname.startsWith(href)
	}

	return (
		<header className="mb-8">
			<GridContainer columns={4}>
				<GridColumn className="border-border border rounded-lg">
					<nav
						aria-label="Primary Navigation"
						className="relative flex flex-wrap items-center gap-2 h-full justify-between p-1"
					>
						<h1 className="sr-only">Noble Dollar</h1>
						<Image src="/logo.svg" alt="Noble" width={40} height={40} />

						{/* Mobile menu button */}
						<div className="flex items-center lg:hidden" ref={mobileMenuRef}>
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-500 focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
								aria-expanded={isMobileMenuOpen}
							>
								<span className="absolute -inset-0.5" />
								<span className="sr-only">{isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
								<Bars3Icon aria-hidden="true" className={`block size-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`} />
								<XMarkIcon aria-hidden="true" className={`block size-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`} />
							</button>

							{/* Mobile menu dropdown */}
							{isMobileMenuOpen && (
								<div className="absolute top-full left-0 mt-1 w-48 rounded-lg shadow-lg bg-white border border-gray-100 py-1 z-10">
									{NAVIGATION_ITEMS.map(item => (
										<Link
											href={item.href}
											key={item.href}
											onClick={() => setIsMobileMenuOpen(false)}
											className={`block px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
												isActiveLink(item.href) ? 'text-purple font-bold' : 'text-gray-700'
											}`}
										>
											{item.label}
										</Link>
									))}
								</div>
							)}
						</div>

						{/* Desktop navigation */}
						<ul className="hidden lg:flex flex-wrap items-center gap-2">
							{NAVIGATION_ITEMS.map(item => (
								<Link href={item.href} key={item.href}>
									<li
										className={`mr-2 hover:text-gray-400 transition-colors ${
											isActiveLink(item.href) ? 'text-purple font-bold' : ''
										}`}
									>
										{item.label}
									</li>
								</Link>
							))}
						</ul>
					</nav>
				</GridColumn>
				<GridColumn span={3} className="justify-self-end">
					<ConnectWalletButton />
				</GridColumn>
			</GridContainer>
		</header>
	)
}
