import { PropsWithChildren } from 'react'
import { ErrorScreen } from '../../shared/components/error-screen'
import { LoadingScreen } from '../../shared/components/loading-screen'
import { useGame } from '../../shared/hooks'

export const GameLoader = ({ children }: PropsWithChildren) => {
    const { isLoading, isError, error } = useGame()
    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        return <ErrorScreen error={error} />
    }

    return children
}
