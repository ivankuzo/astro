import {
    FieldNumber,
    getSeed,
    OccupiedField as OccupiedFieldType,
} from '@astro/astro-farm-game-core'
import { useGame } from '../../shared/hooks/use-game'
import { Image } from '../../shared/ui'
import { getFieldPosition } from './utils'
import NiceModal from '@ebay/nice-modal-react'
import { ChoosePlantModal } from './choose-plant-modal'
import { useIsMature } from './use-is-mature'
import { MatureFieldTooltip } from './mature-field-tooltip'
import { ImmatureFieldTooltip } from './immature-field-tooltip'
import { LockedFieldModal } from './locked-field-modal'
import { Popover, PopoverButton } from '@headlessui/react'

interface OccupiedFieldProps {
    fieldNumber: FieldNumber
    field: OccupiedFieldType
}

interface FieldProps {
    col: number
    row: number
    fieldNumber: FieldNumber
}

const LockedField = () => {
    return (
        <Image
            path='field_locked.png'
            className='w-full'
            onClick={() => NiceModal.show(LockedFieldModal)}
        />
    )
}

const EmptyField = ({ fieldNumber }: { fieldNumber: FieldNumber }) => {
    return (
        <Image
            path='field.png'
            className='w-full'
            onClick={() => NiceModal.show(ChoosePlantModal, { fieldNumber })}
        />
    )
}

const OccupiedField = ({ fieldNumber, field }: OccupiedFieldProps) => {
    const { isMature } = useIsMature(fieldNumber)

    if (isMature) return <MatureField fieldNumber={fieldNumber} field={field} />
    else return <ImmatureField fieldNumber={fieldNumber} field={field} />
}

const ImmatureField = ({ fieldNumber, field }: OccupiedFieldProps) => {
    const seed = getSeed(field.seedId)

    return (
        <Popover>
            <PopoverButton>
                <Image path='field.png' className='w-full' />
            </PopoverButton>
            <Image
                path={`plants/${seed.type}/planted/${seed.type}_${seed.level}.png`}
                className='pointer-events-none absolute bottom-0 left-0 w-full'
            />
            <ImmatureFieldTooltip fieldNumber={fieldNumber} field={field} />
        </Popover>
    )
}

const MatureField = ({ fieldNumber, field }: OccupiedFieldProps) => {
    const seed = getSeed(field.seedId)

    return (
        <Popover>
            <PopoverButton>
                <Image path='field.png' className='w-full' />
            </PopoverButton>
            <Image
                path={`plants/${seed.type}/mature/${seed.type}_${seed.level}.png`}
                className='pointer-events-none absolute bottom-0 left-0 w-full'
            />

            <MatureFieldTooltip fieldNumber={fieldNumber} field={field} />
        </Popover>
    )
}

export const Field = ({ col, row, fieldNumber }: FieldProps) => {
    const { data: game } = useGame()

    if (!game) return null

    const field = game.fields[fieldNumber]
    const isLocked = fieldNumber > game.dome.totalUnlockedFields
    const hasPlant = Boolean(field)

    const positionStyle = getFieldPosition(col, row)

    return (
        <div className='absolute' style={positionStyle}>
            {isLocked ? (
                <LockedField />
            ) : hasPlant ? (
                <OccupiedField fieldNumber={fieldNumber} field={field as OccupiedFieldType} />
            ) : (
                <EmptyField fieldNumber={fieldNumber} />
            )}
        </div>
    )
}
