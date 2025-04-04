import { FieldNumber, getSeed, OccupiedField } from '@astro/astro-farm-game-core'
import { Button } from '../../shared/ui'
import { FieldActionTooltip } from './field-action-tooltip'
import { useHarvest } from '../../shared/hooks/use-harvest'

interface MatureFieldTooltipProps {
    fieldNumber: FieldNumber
    field: OccupiedField
    tooltipId: string
}

export const MatureFieldTooltip = ({ fieldNumber, field, tooltipId }: MatureFieldTooltipProps) => {
    const harvestMutation = useHarvest()
    const seed = getSeed(field.seedId)

    const handle = async () => {
        await harvestMutation.mutateAsync({
            body: {
                fieldNumber,
            },
        })
    }

    return (
        <FieldActionTooltip id={tooltipId} title={seed.name}>
            <Button
                variant='orange'
                onClick={handle}
                disabled={harvestMutation.isPending}
                className='mt-2'
            >
                Harvest
            </Button>
        </FieldActionTooltip>
    )
}
