import { useMutation, useQueryClient } from '@tanstack/react-query'
import { buySeeds } from '../api/game'

export const useBuySeeds = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: buySeeds,
        onSuccess: data => {
            queryClient.setQueryData(['auth', 'game'], data)
        },
    })
}
