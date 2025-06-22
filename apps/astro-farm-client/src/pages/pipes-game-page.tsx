import { useEffect, useRef, useCallback } from 'react'
import { createPhaserGame } from '../mini-games/pipes'
import { useNavigate } from 'react-router-dom'
import { useSubmitPipes } from '../shared/hooks/use-submit-pipes'
import { LevelMap } from '@astro/astro-farm-game-core'

export const PipesGamePage = () => {
    const gameContainerRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const submitPipes = useSubmitPipes()

    const handleGetReward = async (solution: LevelMap) => {
        await submitPipes.mutateAsync({ body: { solution } })
    }

    useEffect(() => {
        if (gameContainerRef.current) {
            const game = createPhaserGame(gameContainerRef.current)
            game.registry.set('onExit', () => navigate('/mini-games'))
            game.registry.set('onGetReward', handleGetReward)

            return () => {
                game.destroy(true)
            }
        }
    }, [navigate])

    return <div ref={gameContainerRef} className='m-0 h-screen w-screen overflow-hidden p-0' />
}
