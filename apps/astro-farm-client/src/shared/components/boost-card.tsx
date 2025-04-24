import { PropsWithChildren } from 'react'
import { Typography } from '../ui/typography'
import { Image } from '../ui/image'
import { cn, WithClassName } from '@astro/client-cn'
import { useGame } from '../hooks/use-game'
import { Boost, getBoostId } from '@astro/astro-farm-game-core'

interface BoostCardProps extends PropsWithChildren, WithClassName {
    boost: Boost
}

export const BoostCard = ({ boost, children, className }: BoostCardProps) => {
    const { data: game } = useGame()
    const boostId = getBoostId(boost)
    const count = game?.boostInventory[boostId] || 0
    const imagePath = `boosts/${boostId}.png`
    const { name, description } = boost

    return (
        <div
            className={cn(
                'relative rounded-2xl border-2 border-[#312361] bg-[#5700FF] p-4',
                className
            )}
        >
            <div className='flex items-start gap-4'>
                <div className='relative h-28 w-1/3'>
                    <Image path={imagePath} />
                    <div className='absolute bottom-0 right-0'>
                        <Typography className='font-bold'>x{count}</Typography>
                    </div>
                </div>

                <div className='flex w-2/3 flex-col'>
                    <Typography className='text-xl' textStroke='#2500A3'>
                        {name}
                    </Typography>
                    <Typography className='text-sm'>{description}</Typography>
                </div>
            </div>

            {children && <div className='mt-2 flex justify-end'>{children}</div>}
        </div>
    )
}
