import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { authReducer } from "./authReducer";
import { productosReducer } from "./productosReducer";
import { cartReducer } from "./cartReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    products: productosReducer,
    cart: cartReducer
});