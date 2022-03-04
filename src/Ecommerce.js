import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { store } from "./store/store"
import { AppRouter } from "./routers/AppRouter"


export const Ecommerce = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    )
}