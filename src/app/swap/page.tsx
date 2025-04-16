'use client'

import { useState } from 'react'

import { GridColumn, GridContainer } from '$/components/layout/Grid'

const SUB_NAVIGATION_ITEMS = [
	{ id: 'pools', label: 'Pools' },
	{ id: 'rates', label: 'Rates' },
] as const

export default function SwapPage() {
	// State
	const [activeTab, setActiveTab] = useState<(typeof SUB_NAVIGATION_ITEMS)[number]['id']>('pools')

	return (
		<GridContainer mdColumns={4}>
			<GridColumn>
				<aside aria-label="Swap Sidebar">
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
				{activeTab === 'pools' && (
					<section aria-label="Transfer Content">
						<div className="border-border border rounded-xl flex justify-center items-center min-h-100">Pools TBD</div>
					</section>
				)}
				{activeTab === 'rates' && (
					<section aria-label="Rates Content">
						<div className="border-border border rounded-xl flex justify-center items-center min-h-100">Rates TBD</div>
					</section>
				)}
			</GridColumn>
		</GridContainer>
	)
}
