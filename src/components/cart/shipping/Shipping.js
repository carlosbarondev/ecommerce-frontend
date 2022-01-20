import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ShippingList } from './ShippingList';
import { ShippingForm } from './ShippingForm';
import { fetchConToken } from '../../../helpers/fetch';
import { shippingInit, shippingSetDefault, shippingStartAddBilling } from '../../../actions/shipping';


export const Shipping = () => {
    console.log('Shipping');

    const dispatch = useDispatch();

    const { uid } = useSelector(state => state.auth);
    const { envio } = useSelector(state => state.shipping);

    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetchConToken(`usuarios/${uid}`);
            const { usuario } = await resp.json();
            dispatch(shippingInit(usuario.envio));
            if (usuario.facturacion) {
                await dispatch(shippingStartAddBilling(usuario.facturacion));
            }
            dispatch(shippingSetDefault(usuario.predeterminado));
            setChecking(true);
        }
        fetchData();
    }, [dispatch, uid]);

    return (
        <>
            {
                (checking && envio.length === 0 &&
                    <ShippingForm />)
                || (checking && envio.length > 0 &&
                    <ShippingList />)
            }
        </>
    );
};