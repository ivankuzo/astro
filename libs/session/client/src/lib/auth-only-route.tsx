import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from './use-auth-status'

export const AuthOnlyRoute = ({ to = '/login' }) => {
    const authStatus = useAuthStatus()
    return authStatus ? <Outlet /> : <Navigate to={to} />
}
