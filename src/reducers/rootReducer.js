import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { productosReducer } from "./productosReducer";
import { cartReducer } from "./cartReducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    products: productosReducer,
    cart: cartReducer
});