import { RefObject, useEffect } from 'react'

/**
 * Custom hook that handles clicking outside of a referenced element
 * @param ref - Reference to the element to monitor
 * @param handler - Callback function to execute when clicking outside
 */
export function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, handler: () => void) {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler()
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [ref, handler])
}
