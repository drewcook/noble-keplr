type ContainerProps = {
	children: React.ReactNode
	className?: string
}

export default function Container({ children, className }: ContainerProps) {
	return <div className={`mx-auto w-full lg:max-w-6xl ${className}`}>{children}</div>
}
