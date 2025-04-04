import { PropsWithChildren } from 'react'
import { Typography, Image } from '../ui'
import { Seed, SeedId, getSeed, getSeedIdBySeed, isSeedUnlocked } from '@astro/astro-farm-game-core'
import { useGame } from '../hooks/use-game'
import { InfoIcon } from '../../assets/svg'
import { Tooltip } from 'react-tooltip'
import { cn, WithClassName } from '@astro/client-cn'

const formatGrowthTime = (seconds: number) => {
    if (seconds < 60) {
        return `${seconds}s`
    } else if (seconds < 3600) {
        return `${Math.floor(seconds / 60)}m`
    } else if (seconds < 86400) {
        return `${Math.floor(seconds / 3600)}h`
    } else {
        return `${Math.floor(seconds / 86400)}d`
    }
}

interface PlantTooltipItemProps {
    title: string
    value: string
    imagePath: string
}

interface PlantTooltipProps {
    seed: Seed
}

interface PlantStatItemProps {
    imagePath: string
    value: string | number
}

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
    const tooltipId = `plant-info-tooltip-${seedId}`
    const { data: game } = useGame()
    if (!game) return null
    const isUnlocked = isSeedUnlocked(seedId, game.xp)

    return (
        <div
            className='absolute right-0 top-0 z-30 w-5 cursor-pointer'
            data-tooltip-id={isUnlocked ? tooltipId : undefined}
        >
            <InfoIcon />
        </div>
    )
}

const PlantStatItem = ({ imagePath, value }: PlantStatItemProps) => {
    return (
        <div className='flex flex-col items-center'>
            <Image path={imagePath} />
            <Typography className='mt-1 text-center text-xs font-bold'>{value}</Typography>
        </div>
    )
}

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
    const tooltipId = `plant-info-tooltip-${getSeedIdBySeed(seed)}`

    return (
        <Tooltip
            id={tooltipId}
            className='!z-[100] !rounded-xl !bg-[#E7E7FF] !opacity-100 !shadow-[0px_1px_1px_rgba(22,5,129,0.7),inset_0px_-2px_0.5px_rgba(175,165,218,0.8)]'
            place='bottom'
            render={() => (
                <div className='grid grid-cols-2 gap-2'>
                    <PlantTooltipItem
                        title='XP Gain'
                        value={seed.xpGain.toString()}
                        imagePath='plant-card/xp.png'
                    />
                    <PlantTooltipItem
                        title='Growth Time'
                        value={formatGrowthTime(seed.growthTime)}
                        imagePath='plant-card/growth_time.png'
                    />
                    <PlantTooltipItem
                        title='IGC Yield'
                        value={seed.igcYield.toString()}
                        imagePath='plant-card/igc.png'
                    />
                    <PlantTooltipItem
                        title='Energy Cost'
                        value={(-seed.plantEnergy).toString()}
                        imagePath='plant-card/energy.png'
                    />
                </div>
            )}
        />
    )
}

export const PlantCard = ({ seedId, children, className }: PlantCardProps) => {
    const seed = getSeed(seedId)

    return (
        <div className={cn('rounded-xl border border-[#170062] bg-[#5700FF] p-2', className)}>
            <div className='border-b border-[#D9DAFF] pb-1.5'>
                <Typography
                    variant='h1'
                    className='truncate text-center text-lg font-black'
                    textStroke='#2500A3'
                >
                    {seed.name}
                </Typography>
            </div>
            <div className='relative mt-2 flex justify-center'>
                <Image
                    path={`plants/${seed.type}/icons/${seed.type}_${seed.level}.png`}
                    className='z-20 h-20  w-auto'
                />
                <ImageBackground />
                <PlantCardCounter seedId={seedId} />
                <InfoButton seedId={seedId} />
                <PlantTooltip seed={seed} />
            </div>

            <div className='mt-2 grid grid-cols-4 gap-1'>
                <PlantStatItem imagePath='plant-card/xp.png' value={seed.xpGain} />
                <PlantStatItem imagePath='plant-card/energy.png' value={-seed.plantEnergy} />
                <PlantStatItem
                    imagePath='plant-card/growth_time.png'
                    value={formatGrowthTime(seed.growthTime)}
                />
                <PlantStatItem imagePath='plant-card/igc.png' value={seed.igcYield} />
            </div>
            {children && <div className='mt-4'>{children}</div>}
        </div>
    )
}
