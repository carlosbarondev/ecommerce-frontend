import { types } from "../types/types"


export const cartInit = (carro) => {
    return {
        type: types.cartInit,
        payload: carro.carrito
    }
}

export const productStartAdd = (product) => {
    return (dispatch, getState) => {
        const { carrito } = getState().cart;
        const productIndex = carrito.findIndex(pid => pid.producto._id === product._id);
        let productCart = {};
        if (productIndex === -1) { // No existe el producto en el carrito y se agrega el producto entero
            productCart = {
                unidades: 1,
                producto: product
            }
        } else { // El producto existe en el carrito y se actualizan las unidades del producto
            productCart = {
                unidades: carrito[productIndex].unidades + 1
            }
        }
        dispatch(productAdd(productCart, productIndex));
    }
}

export const productAdd = (product, productIndex) => {
    return {
        type: types.cartAdd,
        payload: { product, productIndex }
    }
}

export const cartClear = () => ({ type: types.cartClear })