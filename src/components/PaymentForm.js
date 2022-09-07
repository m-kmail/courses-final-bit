import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/paymentForm.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [user, setUser] = useState({});
  const [showDiv, setShowDiv] = useState({ display: "none" });
  const getUserInfo = () => {
    return axios.get("http://localhost:5000/userinfo");
  };
  useEffect(() => {
    getUserInfo().then((res) => setUser(res.data));
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:5000/payment", {
          amount: 1000,
          id
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  const makeATransaction = async () => {
    await axios.put("http://localhost:5000/confirmTransaction");
    setShowDiv({ display: "block" });
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button id="pay" onClick={() => makeATransaction()}>
            Pay
          </button>
          <div className="validPayment" style={showDiv}>
            <h2>you payed successfully you can Now Register courses</h2>
          </div>
        </form>
      ) : (
        <div>
          <h2>you payed successfully you can Now Register courses</h2>
        </div>
      )}
    </>
  );
}
