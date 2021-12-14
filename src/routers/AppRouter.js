import { BrowserRouter, Routes, Route } from "react-router-dom"

import { LoginScreen } from "../components/auth/LoginScreen"
import { ProductsScreen } from "../components/products/ProductsScreen"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
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