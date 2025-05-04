import { FieldNumber, getSeed, OccupiedField } from '@astro/astro-farm-game-core'
import { Button, Typography } from '../../shared/ui'
import { FieldTooltipLayout } from './field-tooltip-layout'
import { BoostPlantModal } from './boost-plant-modal'
import NiceModal from '@ebay/nice-modal-react'
import Countdown from 'react-countdown'
import { PlantStasLists } from './plant-stats-list'

interface ImmatureFieldTooltipProps {
    fieldNumber: FieldNumber
    field: OccupiedField
}

interface TimeRemainingProps {
    hours: number
    minutes: number
    seconds: number
}

const formatTimeRemaining = ({ hours, minutes, seconds }: TimeRemainingProps): string => {
    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`
    }
    if (minutes > 0) {
        return `${minutes}m ${seconds}s`
    }
    return `${seconds}s`
}

const MatureCountdown = ({ maturedUnix }: { maturedUnix: number }) => {
    const maturedDate = maturedUnix * 1000

    return (
        <Countdown
            date={maturedDate}
            renderer={props => (
                <Typography className='text-center text-[#06C000]' textStroke='#3D0087'>
                    {formatTimeRemaining(props)}
                </Typography>
            )}
            onComplete={() => {
                NiceModal.hide(BoostPlantModal)
            }}
        />
    )
}

export const ImmatureFieldTooltip = ({ fieldNumber, field }: ImmatureFieldTooltipProps) => {
    return (
        <FieldTooltipLayout seedId={field.seedId}>
            <MatureCountdown maturedUnix={field.maturedUnix} />
            <div className='mt-2'>
                <PlantStasLists seedId={field.seedId} />
            </div>
            <Button
                variant='orange'
                onClick={() => NiceModal.show(BoostPlantModal, { fieldNumber })}
                className='mt-2'
            >
                Boost
            </Button>
        </FieldTooltipLayout>
    )
}
