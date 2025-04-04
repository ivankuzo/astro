import { useMutation, useQueryClient } from '@tanstack/react-query'
import { plant } from '../api/game'

export const usePlant = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: plant,
        onSuccess: data => {
            queryClient.setQueryData(['auth', 'game'], data)
        },
    })
}
