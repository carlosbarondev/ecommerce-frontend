import { types } from "../types/types";


const initialState = {
    step: 2,
    canvas: false,
    backdrop: true
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.stepChange:
            return {
                ...state,
                step: action.payload,
            }
        case types.canvasChange:
            return {
                ...state,
                canvas: !state.canvas,
            }
        case types.backdropChange:
            return {
                ...state,
                backdrop: action.payload,
            }
        default:
            return state;
    }
}