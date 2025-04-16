'use client'

import { useState } from 'react'

import { GridColumn, GridContainer } from '$/components/layout/Grid'

const SUB_NAVIGATION_ITEMS = [
	{ id: 'vaults', label: 'Vaults' },
	{ id: 'rewards', label: 'Rewards' },
] as const

export default function PointsPage() {
	// State
	const [activeTab, setActiveTab] = useState<(typeof SUB_NAVIGATION_ITEMS)[number]['id']>('vaults')

	return (
		<GridContainer mdColumns={4}>
			<GridColumn>
				<aside aria-label="Points Sidebar">
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
				{activeTab === 'vaults' && (
					<section aria-label="Vaults Content">
						<div className="border-border border rounded-xl flex justify-center items-center min-h-100">Vaults TBD</div>
					</section>
				)}
				{activeTab === 'rewards' && (
					<section aria-label="Rewards Content">
						<div className="border-border border rounded-xl flex justify-center items-center min-h-100">
							Rewards TBD
						</div>
					</section>
				)}
			</GridColumn>
		</GridContainer>
	)
}
