import {
    FieldNumber,
    getSeed,
    getUpgradedSeed,
    OccupiedField,
    Seed,
} from '@astro/astro-farm-game-core'
import { Button, Typography } from '../../shared/ui'
import { FieldTooltipLayout } from './field-tooltip-layout'
import { useHarvest } from '../../shared/hooks/use-harvest'
import { PlantStasLists } from './plant-stats-list'
import { toast } from 'sonner'
import { useGame } from '../../shared/hooks'
import { Image } from '../../shared/ui'

interface MatureFieldTooltipProps {
    fieldNumber: FieldNumber
    field: OccupiedField
}

const HarvestInfo = ({ seed, isSeedRecovered }: { seed: Seed; isSeedRecovered: boolean }) => {
    return (
        <div className='w-full font-bold'>
            <Typography className='text-center'>Received:</Typography>
            <div className='mt-2 grid w-full grid-cols-3'>
                <div className='inline-flex items-end justify-center'>
                    <Image path='igc.png' className='h-6' />
                    <Typography>{seed.igcYield}</Typography>
                </div>
                <div className='inline-flex items-end justify-center'>
                    <Image path='xp.png' className='h-6' />
                    <Typography>{seed.xpGain}</Typography>
                </div>
                <div className='inline-flex items-end justify-center'>
                    <Image
                        path={`plants/${seed.type}/icons/${seed.type}_${seed.level}.png`}
                        className='h-6'
                    />
                    <Typography>{isSeedRecovered ? 'x1' : 'x0'}</Typography>
                </div>
            </div>
        </div>
    )
}

export const MatureFieldTooltip = ({ fieldNumber, field }: MatureFieldTooltipProps) => {
    const { data: game } = useGame()
    const harvestMutation = useHarvest()
    if (!game) return null

    const handle = async () => {
        const initialSeedCount = game.seedInventory[field.seedId] || 0
        const seed = getUpgradedSeed(field.seedId, game)

        const updatedGame = await harvestMutation.mutateAsync({
            body: {
                fieldNumber,
            },
        })

        const updatedSeedCount = updatedGame.seedInventory[field.seedId] || 0
        const isSeedRecovered = updatedSeedCount > initialSeedCount

        toast(<HarvestInfo seed={seed} isSeedRecovered={isSeedRecovered} />)
    }

    return (
        <FieldTooltipLayout seedId={field.seedId}>
            <div className='mt-2'>
                <PlantStasLists seedId={field.seedId} />
            </div>
            <Button
                variant='orange'
                onClick={handle}
                disabled={harvestMutation.isPending}
                className='mt-2'
            >
                Harvest
            </Button>
        </FieldTooltipLayout>
    )
}
