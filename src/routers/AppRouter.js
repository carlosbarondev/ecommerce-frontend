import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { RegisterScreen } from "../components/auth/RegisterScreen"
import { LoginScreen } from "../components/auth/LoginScreen"
import { MainScreen } from "../components/main/MainScreen"
import { startChecking } from "../actions/auth"
import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"
import { Checkout } from "../components/products/Checkout"


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
                    path="/pago"
                    element=
                    {
                        <PrivateRoute isAutenticated={!!uid}>
                            <Checkout />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/*"
                    element=
                    {
                        <PrivateRoute isAutenticated={!!uid}>
                            <MainScreen />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}