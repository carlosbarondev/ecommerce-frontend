import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./payment.css";
import { PaymentForm } from "./PaymentForm";
import { fetchConToken } from "../../../helpers/fetch";



// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51JjACUBNBMvlMZgl6YSlm52dTf2fLJ0doW3CJsCyC9EToMpj6ZuYcjrarK6T8gIh8cI5LX6dkUCRCl9AlMgdRaVi00bGKhZ0cO");


export const Payment = () => {

    const location = useLocation();
    const direccion = location.state;

    const { uid, correo } = useSelector(state => state.auth);
    const { carrito } = useSelector(state => state.cart);

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetchConToken(`pagos/${uid}`, { correo, direccion, items: carrito }, 'POST')
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [uid, correo, direccion, carrito]);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="all animate__animated animate__fadeIn">
            <div className="Checkout">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <PaymentForm />
                    </Elements>
                )}
            </div>
        </div>
    );
}