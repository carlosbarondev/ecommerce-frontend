import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    cart: cartReducer
});