import { types } from "../types/types";


const initialState = {
    total: 0,
    productos: [],
    productoActivo: null
};

export const productosReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.productSetActive:
            return {
                ...state,
                productoActivo: action.payload,
            }
        case types.productsLoaded:
            return {
                ...state,
                total: action.payload.total,
                productos: [...action.payload.productos]
            }
        case types.productsClear:
            return {
                total: 0,
                productos: [],
                productoActivo: null
            }
        default:
            return state;
    }
}