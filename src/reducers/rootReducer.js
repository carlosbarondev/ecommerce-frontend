import { combineReducers } from "redux";

import { productosReducer } from "./productosReducer";


export const rootReducer = combineReducers({
    //auth,
    products: productosReducer
});