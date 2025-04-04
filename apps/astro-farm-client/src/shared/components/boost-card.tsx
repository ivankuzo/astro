import { PropsWithChildren } from 'react'
import { Typography } from '../ui/typography'
import { Image } from '../ui/image'
import { cn, WithClassName } from '@astro/client-cn'
import { useGame } from '../hooks/use-game'
import { BoostType, getBoost } from '@astro/astro-farm-game-core'

interface BoostCardProps extends PropsWithChildren, WithClassName {
    boostType: BoostType
    variant?: 'lg' | 'sm'
}

export const BoostCard = ({ boostType, variant = 'lg', children, className }: BoostCardProps) => {
    const { data: game } = useGame()
    const count = game?.boostInventory[boostType] || 0
    const imagePath = `boosts/${boostType}.png`
    const { name, description } = getBoost(boostType)

    return (
        <div
            className={cn(
                'relative rounded-2xl border-2 border-[#312361] bg-[#5700FF]',
                variant === 'lg' ? 'p-4' : 'p-2',
                className
            )}
        >
            <div className={cn('flex items-start', variant === 'lg' ? 'gap-4' : 'gap-4')}>
                <div className={cn('relative', variant === 'lg' ? 'h-28' : 'w-1/3')}>
                    <Image path={imagePath} />
                    <div className='absolute bottom-0 right-0'>
                        <Typography className='font-bold'>x{count}</Typography>
                    </div>
                </div>

                <div className='flex w-full flex-col'>
                    <Typography className='text-xl' textStroke='#2500A3'>
                        {name}
                    </Typography>
                    <Typography className='text-sm'>{description}</Typography>
                </div>
            </div>

            {children && (
                <div className={cn(variant === 'lg' ? 'mt-2' : 'mt-2', 'flex justify-end')}>
                    {children}
                </div>
            )}
        </div>
    )
}
