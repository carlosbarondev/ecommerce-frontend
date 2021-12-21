import { BrowserRouter, Routes, Route } from "react-router-dom"

import { RegisterScreen } from "../components/auth/RegisterScreen"
import { LoginScreen } from "../components/auth/LoginScreen"
import { ProductsScreen } from "../components/products/ProductsScreen"

export const AppRouter = () => {
    return (
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
                    path="/"
                    element=
                    {
                        <ProductsScreen />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}