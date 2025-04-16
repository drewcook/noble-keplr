/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Window as KeplrWindow } from '@keplr-wallet/types'

declare global {
	interface Window extends KeplrWindow {}
}
