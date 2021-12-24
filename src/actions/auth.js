import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { productsClear } from './products';
import { cartClear } from './cart';


export const startLogin = (correo, password) => {

    return async (dispatch) => {

        const resp = await fetchSinToken('login', { correo, password }, 'POST');
        const body = await resp.json();

        if (!body.msg) { // Cuando hay errores se retorna msg
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.usuario._id,
                nombre: body.usuario.nombre
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startRegister = (nombre, correo, password) => {

    return async (dispatch) => {

        const resp = await fetchSinToken('usuarios', { nombre, correo, password }, 'POST');
        const body = await resp.json();

        if (!body.msg) { // Cuando hay errores se retorna msg
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body._id,
                nombre: body.nombre
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

export const startChecking = () => {

    return async (dispatch) => {

        const resp = await fetchConToken('login/renew');
        const body = await resp.json();

        if (!body.msg) { // Cuando hay errores se retorna msg
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                nombre: body.nombre
            }));
        } else {
            dispatch(checkingFinish());
        }

    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {

    return (dispatch) => {

        localStorage.clear();

        dispatch(logout());
        dispatch(productsClear());
        dispatch(cartClear());

    }

}

const logout = () => ({ type: types.authLogout })