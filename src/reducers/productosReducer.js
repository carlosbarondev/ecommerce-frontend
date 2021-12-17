import { types } from "../types/types";


const initialState = {
    total: 0,
    productos: []
};

export const productosReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.productAdd:
            return {
                ...state,
                productos: [...state.productos, action.payload]
            }
        case types.productsLoaded:
            return {
                ...state,
                total: action.payload.total,
                productos: [...action.payload.productos]
            }
        default:
            return state;
    }
}