import { types } from "../types/types"


export const stepChange = (step) => {
    return {
        type: types.stepChange,
        payload: step,
    }
}

export const menuCanvasChange = () => {
    return {
        type: types.menuCanvasChange,
    }
}

export const cartCanvasChange = () => {
    return {
        type: types.cartCanvasChange,
    }
}

export const backdropChange = (backdrop) => {
    return {
        type: types.backdropChange,
        payload: backdrop,
    }
}

export const shippingModalChange = (e) => {
    return {
        type: types.shippingModalChange,
        payload: e
    }
}

export const shippingModalElegir = (e) => {
    return {
        type: types.shippingModalElegir,
        payload: e
    }
}