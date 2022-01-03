import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchConToken } from '../../../helpers/fetch';

import { Shippings } from './Shippings';
import { ShippingForm } from './ShippingForm';


export const ShippingAddress = ({ setdireccion }) => {

    const { uid } = useSelector(state => state.auth);
    const [checking, setChecking] = useState(false);
    const [direccionesEnvio, setDireccionesEnvio] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetchConToken(`usuarios/envio/${uid}`);
            const { envio } = await resp.json();
            setDireccionesEnvio(envio);
            setChecking(true);
        }
        fetchData();
        return () => {
            setDireccionesEnvio([]);
        };
    }, [uid]);

    return (
        <>
            {
                (checking && direccionesEnvio.length === 0 &&
                    <ShippingForm uid={uid} setdireccion={setdireccion} direccionesenvio={direccionesEnvio} setdireccionesenvio={setDireccionesEnvio} />)
                || (checking && direccionesEnvio.length > 0 &&
                    <Shippings uid={uid} setdireccion={setdireccion} direccionesenvio={direccionesEnvio} setdireccionesenvio={setDireccionesEnvio} />)
            }
        </>
    );
};