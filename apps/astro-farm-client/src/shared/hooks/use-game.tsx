import { useAuthStatus } from '@astro/session-client'
import { useQuery } from '@tanstack/react-query'
import { getGame } from '../api/game'

export const useGame = () => {
    const authStatus = useAuthStatus()
    return useQuery({
        queryKey: ['auth', 'game'],
        queryFn: getGame,
        enabled: authStatus,
        placeholderData: previousData => previousData,
        staleTime: Infinity,
    })
}
