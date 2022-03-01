import { types } from "../types/types";


const initialState = {
    checking: true,
    // uid: null,
    // nombre: null,
    // correo: null,
    // rol: null,
    // estado: null,
    // img: null
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            return {
                checking: false
            }
        case types.changeName:
            return {
                ...state,
                nombre: action.payload,
                checking: false
            }
        case types.changeImage:
            return {
                ...state,
                img: action.payload,
                checking: false
            }
        default:
            return state;

    }
}