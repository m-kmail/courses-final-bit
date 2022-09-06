import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "../components/PaymentForm";

let PUBLIC_KEY =
  "pk_test_51LeGicIN52kFR3FiNfCeN6qVImz2AK4mQF1nXKAz66Rxok6LfRc6rjttlF4nZFk2LwZtcebjyVPo5ERzXbzRJuMO00LptvyfIQ";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
