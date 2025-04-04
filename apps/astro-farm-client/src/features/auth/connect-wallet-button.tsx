import { useAppKit } from '@reown/appkit/react'
import { Button } from '../../shared/ui'

export const ConnectWalletButton = () => {
    const { open } = useAppKit()
    return (
        <Button variant='purple' onClick={() => open()}>
            Connect Wallet
        </Button>
    )
}
