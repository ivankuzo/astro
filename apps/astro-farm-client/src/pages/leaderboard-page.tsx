import { LeaderboardEntry } from '@astro/astro-farm-api-contracts'
import { GameContentLayout } from '../layouts/content'
import { Typography, Image } from '../shared/ui'
import { truncateAddress } from '../shared/utils/formatters'
import { useLeaderboard } from '../shared/hooks/use-leaderboard'

const LeaderboardItem = ({
    walletAddress,
    xp,
    position,
}: LeaderboardEntry & { position: number }) => {
    return (
        <div className='flex items-center py-2'>
            <div className='w-2/12'>
                <Typography textStroke='black' variant='p' className='text-center'>
                    {position}
                </Typography>
            </div>
            <div className='w-6/12'>
                <Typography textStroke='black' variant='p' className='text-center'>
                    {truncateAddress(walletAddress)}
                </Typography>
            </div>

            <div className='flex w-4/12 items-center gap-2'>
                <Image path='xp.png' className='h-6' />
                <Typography textStroke='black' variant='p' className='text-center'>
                    {xp}
                </Typography>
            </div>
        </div>
    )
}

const LeaderboardList = () => {
    const { data } = useLeaderboard()
    return (
        <div className='mt-4 w-full max-w-xl divide-y-2 divide-black/20'>
            {data?.map((item, index) => (
                <LeaderboardItem key={item.walletAddress} {...item} position={index + 1} />
            ))}
        </div>
    )
}

export const LeaderboardPage = () => {
    return (
        <GameContentLayout className='flex flex-col items-center px-4'>
            <Typography textStroke='black' variant='h1' className='text-center text-4xl'>
                Leaderboard
            </Typography>
            <LeaderboardList />
        </GameContentLayout>
    )
}
