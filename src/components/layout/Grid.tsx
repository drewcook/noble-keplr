// TailwindCSS has issues parsing dynamic values, so we manually map them to the hardcoded values in these components

type ColumnsType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type GapType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type GridContainerProps = {
	children: React.ReactNode
	className?: string
	columns?: ColumnsType
	mdColumns?: ColumnsType | 0
	lgColumns?: ColumnsType | 0
	gap?: GapType
}

type GridColumnProps = {
	children: React.ReactNode
	className?: string
	span?: ColumnsType
	mdSpan?: ColumnsType | 0
}

/**
 * Utility function to concatenate class names, filtering out empty values
 * @param classes - Array of class names to concatenate
 * @returns Space-separated string of non-empty class names
 */
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

/**
 * Grid Container Component
 * @param children - The children to render inside the column
 * @param className - Any additional classes to apply
 * @param columns - The number of columns the container should support
 * @param gap - The gap between columns
 * @returns A grid container component
 */
export function GridContainer({
	children,
	className = '',
	columns = 1,
	mdColumns = 0,
	lgColumns = 0,
	gap = 4,
}: GridContainerProps) {
	const colsClassName = {
		1: 'grid-cols-1',
		2: 'grid-cols-2',
		3: 'grid-cols-3',
		4: 'grid-cols-4',
		5: 'grid-cols-5',
		6: 'grid-cols-6',
		7: 'grid-cols-7',
		8: 'grid-cols-8',
		9: 'grid-cols-9',
		10: 'grid-cols-10',
		11: 'grid-cols-11',
		12: 'grid-cols-12',
	}[columns]

	const mdColsClassName = {
		0: '',
		1: 'md:grid-cols-1',
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-3',
		4: 'md:grid-cols-4',
		5: 'md:grid-cols-5',
		6: 'md:grid-cols-6',
		7: 'md:grid-cols-7',
		8: 'md:grid-cols-8',
		9: 'md:grid-cols-9',
		10: 'md:grid-cols-10',
		11: 'md:grid-cols-11',
		12: 'md:grid-cols-12',
	}[mdColumns]

	const lgColsClassName = {
		0: '',
		1: 'lg:grid-cols-1',
		2: 'lg:grid-cols-2',
		3: 'lg:grid-cols-3',
		4: 'lg:grid-cols-4',
		5: 'lg:grid-cols-5',
		6: 'lg:grid-cols-6',
		7: 'lg:grid-cols-7',
		8: 'lg:grid-cols-8',
		9: 'lg:grid-cols-9',
		10: 'lg:grid-cols-10',
		11: 'lg:grid-cols-11',
		12: 'lg:grid-cols-12',
	}[lgColumns]

	const gapClass = {
		1: 'gap-1',
		2: 'gap-2',
		3: 'gap-3',
		4: 'gap-4',
		5: 'gap-5',
		6: 'gap-6',
		7: 'gap-7',
		8: 'gap-8',
	}[gap]

	return (
		<div className={cn('grid', colsClassName, mdColsClassName, lgColsClassName, gapClass, className)}>{children}</div>
	)
}

/**
 * Grid Column Component that supports responsive column spans
 * @param children - The children to render inside the column
 * @param className - Any additional classes to apply
 * @param smSpan - Number of columns to span at the small breakpoint (640px)
 * @param mdSpan - Number of columns to span at the medium breakpoint (768px)
 * @param lgSpan - Number of columns to span at the large breakpoint (1024px)
 * @returns A responsive grid column component
 * @example
 * // Basic usage with responsive breakpoints
 * <GridColumn
 *   mdSpan={6}   // Half width on tablet
 *   lgSpan={3}   // Quarter width on desktop
 * >
 *   Content
 * </GridColumn>
 */
export function GridColumn({ children, className = '', span = 1, mdSpan = 0 }: GridColumnProps) {
	const spanClasses = {
		1: 'col-span-1',
		2: 'col-span-2',
		3: 'col-span-3',
		4: 'col-span-4',
		5: 'col-span-5',
		6: 'col-span-6',
		7: 'col-span-7',
		8: 'col-span-8',
		9: 'col-span-9',
		10: 'col-span-10',
		11: 'col-span-11',
		12: 'col-span-12',
	}[span]

	const mdSpanClassName = {
		0: '',
		1: 'md:col-span-1',
		2: 'md:col-span-2',
		3: 'md:col-span-3',
		4: 'md:col-span-4',
		5: 'md:col-span-5',
		6: 'md:col-span-6',
		7: 'md:col-span-7',
		8: 'md:col-span-8',
		9: 'md:col-span-9',
		10: 'md:col-span-10',
		11: 'md:col-span-11',
		12: 'md:col-span-12',
	}[mdSpan]

	return <div className={cn(spanClasses, mdSpanClassName, className)}>{children}</div>
}
