import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { RegisterScreen } from "../components/auth/RegisterScreen"
import { LoginScreen } from "../components/auth/LoginScreen"
import { HomeRouter } from "./HomeRouter"
import { PrivateRoute } from "./PrivateRoute"
import { Shipping } from "../components/cart/shipping/Shipping"
import { Payment } from "../components/cart/payment/Payment"
import { CartStepper } from "../components/ui/Stepper"

import { startChecking } from "../actions/auth"
import { cartInit } from "../actions/cart"


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
                    path="shipping"
                    element=
                    {
                        <>
                            <CartStepper />

                            <div className="container">
                                <PrivateRoute isAuthenticated={!!uid}>
                                    <Shipping />
                                </PrivateRoute>
                            </div>
                        </>
                    }
                />
                <Route
                    path="payment"
                    element=
                    {
                        <>
                            <CartStepper />

                            <div className="container">
                                <PrivateRoute isAuthenticated={!!uid}>
                                    <Payment />
                                </PrivateRoute>
                            </div>
                        </>
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
        </BrowserRouter >
    )
}