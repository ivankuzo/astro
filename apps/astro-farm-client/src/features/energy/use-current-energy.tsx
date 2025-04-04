import { useEffect, useState } from 'react'
import { calculateCurrentEnergy, ENERGY_CAPACITY_LEVELS } from '@astro/astro-farm-game-core'
import { useGame } from '../../shared/hooks'
import { getLevelByXp } from '@astro/astro-farm-game-core'

export const useCurrentEnergy = () => {
    const { data: game, isLoading } = useGame()
    const [currentEnergy, setCurrentEnergy] = useState<number | null>(null)

    useEffect(() => {
        if (!game) return

        const updateEnergy = () => {
            const energy = calculateCurrentEnergy(
                game.energy,
                getLevelByXp(game.xp),
                game.dome.energyCapacity
            )
            setCurrentEnergy(energy)
        }

        updateEnergy()

        const interval = setInterval(updateEnergy, 1000)

        return () => clearInterval(interval)
    }, [game])

    return {
        currentEnergy,
        isLoading,
        maxEnergy: game ? ENERGY_CAPACITY_LEVELS[game.dome.energyCapacity].capacity : null,
    }
}
