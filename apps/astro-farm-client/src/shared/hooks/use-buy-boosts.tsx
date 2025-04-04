import { useMutation, useQueryClient } from '@tanstack/react-query'
import { buyBoosts } from '../api/game'

export const useBuyBoosts = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: buyBoosts,
        onSuccess: data => {
            queryClient.setQueryData(['auth', 'game'], data)
        },
    })
}
