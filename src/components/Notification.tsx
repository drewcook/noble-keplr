'use client'

import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { LuCircleCheckBig, LuCircleX, LuInfo } from 'react-icons/lu'
import { PiWarning } from 'react-icons/pi'

import { NOTIFICATION_DURATION_MS } from '$/lib/constants'

type Props = {
	isOpen: boolean
	variant: 'success' | 'error' | 'warning' | 'info'
	title: string
	text?: string
	onClose?: () => void
}

export default function Notification({ isOpen, variant, title, text, onClose }: Props) {
	const [show, setShow] = useState(isOpen)

	useEffect(() => {
		if (show) {
			const timer = setTimeout(() => {
				handleClose()
			}, NOTIFICATION_DURATION_MS)
			return () => clearTimeout(timer)
		}
	}, [show])

	const handleClose = () => {
		setShow(false)
		if (onClose) onClose()
	}

	return (
		<>
			{/* Global notification live region, render this permanently at the end of the document */}
			<div
				aria-live="assertive"
				className="pointer-events-none fixed inset-0 flex items-start justify-center px-4 py-6 sm:p-6"
			>
				<div className="flex w-full flex-col items-center space-y-4">
					<Transition
						show={show}
						enter="transform ease-out duration-300 transition"
						enterFrom="translate-y-[-100%] opacity-0"
						enterTo="translate-y-0 opacity-100"
						leave="transform ease-in duration-200 transition"
						leaveFrom="translate-y-0 opacity-100"
						leaveTo="translate-y-[-100%] opacity-0"
					>
						<div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5">
							<div className="p-4">
								<div className="flex items-start">
									<div className="shrink-0">
										{variant === 'success' && <LuCircleCheckBig aria-hidden="true" className="size-6 text-success" />}
										{variant === 'error' && <LuCircleX aria-hidden="true" className="size-6 text-error" />}
										{variant === 'warning' && <PiWarning aria-hidden="true" className="size-6 text-warning" />}
										{variant === 'info' && <LuInfo aria-hidden="true" className="size-6 text-blue-400 " />}
									</div>
									<div className="ml-3 w-0 flex-1 pt-0.5">
										<p className="text-sm font-medium text-gray-900">{title}</p>
										{text && <p className="mt-1 text-sm text-gray-500">{text}</p>}
									</div>
									<div className="ml-4 flex shrink-0">
										<button
											type="button"
											onClick={handleClose}
											className="focus:outline-hidden inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											<span className="sr-only">Close</span>
											<CgClose aria-hidden="true" className="size-5" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	)
}
