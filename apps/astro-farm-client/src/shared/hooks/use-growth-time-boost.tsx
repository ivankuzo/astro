import { useMutation, useQueryClient } from '@tanstack/react-query'
import { growthTimeBoost } from '../api/game'

export const useGrowthTimeBoost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: growthTimeBoost,
        onSuccess: data => {
            queryClient.setQueryData(['auth', 'game'], data)
        },
    })
}
