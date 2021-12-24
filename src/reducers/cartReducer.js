import { types } from "../types/types";


const initialState = {
    carrito: []
};

export const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.cartAdd:
            if (action.payload.productIndex === -1) {
                return {
                    ...state,
                    carrito: [...state.carrito, action.payload.product]
                }
            }
            else {
                state.carrito[action.payload.productIndex].unidades = action.payload.product.unidades
                return {
                    ...state,
                }
            }
        default:
            return state;
    }
}