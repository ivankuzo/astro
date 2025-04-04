import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upgradeDome } from '../api/game'

export const useUpgradeDome = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: upgradeDome,
        onSuccess: data => {
            queryClient.setQueryData(['auth', 'game'], data)
        },
    })
}
