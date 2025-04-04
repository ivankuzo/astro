import { useMutation, useQueryClient } from '@tanstack/react-query'
import { energyRestoreBoost } from '../api/game'

export const useEnergyRestoreBoost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: energyRestoreBoost,
        onSuccess: data => {
            queryClient.setQueryData(['auth', 'game'], data)
        },
    })
}
