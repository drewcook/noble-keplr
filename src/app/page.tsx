'use client'

import { useEffect, useState } from 'react'

import { useKeplrWallet } from '$/components/KeplrWalletProvider'
import { GridColumn, GridContainer } from '$/components/layout/Grid'
import { useNobleDollarStats } from '$/components/NobleDollarStatsProvider'
import { formatCompact, formatDecimal, formatPercentage } from '$/utils/formatters'

import MetaCard from '../components/MetaCard'

const SUB_NAVIGATION_ITEMS = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'balances', label: 'Balances' },
] as const

export default function DashboardPage() {
	// State
	const [activeTab, setActiveTab] = useState<(typeof SUB_NAVIGATION_ITEMS)[number]['id']>('overview')
	const [usdnBalance, setUSDNBalance] = useState<string>('')
	// Hooks
	const { totalSupply, totalHolders, totalYieldAccrued, getAccountBalance } = useNobleDollarStats()
	const { isConnected, account } = useKeplrWallet()

	// Effects
	// Fetch the USDN balance for the connected address
	useEffect(() => {
		const fetchUSDNBalance = async () => {
			if (isConnected && account) {
				const balance = await getAccountBalance(account)
				setUSDNBalance(balance)
			}
		}
		fetchUSDNBalance()
	}, [account, isConnected]) /* eslint-disable-line react-hooks/exhaustive-deps */

	return (
		<GridContainer mdColumns={4}>
			<GridColumn>
				<aside aria-label="Dashboard Sidebar">
					<nav aria-label="Secondary Navigation" className="rounded-xl py-6 px-3 border-border border">
						<ul className="flex flex-col gap-2">
							{SUB_NAVIGATION_ITEMS.map(({ id, label }) => (
								<li
									key={id}
									onClick={() => setActiveTab(id)}
									className={`
										rounded-lg
										py-3.5 px-3
										cursor-pointer
										transition-colors
										${activeTab === id ? 'bg-blue-800 text-white' : 'hover:bg-blue-50'}
										`}
								>
									{label}
								</li>
							))}
						</ul>
					</nav>
				</aside>
			</GridColumn>
			<GridColumn mdSpan={3}>
				{activeTab === 'overview' && (
					<section aria-label="Overview Content">
						<section
							aria-label="Hero Banner"
							className="bg-hero font-normal text-white mb-4 rounded-2xl py-14 px-6 flex flex-col justify-center items-center"
						>
							<h2 className="mb-4 text-2xl text-center">Noble Dollar, $USDN, is live!</h2>
							<a href="https://dollar.noble.xyz/?action=onramp" target="_blank">
								<button className="bg-purple p-2 rounded-lg w-[168px] h-[52px] hover:bg-blue-800 transition-colors">
									Buy USDN
								</button>
							</a>
						</section>

						<section aria-label="Account Balance" className="border-border border p-6 rounded-2xl mb-4">
							<div className="text-eyebrow mb-4">Your Balance</div>
							{isConnected ? (
								<div className="text-lg font-semibold">{formatDecimal(usdnBalance, 2, true)}</div>
							) : (
								<div className="text-lg font-semibold">Connect to view</div>
							)}
						</section>

						<section aria-label="Global Stats">
							<GridContainer mdColumns={2} lgColumns={3}>
								<GridColumn>
									<MetaCard primaryLabel="Total Supply" primaryValue={formatDecimal(totalSupply, 3, true)} />
								</GridColumn>
								<GridColumn>
									<MetaCard
										primaryLabel="Yield Paid"
										primaryValue={formatCompact(totalYieldAccrued, 1, true)}
										secondaryLabel="Estimated APY"
										secondaryValue={formatPercentage(0.0415, 1)}
									/>
								</GridColumn>
								<GridColumn>
									<MetaCard primaryLabel="Total Holders" primaryValue={formatDecimal(totalHolders, 0)} />
								</GridColumn>
							</GridContainer>
						</section>
					</section>
				)}

				{activeTab === 'balances' && (
					<section aria-label="Balances Content">
						<div className="border-border border rounded-xl flex justify-center items-center min-h-100">
							Balances TBD
						</div>
					</section>
				)}
			</GridColumn>
		</GridContainer>
	)
}
