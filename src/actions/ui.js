import { types } from "../types/types"


export const uiChange = (step) => {
    return {
        type: types.uiChange,
        payload: step,
    }
}