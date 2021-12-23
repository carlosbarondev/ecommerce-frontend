import { types } from "../types/types"
import { fetchSinToken } from "../helpers/fetch"


export const productsStartLoad = () => {
    return async (dispatch) => { //Tarea asincrona
        try {
            const resp = await fetchSinToken('productos');
            const body = await resp.json();
            dispatch(productsLoaded(body));
        } catch (error) {
            console.log(error);
        }
    }
}

const productsLoaded = (products) => {
    return {
        type: types.productsLoaded,
        payload: products
    }
}

export const productSetActive = (product) => {
    return {
        type: types.productSetActive,
        payload: product
    }
}