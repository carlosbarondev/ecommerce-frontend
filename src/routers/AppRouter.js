import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { RegisterScreen } from "../components/auth/RegisterScreen"
import { LoginScreen } from "../components/auth/LoginScreen"
import { CartScreen } from "../components/cart/CartScreen"
import { CartRouter } from "./CartRouter"
import { HomeRouter } from "./HomeRouter"

import { startChecking } from "../actions/auth"
import { cartInit } from "../actions/cart"
import { PrivateRoute } from "./PrivateRoute"


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => { // Restaura la autenticación al recargar el navegador
        dispatch(startChecking())
    }, [dispatch]);

    useEffect(() => { // Restaura el carrito de compras al recargar el navegador
        const oldCart = JSON.parse(localStorage.getItem('carrito'));
        if (oldCart)
            dispatch(cartInit(oldCart));
    }, [dispatch]);

    return (
        !checking &&
        <BrowserRouter>
            <Routes>
                <Route
                    path="registro"
                    element=
                    {
                        <RegisterScreen />
                    }
                />
                <Route
                    path="login"
                    element=
                    {
                        <LoginScreen />
                    }
                />
                <Route
                    path="cart"
                    element=
                    {
                        <CartScreen />
                    }
                />
                <Route
                    path="cart/*"
                    element=
                    {
                        <PrivateRoute isAuthenticated={!!uid}>
                            <CartRouter />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/*"
                    element=
                    {
                        <HomeRouter />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}