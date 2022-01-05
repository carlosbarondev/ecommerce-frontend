import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchConToken } from '../../../helpers/fetch';

import { ShippingList } from './ShippingList';
import { ShippingForm } from './ShippingForm';


export const Shipping = () => {

    const { uid } = useSelector(state => state.auth);
    const [direccionesEnvio, setDireccionesEnvio] = useState([]);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetchConToken(`usuarios/envio/${uid}`);
            const { envio } = await resp.json();
            setDireccionesEnvio(envio);
            setChecking(true);
        }
        fetchData();
    }, [uid]);

    return (
        <>
            {
                (checking && direccionesEnvio.length === 0 &&
                    <ShippingForm />)
                || (checking && direccionesEnvio.length > 0 &&
                    <ShippingList />)
            }
        </>
    );
};