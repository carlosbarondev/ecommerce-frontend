import { types } from "../types/types"
import { fetchSinToken } from "../helpers/fetch"


export const productAdd = (product) => {
    return {
        type: types.productAdd,
        payload: product
    }
}

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