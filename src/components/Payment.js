import { useState, useEffect } from "react";
import "../App.css";
import StripeContainer from "./StripeContainer";
import axios from "axios";
import "../styles/paymentForm.css";
import { useNavigate } from "react-router-dom";
function Payment() {
  const [showItem, setShowItem] = useState(false);
  const [pricehoure, setpricehoure] = useState("38");
  const [fees, setfees] = useState("");
  const [val, setval] = useState("");
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/studenthome");
  };

  const calculat = () => {
    try {
      setfees(eval(val * pricehoure + 40));
    } catch (error) {
      setval("error");
    }
  };

  return (
    <div className="payment">
      <h1 className="paymHeader">Study fee Acount</h1>

      {showItem ? (
        <StripeContainer />
      ) : (
        <>
          <div class="box">
            <input
              type="number"
              placeholder=" hours to be recorded"
              id="houres"
              value={val}
              onChange={(e) => setval(e.target.value)}
            />
            <div className="details">Houre Price:38ILS</div>
            <div className="details">Internet and insurance fees:40ILS</div>
            <hr></hr>
            <button id="Calculate" value="1" onClick={() => calculat()}>
              Calculate
            </button>
            <h3 className="header3">
              study fee account=....(Houres*38)+40={fees}
              <hr></hr>
            </h3>

            <button id="Calculate" onClick={() => setShowItem(true)}>
              pay using card
            </button>

            <button id="Calculate" onClick={navigateHome}>
              Home
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Payment;
