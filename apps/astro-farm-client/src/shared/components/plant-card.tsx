import { PropsWithChildren } from 'react'
import { Typography, Image } from '../ui'
import {
    IGC_NAME,
    Seed,
    SeedId,
    getSeed,
    getUpgradedSeed,
    isSeedUnlocked,
} from '@astro/astro-farm-game-core'
import { useGame } from '../hooks/use-game'
import { InfoIcon } from '../../assets/svg'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { cn, WithClassName } from '@astro/client-cn'
import { formatTime } from '../utils/formatters'

interface PlantTooltipItemProps {
    title: string
    value: string | number
    imagePath: string
}

interface PlantTooltipProps {
    seed: Seed
}

// interface PlantStatItemProps extends WithClassName {
//     imagePath: string
//     value: string | number
// }

interface PlantCardProps extends PropsWithChildren, WithClassName {
    seedId: SeedId
}

const ImageBackground = () => {
    return (
        <div className='absolute left-1/2 top-1/2 z-10 aspect-square h-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7EA9FF] blur-xl' />
    )
}

const PlantCardCounter = ({ seedId }: { seedId: SeedId }) => {
    const { data: game } = useGame()
    const count = game?.seedInventory[seedId] || 0

    return (
        <div className='absolute bottom-0 right-2 z-30'>
            <Typography className='text-sm font-bold'>x{count}</Typography>
        </div>
    )
}

const InfoButton = ({ seedId }: { seedId: SeedId }) => {
    const { data: game } = useGame()
    if (!game) return null
    const isUnlocked = isSeedUnlocked(seedId, game.xp)

    if (!isUnlocked) {
        return (
            <div className='absolute right-0 top-0 z-30 w-4 cursor-pointer'>
                <InfoIcon />
            </div>
        )
    }

    return (
        <PopoverButton
            tabIndex={-1}
            className='absolute right-0 top-0 z-30 w-4 cursor-pointer focus:outline-none'
        >
            <InfoIcon />
        </PopoverButton>
    )
}

// const PlantStatItem = ({ imagePath, value, className }: PlantStatItemProps) => {
//     return (
//         <div className={cn('flex flex-col items-center', className)}>
//             <Image path={imagePath} className='w-auto' />
//             <Typography className='mt-1 text-center text-[11px] font-bold'>{value}</Typography>
//         </div>
//     )
// }

const PlantTooltipItem = ({ title, value, imagePath }: PlantTooltipItemProps) => {
    return (
        <div className='flex items-center gap-2 rounded-xl bg-[#CCBFFF] px-2 py-1'>
            <Image path={imagePath} className='h-6' />
            <div className='flex flex-col '>
                <Typography className='text-xs font-bold text-[#2F006D]'>{title}</Typography>
                <Typography className='text-sm font-extrabold text-white'>{value}</Typography>
            </div>
        </div>
    )
}

const PlantTooltip = ({ seed }: PlantTooltipProps) => {
    return (
        <PopoverPanel
            anchor={{
                to: 'bottom',
                gap: 8,
                padding: 8,
            }}
            className='rounded-xl bg-[#E7E7FF] shadow-[0px_1px_1px_rgba(22,5,129,0.7),inset_0px_-2px_0.5px_rgba(175,165,218,0.8)]'
        >
            <div className='grid grid-cols-2 gap-2 p-2'>
                <PlantTooltipItem
                    title='Growth Time'
                    value={formatTime(seed.growthTime)}
                    imagePath='plant-card/growth_time.png'
                />
                <PlantTooltipItem
                    title='Energy Cost'
                    value={-seed.plantEnergy}
                    imagePath='plant-card/energy.png'
                />
                <PlantTooltipItem
                    title={IGC_NAME}
                    value={seed.igcYield}
                    imagePath='plant-card/igc.png'
                />
                <PlantTooltipItem
                    title='XP Gain'
                    value={seed.xpGain}
                    imagePath='plant-card/xp.png'
                />
                <PlantTooltipItem
                    title='Seed Recovery'
                    value={seed.recoveryRate * 100 + '%'}
                    imagePath='plant-card/recovery.png'
                />
            </div>
        </PopoverPanel>
    )
}

export const PlantCard = ({ seedId, children, className }: PlantCardProps) => {
    const { data: game } = useGame()
    if (!game) return null
    const seed = getUpgradedSeed(seedId, game)

    return (
        <div className={cn('rounded-xl border border-[#170062] bg-[#5700FF] p-1', className)}>
            <div className='border-b border-[#D9DAFF] pb-1.5'>
                <Typography variant='h1' className='truncate text-center' textStroke='#2500A3'>
                    {seed.name}
                </Typography>
            </div>
            <div className='relative my-2 flex justify-center'>
                <Image
                    path={`plants/${seed.type}/icons/${seed.type}_${seed.level}.png`}
                    className='z-20 h-16 w-auto'
                />
                <ImageBackground />
                <PlantCardCounter seedId={seedId} />
                <Popover>
                    <InfoButton seedId={seedId} />
                    <PlantTooltip seed={seed} />
                </Popover>
            </div>

            {/* <div className='mt-2 grid grid-cols-6 grid-rows-2 gap-2 px-2'>
                <PlantStatItem
                    imagePath='plant-card/growth_time.png'
                    value={formatTime(seed.growthTime)}
                    className='col-span-2 col-start-2'
                />

                <PlantStatItem
                    imagePath='plant-card/energy.png'
                    value={-seed.plantEnergy}
                    className='col-span-2 col-start-4'
                />
                <PlantStatItem
                    imagePath='plant-card/xp.png'
                    value={seed.xpGain}
                    className='col-span-2 col-start-1'
                />

                <PlantStatItem
                    imagePath='plant-card/igc.png'
                    value={seed.igcYield}
                    className='col-span-2 col-start-3'
                />

                <PlantStatItem
                    imagePath='plant-card/recovery.png'
                    value={seed.recoveryRate * 100}
                    className='col-span-2 col-start-5'
                />
            </div> */}

            {children && <div className='mt-2'>{children}</div>}
        </div>
    )
}
