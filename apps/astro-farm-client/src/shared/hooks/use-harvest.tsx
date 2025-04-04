import { useMutation, useQueryClient } from '@tanstack/react-query'
import { harvest } from '../api/game'

export const useHarvest = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: harvest,
        onSuccess: data => {
            queryClient.setQueryData(['auth', 'game'], data)
        },
    })
}
