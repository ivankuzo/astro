import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ShopPage, DomePage, FieldsPage, PlayerPage, WalletPage, LoginPage } from '../../pages'
import { AuthOnlyRoute, GuestOnlyRoute } from '@astro/session-client'
import { GameShell } from '../../layouts/game-shell/game-shell'

const GameShellWrapper = () => (
    <GameShell>
        <Outlet />
    </GameShell>
)

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<GuestOnlyRoute to='/fields' />}>
                <Route path='/login' element={<LoginPage />} />
            </Route>

            <Route element={<AuthOnlyRoute to='/login' />}>
                <Route element={<GameShellWrapper />}>
                    <Route path='/shop' element={<ShopPage />} />
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
