import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from './use-auth-status'

export const GuestOnlyRoute = ({ to = '/' }) => {
    const authStatus = useAuthStatus()
    return !authStatus ? <Outlet /> : <Navigate to={to} />
}
