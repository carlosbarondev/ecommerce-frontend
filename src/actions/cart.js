import { types } from "../types/types"


export const productAdd = (product) => {
    return {
        type: types.cartAdd,
        payload: product
    }
}