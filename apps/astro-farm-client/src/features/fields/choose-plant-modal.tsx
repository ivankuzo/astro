import { SeedId, SeedType, SEEDS, FieldNumber, getSeed } from '@astro/astro-farm-game-core'
import { PlantCard } from '../../shared/components/plant-card'
import { Button } from '../../shared/ui/button'
import NiceModal from '@ebay/nice-modal-react'
import { ModalTabs } from '../../shared/components/modals'
import { usePlant } from '../../shared/hooks/use-plant'
import { useGame } from '../../shared/hooks/use-game'
import { Typography } from '../../shared/ui/typography'
import { Image } from '../../shared/ui/image'
import { useState } from 'react'
import { cn } from '@astro/client-cn'
import { NavLink } from 'react-router-dom'

const TabLabel = ({
    icon,
    label,
    isActive,
}: {
    icon: string
    label: string
    isActive: boolean
}) => (
    <div className='flex flex-col items-center'>
        <div className={cn('absolute', isActive ? '-top-3' : 'top-2')}>
            <Image path={icon} alt={label} className='h-8' />
        </div>
        {isActive && (
            <Typography className='absolute top-5' textStroke='#69009D'>
                {label}
            </Typography>
        )}
    </div>
)

const PlantCardPlant = ({ seedId, fieldNumber }: { seedId: SeedId; fieldNumber: FieldNumber }) => {
    const plantMutation = usePlant()
    const seed = getSeed(seedId)

    const handle = async () => {
        await plantMutation.mutateAsync({
            body: {
                fieldNumber,
                seedId,
            },
        })
        NiceModal.hide(ChoosePlantModal)
    }

    return (
        <PlantCard seedId={seedId}>
            <Button
                variant='orange'
                className='w-full gap-1 text-2xl'
                onClick={handle}
                disabled={plantMutation.isPending}
            >
                <Image path='energy.png' className='h-5' />
                <span>{seed.plantEnergy}</span>
            </Button>
        </PlantCard>
    )
}

const SeedContent = ({
    type,
    fieldNumber,
}: {
    type: SeedType | 'all'
    fieldNumber: FieldNumber
}) => {
    const modal = NiceModal.useModal()
    const { data: game } = useGame()

    if (!game) return null

    const { seedInventory } = game

    const availableSeeds = SEEDS.filter(seed => type === 'all' || seed.type === type).filter(
        seed => {
            const seedId = `${seed.type}_${seed.level}` as SeedId
            return seedInventory[seedId] > 0
        }
    )

    return (
        <div>
            {availableSeeds.length > 0 ? (
                <div className='grid grid-cols-3 gap-2'>
                    {availableSeeds.map(seed => {
                        const seedId = `${seed.type}_${seed.level}` as SeedId
                        return (
                            <PlantCardPlant
                                key={seedId}
                                seedId={seedId}
                                fieldNumber={fieldNumber}
                            />
                        )
                    })}
                </div>
            ) : (
                <div className='mt-8 flex flex-col items-center space-y-2'>
                    <Typography textStroke='black'>No seeds available</Typography>
                    <NavLink to='/shop/seeds' onClick={() => modal.remove()}>
                        <Button variant='blue'>Go To Shop</Button>
                    </NavLink>
                </div>
            )}
        </div>
    )
}

interface ChoosePlantModalProps {
    fieldNumber: FieldNumber
}

export const ChoosePlantModal = NiceModal.create(({ fieldNumber }: ChoosePlantModalProps) => {
    const [activeTab, setActiveTab] = useState<string>('all')

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId)
    }

    const getTabLabel = (id: string, icon: string, label: string) => {
        const isActive = activeTab === id
        return <TabLabel icon={icon} label={label} isActive={isActive} />
    }

    const tabs = [
        {
            id: 'all',
            label: getTabLabel('all', 'plant-types/all.png', 'All'),
            content: <SeedContent type='all' fieldNumber={fieldNumber} />,
        },
        {
            id: 'solar',
            label: getTabLabel('solar', 'plant-types/solar.png', 'Solar'),
            content: <SeedContent type='solar' fieldNumber={fieldNumber} />,
        },
        {
            id: 'carbon',
            label: getTabLabel('carbon', 'plant-types/carbon.png', 'Carbon'),
            content: <SeedContent type='carbon' fieldNumber={fieldNumber} />,
        },
        {
            id: 'hydrogen',
            label: getTabLabel('hydrogen', 'plant-types/hydrogen.png', 'Hydrogen'),
            content: <SeedContent type='hydrogen' fieldNumber={fieldNumber} />,
        },
    ]

    return (
        <ModalTabs
            title='CHOOSE A PLANT'
            className='h-[40vh] sm:h-[400px]'
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
        />
    )
})
