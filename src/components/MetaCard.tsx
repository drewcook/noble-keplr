type MetaCardProps = {
	primaryLabel: string
	primaryValue: string
	secondaryLabel?: string
	secondaryValue?: string
}

export default function MetaCard({ primaryLabel, primaryValue, secondaryLabel, secondaryValue }: MetaCardProps) {
	const hasSecondaryProps = secondaryLabel && secondaryValue
	const flexClass = hasSecondaryProps ? 'flex justify-between gap-4' : ''

	return (
		<div className="bg-blue-800 p-6 rounded-2xl">
			<div className={`${flexClass}`}>
				<div>
					<div className="text-eyebrow mb-3 text-sm">{primaryLabel}</div>
					<div className="text-lg text-white font-normal">{primaryValue}</div>
				</div>
				{hasSecondaryProps && (
					<div>
						<div className="text-eyebrow mb-3 text-sm">{secondaryLabel}</div>
						<div className="text-lg text-white font-normal">{secondaryValue}</div>
					</div>
				)}
			</div>
		</div>
	)
}
