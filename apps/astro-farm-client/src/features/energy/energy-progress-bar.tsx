import { ENERGY_REGEN } from '@astro/astro-farm-game-core'
import { ProgressBar, Typography } from '../../shared/ui'
import { useCurrentEnergy } from './use-current-energy'
import NiceModal from '@ebay/nice-modal-react'
import { EnergyBoostsModal } from '../inventory/energy-boosts-modal'

const EnergyRegenInfo = () => {
    const energyRegenPer5Minutes = ENERGY_REGEN * 60 * 5
    const text = `+${energyRegenPer5Minutes} energy / 5 min`

    return (
        <div className='absolute -top-6 left-0 ml-4'>
            <Typography className='text-xs' textStroke='black'>
                {text}
            </Typography>
        </div>
    )
}

export const EnergyProgressBar = () => {
    const { currentEnergy, maxEnergy } = useCurrentEnergy()
    return (
        <div className='relative w-full'>
            <EnergyRegenInfo />
            <div onClick={() => NiceModal.show(EnergyBoostsModal)}>
                <ProgressBar
                    value={Math.floor(currentEnergy)}
                    maxValue={maxEnergy}
                    variant='blue'
                    showValue
                    imagePath='energy-with-plus.png'
                />
            </div>
        </div>
    )
}
