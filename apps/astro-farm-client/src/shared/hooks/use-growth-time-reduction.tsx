import { useMutation, useQueryClient } from '@tanstack/react-query'
import { growthTimeReductionBoost } from '../api/game'

export const useGrowthTimeReduction = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: growthTimeReductionBoost,
        onSuccess: data => {
            queryClient.setQueryData(['auth', 'game'], data)
        },
    })
}
