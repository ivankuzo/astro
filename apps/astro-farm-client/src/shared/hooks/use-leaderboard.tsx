import { useQuery } from '@tanstack/react-query'
import { getLeaderboard } from '../api/game'

export const useLeaderboard = () => {
    return useQuery({
        queryKey: ['leaderboard'],
        queryFn: getLeaderboard,
        staleTime: 20 * 1000,
    })
}
