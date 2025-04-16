/* eslint-disable @typescript-eslint/no-explicit-any */

import { KeplrFallback } from '@keplr-wallet/provider-extension'
import { Keplr } from '@keplr-wallet/types'

export const getKeplr = (): Keplr | undefined => {
	if (typeof window === 'undefined') {
		return undefined
	}

	if ((window as any).keplr) {
		return new KeplrFallback(() => {
			// Handler called when real Keplr is not installed.
			// Show appropriate warning to users.
			alert(
				'Please install the Keplr Wallet extension to use Noble. (https://chromewebstore.google.com/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en)',
			)
		})
	}

	return undefined
}
