import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { productosReducer } from "./productosReducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    products: productosReducer
});