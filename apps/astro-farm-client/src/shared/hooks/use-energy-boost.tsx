import { useMutation, useQueryClient } from '@tanstack/react-query'
import { energyBoost } from '../api/game'

export const useEnergyBoost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: energyBoost,
        onSuccess: data => {
            queryClient.setQueryData(['auth', 'game'], data)
        },
    })
}
