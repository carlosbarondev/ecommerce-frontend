import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Stepper, Step } from 'react-form-stepper';

import { stepChange } from '../../actions/ui';


export const CartStepper = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { step } = useSelector(state => state.ui);

    const [checking, setChecking] = useState(false);

    useEffect(() => {
        dispatch(stepChange(JSON.parse(localStorage.getItem('step'))));
        setChecking(true);
    }, [dispatch]);


    const handleClick = (n) => {
        dispatch(stepChange(n));
        localStorage.setItem('step', n);
    }

    return (
        checking &&
        <Stepper
            activeStep={step}
            connectorStateColors
        >
            <Step
                label="Cesta"
                children={step > 1 ? <div><i className="fa-solid fa-check"></i></div> : 1}
                onClick={() => {
                    navigate("/cart");
                    handleClick(1);
                }}
            />
            <Step
                label="Dirección de envío"
                children={step > 2 ? <div><i className="fa-solid fa-check"></i></div> : 2}
                disabled={step < 2}
                onClick={() => {
                    navigate("/shipping");
                    handleClick(2);
                }}
            />
            <Step
                label="Método de pago"
                children={step > 3 ? <div><i className="fa-solid fa-check"></i></div> : 3}
                disabled={step < 3}
                onClick={() => {
                    navigate("/payment");
                    handleClick(3);
                }}
            />
            <Step
                label="Resumen"
                children={step > 4 ? <div><i className="fa-solid fa-check"></i></div> : 4}
                disabled={step < 4}
                onClick={() => {
                    navigate("/summary");
                    handleClick(4);
                }}
            />
        </Stepper>
    )
}