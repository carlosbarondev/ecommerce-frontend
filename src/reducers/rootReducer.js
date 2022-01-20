import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";
import { shippingReducer } from "./shippingReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    cart: cartReducer,
    shipping: shippingReducer
});