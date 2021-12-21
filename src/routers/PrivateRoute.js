import { Navigate, useLocation } from "react-router-dom";


export const PrivateRoute = ({ isAutenticated, children }) => {

    const { pathname, search } = useLocation();

    localStorage.setItem('lastPath', pathname + search);

    return isAutenticated
        ? children
        : <Navigate to="/login" />
}