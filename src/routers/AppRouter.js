import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { RegisterScreen } from "../components/auth/RegisterScreen"
import { LoginScreen } from "../components/auth/LoginScreen"
import { ProductsScreen } from "../components/products/ProductsScreen"
import { startChecking } from "../actions/auth"
import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth)

    useEffect(() => { // Guarda la autenticación al recargar el navegador
        dispatch(startChecking())
    }, [dispatch]);

    if (checking) {
        return (<h5>Espere...</h5>);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="registro"
                    element=
                    {
                        <PublicRoute isAutenticated={!!uid}>
                            <RegisterScreen />
                        </PublicRoute>
                    }
                />
                <Route
                    path="login"
                    element=
                    {
                        <PublicRoute isAutenticated={!!uid}>
                            <LoginScreen />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/"
                    element=
                    {
                        <PrivateRoute isAutenticated={!!uid}>
                            <ProductsScreen />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}