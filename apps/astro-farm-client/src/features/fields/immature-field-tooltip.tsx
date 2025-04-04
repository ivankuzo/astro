import { FieldNumber, getSeed, OccupiedField } from '@astro/astro-farm-game-core'
import { Button, Typography } from '../../shared/ui'
import { FieldActionTooltip } from './field-action-tooltip'
import { BoostPlantModal } from './boost-plant-modal'
import NiceModal from '@ebay/nice-modal-react'
import Countdown from 'react-countdown'

interface ImmatureFieldTooltipProps {
    fieldNumber: FieldNumber
    field: OccupiedField
    tooltipId: string
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
                <Typography className='text-[#06C000]' textStroke='#3D0087'>
                    {formatTimeRemaining(props)}
                </Typography>
            )}
            onComplete={() => {
                NiceModal.hide(BoostPlantModal)
            }}
        />
    )
}

export const ImmatureFieldTooltip = ({
    fieldNumber,
    field,
    tooltipId,
}: ImmatureFieldTooltipProps) => {
    const seed = getSeed(field.seedId)

    return (
        <FieldActionTooltip id={tooltipId} title={seed.name}>
            <MatureCountdown maturedUnix={field.maturedUnix} />
            <Button
                variant='orange'
                onClick={() => NiceModal.show(BoostPlantModal, { fieldNumber })}
                className='mt-2'
            >
                Boost
            </Button>
        </FieldActionTooltip>
    )
}
