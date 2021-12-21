import { Navigate } from "react-router-dom";


export const PublicRoute = ({ isAutenticated, children }) => {

    return isAutenticated
        ? <Navigate to="/" />
        : children
}