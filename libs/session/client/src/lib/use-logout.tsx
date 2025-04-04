import { useMutation, useQueryClient } from '@tanstack/react-query'

import { signOut } from './api'

export const useLogout = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
        },
    })
}
