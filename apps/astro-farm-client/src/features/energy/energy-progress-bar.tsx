import { ProgressBar } from '../../shared/ui'
import { useCurrentEnergy } from './use-current-energy'

export const EnergyProgressBar = () => {
    const { currentEnergy, maxEnergy } = useCurrentEnergy()
    if (!currentEnergy || !maxEnergy) return null
    return (
        <ProgressBar
            value={Math.floor(currentEnergy)}
            maxValue={maxEnergy}
            variant='blue'
            showValue
            imagePath='energy.png'
        />
    )
}
