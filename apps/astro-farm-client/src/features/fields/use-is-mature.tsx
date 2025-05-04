import { useEffect, useState } from 'react'
import { FieldNumber } from '@astro/astro-farm-game-core'
import { useGame } from '../../shared/hooks'
import { getUnixTime } from 'date-fns'

export const useIsMature = (fieldNumber: FieldNumber) => {
    const { data: game } = useGame()

    const field = game!.fields[fieldNumber]
    const initialIsMature = field ? getUnixTime(new Date()) >= field.maturedUnix : false

    const [isMature, setIsMature] = useState(initialIsMature)

    useEffect(() => {
        const updateMaturity = () => {
            const field = game!.fields[fieldNumber]

            if (!field) {
                setIsMature(false)
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
    }
}
