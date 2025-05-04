import { PropsWithChildren } from 'react'
import { Typography } from '../../shared/ui'
import { PopoverPanel } from '@headlessui/react'
import { cn } from '@astro/client-cn'
import { SeedId, getUpgradedSeed } from '@astro/astro-farm-game-core'
import { useGame } from '../../shared/hooks'

interface FieldTooltipProps extends PropsWithChildren {
    seedId: SeedId
}

export const FieldTooltipLayout = ({ seedId, children }: FieldTooltipProps) => {
    const { data: game } = useGame()
    if (!game) return null
    const seed = getUpgradedSeed(seedId, game)
    return (
        <PopoverPanel
            anchor={{
                to: 'top',
                gap: 12,
                padding: 8,
            }}
            className={cn(
                'rounded-2xl border border-black',
                'bg-[#25004D]/30',
                'p-4',
                'backdrop-blur-md',
                'flex flex-col items-center'
            )}
        >
            <Typography className='text-center' textStroke='#2B0063'>
                {seed.name}
            </Typography>
            {children}
        </PopoverPanel>
    )
}
