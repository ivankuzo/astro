import { useEffect, useState } from 'react'
import { calculateCurrentEnergy, ENERGY_CAPACITY_LEVELS } from '@astro/astro-farm-game-core'
import { useGame } from '../../shared/hooks'

export const useCurrentEnergy = () => {
    const { data: game } = useGame()

    const initialEnergy = calculateCurrentEnergy(game!)
    const [currentEnergy, setCurrentEnergy] = useState(initialEnergy)

    useEffect(() => {
        const updateEnergy = () => {
            const energy = calculateCurrentEnergy(game!)
            setCurrentEnergy(energy)
        }

        updateEnergy()

        const interval = setInterval(updateEnergy, 1000)

        return () => clearInterval(interval)
    }, [game])

    return {
        currentEnergy,
        maxEnergy: ENERGY_CAPACITY_LEVELS[game!.dome.energyCapacity].capacity,
    }
}
