import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { cartClear } from './cart';


export const startLogin = (correo, password, navigate) => {

    return async (dispatch) => {

        const resp = await fetchSinToken('login', { correo, password }, 'POST');
        const body = await resp.json();

        if (!body.msg) { // Cuando hay errores se retorna msg

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            localStorage.setItem('uid', body.usuario._id);

            dispatch(login({
                uid: body.usuario._id,
                nombre: body.usuario.nombre,
                correo: body.usuario.correo,
                rol: body.usuario.rol,
                img: body.usuario.img,
                estado: body.usuario.estado
            }));

            const lastPath = localStorage.getItem('lastPath') || "/";
            navigate(process.env.REACT_APP_REACT + lastPath, { replace: true });

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startRegister = (nombre, correo, password, navigate) => {

    return async (dispatch) => {

        const resp = await fetchSinToken('usuarios', { nombre, correo, password }, 'POST');
        const body = await resp.json();

        if (!body.msg) { // Cuando hay errores se retorna msg

            const resp = await fetchSinToken('login', { correo, password }, 'POST');
            const body = await resp.json();

            if (!body.msg) { // Cuando hay errores se retorna msg

                const resp = await fetchSinToken('login', { correo, password }, 'POST');
                const body = await resp.json();

                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                localStorage.setItem('uid', body.usuario._id);

                dispatch(login({
                    uid: body.usuario._id,
                    nombre: body.usuario.nombre,
                    correo: body.usuario.correo,
                    rol: body.usuario.rol,
                    img: body.usuario.img,
                    estado: body.usuario.estado
                }));

                const lastPath = localStorage.getItem('lastPath') || "/";
                navigate(process.env.REACT_APP_REACT + lastPath, { replace: true });

            } else {
                Swal.fire('Error', body.msg, 'error');
            }

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
                nombre: body.nombre,
                correo: body.correo,
                rol: body.rol,
                img: body.img,
                estado: body.estado
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
        dispatch(cartClear());

    }

}

const logout = () => ({ type: types.authLogout })

export const changeName = (nombre) => ({
    type: types.changeName,
    payload: nombre
})

export const changeImage = (img) => ({
    type: types.changeImage,
    payload: img
})