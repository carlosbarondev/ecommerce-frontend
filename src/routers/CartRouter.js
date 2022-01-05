import { Route, Routes, useLocation } from 'react-router-dom';

import { CartStepper } from '../components/ui/Stepper';
import { Shipping } from '../components/cart/shipping/Shipping';
import { Payment } from '../components/cart/payment/Payment';
import { Summary } from '../components/cart/summary/Summary';


export const CartRouter = () => {

    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search);

    return (

        <>
            <CartStepper />

            <div className="container">

                <Routes>

                    <Route path="shipping" element={<Shipping />} />

                    <Route path="payment" element={<Payment />} />

                    <Route path="summary" element={<Summary />} />

                </Routes>

            </div>

        </>

    )
}