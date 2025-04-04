import { useEffect, useState } from 'react'
import { FieldNumber } from '@astro/astro-farm-game-core'
import { useGame } from '../../shared/hooks'
import { getUnixTime } from 'date-fns'

export const useIsMature = (fieldNumber: FieldNumber) => {
    const { data: game, isLoading } = useGame()
    const [isMature, setIsMature] = useState<boolean | null>(null)

    useEffect(() => {
        if (!game) return

        const updateMaturity = () => {
            const field = game.fields[fieldNumber]

            if (!field) {
                setIsMature(null)
                return
            }

            const now = getUnixTime(new Date())
            setIsMature(now >= field.maturedUnix)
        }

        updateMaturity()

        const interval = setInterval(updateMaturity, 1000)

        return () => clearInterval(interval)
    }, [game, fieldNumber])

    return {
        isMature,
        isLoading,
    }
}
