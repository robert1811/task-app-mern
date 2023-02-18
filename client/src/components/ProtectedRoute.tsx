import { Navigate, Outlet } from 'react-router-dom'

interface Props {
    isAuth: boolean,
    children: React.ReactNode
}

const ProtectedRoute = ({isAuth, children}: Props) => {
    if(!isAuth) return <Navigate to="/login" />
    return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute