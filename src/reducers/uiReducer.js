import { types } from "../types/types";


const initialState = {
    step: 2,
    menuCanvas: false,
    cartCanvas: false,
    categoryCanvas: false,
    backdrop: true,
    shippingModal: false,
    elegirShippingModal: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.stepChange:
            return {
                ...state,
                step: action.payload,
            }
        case types.menuCanvasChange:
            return {
                ...state,
                menuCanvas: !state.menuCanvas,
            }
        case types.cartCanvasChange:
            return {
                ...state,
                cartCanvas: !state.cartCanvas,
            }
        case types.categoryCanvasChange:
            return {
                ...state,
                categoryCanvas: !state.categoryCanvas,
            }
        case types.backdropChange:
            return {
                ...state,
                backdrop: action.payload,
            }
        case types.shippingModalChange:
            return {
                ...state,
                shippingModal: action.payload,
            }
        case types.shippingModalElegir:
            return {
                ...state,
                elegirShippingModal: action.payload,
            }
        default:
            return state;
    }
}