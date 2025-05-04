import { PropsWithChildren, useState, useEffect } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { LoadingScreen } from '../../shared/components/loading-screen'
import { ErrorScreen } from '../../shared/components/error-screen'

export const PwaLoader = ({ children }: PropsWithChildren) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
        onOfflineReady() {
            setLoading(false)
        },
        onRegisterError(e) {
            console.error('Service Worker Error:', e)
            setError(e)
            setLoading(false)
        },
    })

    useEffect(() => {
        if (needRefresh) {
            updateServiceWorker(true)
        }
    }, [needRefresh, updateServiceWorker])

    useEffect(() => {
        if (loading && !offlineReady) {
            const timer = setTimeout(() => {
                setError(new Error('Timeout'))
                setLoading(false)
            }, 10000)

            return () => clearTimeout(timer)
        }
    }, [loading, offlineReady])

    if (loading && !offlineReady) {
        return <LoadingScreen />
    }

    if (error) {
        return <ErrorScreen error={error} />
    }

    return children
}
