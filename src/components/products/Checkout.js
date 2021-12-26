import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


import "./Checkout.css";
import { CheckoutForm } from "./CheckoutForm";
import { fetchSinToken } from "../../helpers/fetch";


const stripePromise = loadStripe("pk_test_Dt4ZBItXSZT1EzmOd8yCxonL");

export const Checkout = () => {

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetchSinToken("pagos/create-payment-intent", { items: [{ id: "xl-tshirt" }] }, 'POST')
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}