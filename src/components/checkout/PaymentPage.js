import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./PaymentPage.css";
import { PaymentPageForm } from "./PaymentPageForm";
import { fetchConToken } from "../../helpers/fetch";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51JjACUBNBMvlMZgl6YSlm52dTf2fLJ0doW3CJsCyC9EToMpj6ZuYcjrarK6T8gIh8cI5LX6dkUCRCl9AlMgdRaVi00bGKhZ0cO");


export const PaymentPage = ({ setDireccion }) => {

    const { uid, correo } = useSelector(state => state.auth)

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetchConToken(`pagos/${uid}`, { correo, setDireccion, items: [{ id: "xl-tshirt" }] }, 'POST')
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [uid, correo, setDireccion]);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="all">
            <div className="Checkout">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <PaymentPageForm />
                    </Elements>
                )}
            </div>
        </div>
    );
}