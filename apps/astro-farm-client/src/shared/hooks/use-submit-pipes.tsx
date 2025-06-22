import { useMutation, useQueryClient } from '@tanstack/react-query'
import { submitPipesGameResult } from '../api/pipes'

export const useSubmitPipes = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: submitPipesGameResult,
        onSuccess: data => {
            queryClient.setQueryData(['auth', 'game'], data)
        },
    })
}
