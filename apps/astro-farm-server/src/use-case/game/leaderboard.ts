import { cache } from '@astro/server/redis'
import { getTop30ByXp } from '../../models/game/game.repo'
import { LeaderboardEntry } from '@astro/astro-farm-api-contracts'

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    return cache('leaderboard:top30xp', getTop30ByXp, 60)
}
