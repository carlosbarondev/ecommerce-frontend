import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';

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

    }

}

const logout = () => ({ type: types.authLogout })