import { useEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { RegisterScreen } from "../components/auth/RegisterScreen"
import { LoginScreen } from "../components/auth/LoginScreen"
import { HomeRouter } from "./HomeRouter"
import { PrivateRoute } from "./PrivateRoute"
import { PanelRouter } from "./PanelRouter"
import { Shipping } from "../components/cart/shipping/Shipping"
import { Payment } from "../components/cart/payment/Payment"
import { CartStepper } from "../components/ui/Stepper"

import { startChecking } from "../actions/auth"
import { cartInit } from "../actions/cart"


export const AppRouter = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const { checking, uid } = useSelector(state => state.auth);
    const { carrito } = useSelector(state => state.cart);

    useEffect(() => { // Restaura la autenticación al recargar el navegador
        dispatch(startChecking())
    }, [dispatch]);

    useEffect(() => { // Restaura el carrito de compras al recargar el navegador
        const oldCart = JSON.parse(localStorage.getItem('carrito'));
        if (oldCart)
            dispatch(cartInit(oldCart));
    }, [dispatch]);

    useEffect(() => { // Navega a la parte superior de la página en dispositivos móviles
        window.scrollTo(0, 0);
    }, [location]);

    return (
        !checking &&
        <Routes>
            <Route
                path="registro"
                element=
                {
                    <RegisterScreen />
                }
            />
            <Route
                path="registro/*"
                element={<Navigate to="/" />}
            />
            <Route
                path="login"
                element=
                {
                    <LoginScreen />
                }
            />
            <Route
                path="/login/*"
                element={<Navigate to="/" />}
            />
            <Route
                path="shipping"
                element=
                {
                    <>
                        <CartStepper />

                        <div className="container">
                            <PrivateRoute isAuthenticated={!!uid}>
                                {
                                    carrito.length > 0
                                        ? <Shipping />
                                        : <Navigate to="/" replace={true} />
                                }
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
                                {
                                    carrito.length > 0
                                        ? <Payment />
                                        : <Navigate to="/" replace={true} />
                                }
                            </PrivateRoute>
                        </div>
                    </>
                }
            />
            <Route
                path="panel/*"
                element=
                {
                    <PrivateRoute isAuthenticated={!!uid}>
                        <PanelRouter />
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
    )
}