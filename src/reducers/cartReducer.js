import { types } from "../types/types";


const initialState = {
    carrito: []
};

export const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.cartAdd:
            return {
                ...state,
                carrito: [...state.carrito, action.payload]
            }

        default:
            return state;
    }
}