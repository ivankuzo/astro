import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import { Typography } from '../../shared/ui'

export const WalletBadge = () => {
    const { address } = useAccount()
    const { open } = useAppKit()
    return (
        <button className='w-full rounded-2xl bg-[#7500F1] p-4 text-left' onClick={() => open()}>
            <Typography variant='p' className='font-semibold text-[#E6CFFF]'>
                Wallet
            </Typography>
            <Typography variant='p' className='w-full truncate font-semibold'>
                {address}
            </Typography>
        </button>
    )
}
