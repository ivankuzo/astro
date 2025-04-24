import { useState } from 'react'
import { Typography } from '../../shared/ui/typography'
import { Image } from '../../shared/ui/image'
import { SeedType, SEEDS, Seed, getSeedIdBySeed, isSeedUnlocked } from '@astro/astro-farm-game-core'
import { PlantCard } from '../../shared/components/plant-card'
import { IGCButton } from '../../shared/components/igc-button'

import { MenuBackdrop } from '../../assets/svg'
import NiceModal from '@ebay/nice-modal-react'
import { BuySeedModal } from './buy-seed-modal'

import { useGame } from '../../shared/hooks'
import { cn } from '@astro/client-cn'

type SeedCategory = 'all' | SeedType

interface CategoryButtonProps {
    category: SeedCategory
    activeCategory: SeedCategory
    onClick: () => void
    icon: string
    label: string
}

const CategoryButton = ({
    category,
    activeCategory,
    onClick,
    icon,
    label,
}: CategoryButtonProps) => {
    const isActive = category === activeCategory

    return (
        <button
            onClick={onClick}
            className='relative flex w-full flex-col items-center justify-center py-2'
        >
            {isActive && (
                <div className='absolute inset-0 h-full'>
                    <MenuBackdrop className='absolute -bottom-2 w-full' />
                </div>
            )}
            <div className='relative z-10'>
                <Image path={icon} className='mx-auto h-8 w-8' />
                {isActive && (
                    <Typography className='mt-1 text-center text-xs font-bold'>{label}</Typography>
                )}
            </div>
        </button>
    )
}

const PlantCardBuy = ({ seed }: { seed: Seed }) => {
    const { data: game } = useGame()
    if (!game) return null
    const seedId = getSeedIdBySeed(seed)
    const isUnlocked = isSeedUnlocked(seedId, game.xp)
    return (
        <PlantCard seedId={seedId} className={cn(!isUnlocked && 'grayscale')}>
            {isUnlocked ? (
                <IGCButton
                    value={seed.price}
                    className='w-full'
                    onClick={() => NiceModal.show(BuySeedModal, { seedId })}
                />
            ) : (
                <div className='flex flex-col items-center'>
                    <Typography className='text-center  font-bold'>Required</Typography>
                    <Typography className='text-center  font-black'>
                        LEVEL {seed.levelRequired}
                    </Typography>
                </div>
            )}
        </PlantCard>
    )
}

const SeedContent = ({ category }: { category: SeedCategory }) => {
    const filteredSeeds = SEEDS.filter(seed => category === 'all' || seed.type === category)

    return (
        <div className='grid grid-cols-3 gap-2'>
            {filteredSeeds.map(seed => {
                return <PlantCardBuy key={getSeedIdBySeed(seed)} seed={seed} />
            })}
        </div>
    )
}

export const SeedsTab = () => {
    const [activeCategory, setActiveCategory] = useState<SeedCategory>('all')

    return (
        <div className='space-y-4'>
            <div className='mx-auto mb-8 grid max-w-md grid-cols-4 px-8'>
                <CategoryButton
                    category='all'
                    activeCategory={activeCategory}
                    onClick={() => setActiveCategory('all')}
                    icon='plant-types/all.png'
                    label='All'
                />
                <CategoryButton
                    category='solar'
                    activeCategory={activeCategory}
                    onClick={() => setActiveCategory('solar')}
                    icon='plant-types/solar.png'
                    label='Solar'
                />
                <CategoryButton
                    category='hydrogen'
                    activeCategory={activeCategory}
                    onClick={() => setActiveCategory('hydrogen')}
                    icon='plant-types/hydrogen.png'
                    label='Hydrogen'
                />
                <CategoryButton
                    category='carbon'
                    activeCategory={activeCategory}
                    onClick={() => setActiveCategory('carbon')}
                    icon='plant-types/carbon.png'
                    label='Carbon'
                />
            </div>
            <SeedContent category={activeCategory} />
        </div>
    )
}
