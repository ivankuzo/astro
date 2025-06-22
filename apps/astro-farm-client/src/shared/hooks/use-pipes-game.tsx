import { useAuthStatus } from '@astro/session-client'
import { useQuery } from '@tanstack/react-query'
import { getPipesGame } from '../api/pipes'

export const usePipesGame = () => {
    const authStatus = useAuthStatus()
    return useQuery({
        queryKey: ['auth', 'pipes-game'],
        queryFn: getPipesGame,
        enabled: authStatus,
        placeholderData: previousData => previousData,
        staleTime: Infinity,
    })
}
