import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ShopPage, DomePage, FieldsPage, PlayerPage, WalletPage, LoginPage } from '../../pages'
import { AuthOnlyRoute, GuestOnlyRoute } from '@astro/session-client'
import { GameShell } from '../../layouts/game-shell/game-shell'
import { useOnboarding } from '../../features/onboarding'

const GameShellWrapper = () => {
    useOnboarding()

    return (
        <GameShell>
            <Outlet />
        </GameShell>
    )
}

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<GuestOnlyRoute to='/fields' />}>
                <Route path='/login' element={<LoginPage />} />
            </Route>

            <Route element={<AuthOnlyRoute to='/login' />}>
                <Route element={<GameShellWrapper />}>
                    <Route path='/shop/:category' element={<ShopPage />} />
                    <Route path='/dome' element={<DomePage />} />
                    <Route path='/fields' element={<FieldsPage />} />
                    <Route path='/player' element={<PlayerPage />} />
                    <Route path='/wallet' element={<WalletPage />} />
                </Route>
            </Route>

            <Route path='*' element={<Navigate to='/fields' replace />} />
        </Routes>
    )
}

// declare global {
//     interface Window {
//         gtag?: (...args: any[]) => void
//     }
// }

// const location = useLocation()

// useEffect(() => {
//     if (window.gtag) {
//         window.gtag('config', 'G-B0EVK0LMTX', {
//             page_path: location.pathname + location.search,
//         })
//     }
// }, [location])
