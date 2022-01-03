import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stepper, Step } from 'react-form-stepper';

import { uiChange } from '../../actions/ui';
import { ShippingAddress } from './shippingAddress/ShippingAddress';
import { Payment } from './payment/Payment';


export const Checkout = () => {

    const dispatch = useDispatch();
    const { step } = useSelector(state => state.ui);

    const navigate = useNavigate();

    const [direccion, setDireccion] = useState();

    const handleClick = (n) => {
        dispatch(uiChange(n));
    }

    return (
        <>
            <Stepper
                activeStep={step}
                connectorStateColors
            >
                <Step
                    label="Cesta"
                    children={step > 1 ? <div><i className="fa-solid fa-check"></i></div> : 1}
                    onClick={() => {
                        navigate("/carrito");
                        handleClick(2)
                    }}
                />
                <Step
                    label="Dirección de envío"
                    children={step > 2 ? <div><i className="fa-solid fa-check"></i></div> : 2}
                    disabled={step < 2}
                    onClick={() => handleClick(2)}
                />
                <Step
                    label="Método de pago"
                    children={step > 3 ? <div><i className="fa-solid fa-check"></i></div> : 3}
                    disabled={step < 3}
                    onClick={() => handleClick(3)}
                />
                <Step
                    label="Resumen"
                    children={step > 4 ? <div><i className="fa-solid fa-check"></i></div> : 4}
                    disabled={step < 4}
                    onClick={() => handleClick(4)}
                />
            </Stepper>
            {
                (step === 2 &&
                    <ShippingAddress setdireccion={setDireccion} />)
                || (step === 3 &&
                    <Payment direccion={direccion} />)
                || (step === 4 &&
                    <h5>Resumen</h5>)
            }
        </>
    )
}