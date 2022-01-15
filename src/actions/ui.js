import { types } from "../types/types"


export const stepChange = (step) => {
    return {
        type: types.stepChange,
        payload: step,
    }
}

export const canvasChange = () => {
    return {
        type: types.canvasChange,
    }
}

export const backdropChange = (backdrop) => {
    return {
        type: types.backdropChange,
        payload: backdrop,
    }
}