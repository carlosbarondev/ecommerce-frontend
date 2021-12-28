import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper, Step } from 'react-form-stepper';

import { ShippingAddress } from './ShippingAddress';
import { PaymentPage } from './PaymentPage';


export const Checkout = () => {

    const navigate = useNavigate();

    const [step, setStep] = useState(2);

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
                        setStep(2);
                    }}
                />
                <Step
                    label="Dirección de envío"
                    children={step > 2 ? <div><i className="fa-solid fa-check"></i></div> : 2}
                    disabled={step < 2}
                    onClick={() => setStep(2)}
                />
                <Step
                    label="Método de pago"
                    children={step > 3 ? <div><i className="fa-solid fa-check"></i></div> : 3}
                    disabled={step < 3}
                    onClick={() => setStep(3)}
                />
                <Step
                    label="Resumen"
                    children={step > 4 ? <div><i className="fa-solid fa-check"></i></div> : 4}
                    disabled={step < 4}
                    onClick={() => setStep(4)}
                />
            </Stepper>
            {
                (step === 2 &&
                    <ShippingAddress setStep={setStep} />)
                || (step === 3 &&
                    <PaymentPage />)
                || (step === 4 &&
                    <PaymentPage />)
            }
        </>
    )
}