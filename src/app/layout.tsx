import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { KeplrWalletProvider } from '$/components/KeplrWalletProvider'
import AppHeader from '$/components/layout/AppHeader'
import Container from '$/components/layout/Container'
import { NobleDollarStatsProvider } from '$/components/NobleDollarStatsProvider'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Noble - The new standard for digital asset issuance',
	description: 'We build liquidity infrastructure for asset issuers to participate in the Interchain economy',
}

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased max-w-full min-h-screen p-8`}>
				<KeplrWalletProvider>
					<NobleDollarStatsProvider>
						<Container>
							<AppHeader />
							<main aria-label="App Main Content">{children}</main>
						</Container>
					</NobleDollarStatsProvider>
				</KeplrWalletProvider>
			</body>
		</html>
	)
}
