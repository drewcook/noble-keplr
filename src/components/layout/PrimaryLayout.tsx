'use client'

import { useKeplrWallet } from '../KeplrWalletProvider'
import Notification from '../Notification'
import AppHeader from './AppHeader'
import Container from './Container'

export default function PrimaryLayout({ children }: { children: React.ReactNode }) {
	const { successMsg, errorMsg } = useKeplrWallet()

	return (
		<>
			<Container>
				<AppHeader />
				<main aria-label="App Main Content">{children}</main>
			</Container>
			{successMsg && <Notification isOpen variant="success" title={successMsg} />}
			{errorMsg && <Notification isOpen variant="error" title={errorMsg} />}
		</>
	)
}
