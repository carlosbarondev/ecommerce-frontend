import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


import "./PaymentPage.css";
import { PaymentPageForm } from "./PaymentPageForm";
import { fetchSinToken } from "../../helpers/fetch";


const stripePromise = loadStripe("pk_test_Dt4ZBItXSZT1EzmOd8yCxonL");

export const PaymentPage = () => {

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
        <div className="all">
            <div className="Checkout">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <PaymentPageForm />
                    </Elements>
                )}
            </div>
        </div>
    )
}