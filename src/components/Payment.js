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
  const [showErr, setShowErr] = useState({ display: "none" });

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/studenthome");
  };

  const calculat = () => {
    if (val == "" || val == 0) {
      setShowErr({ display: "block" });
    } else {
      try {
        setfees(eval(val * pricehoure + 40));
      } catch (error) {
        setval("error");
      }
    }
  };

  const appendAmount = async () => {
    if (val == "" || val == 0) {
      setShowErr({ display: "block" });
    } else {
      await axios.put("http://localhost:5000/aboutToMakeATransaction", {
        amount: fees
      });
      setShowItem(true);
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
            <h1 className="noHours" style={showErr}>
              Please Enter The Number Of Hours You'd Like To Pay For
            </h1>
            <input
              type="number"
              placeholder="number of hours"
              id="houres"
              value={val}
              onChange={(e) => setval(e.target.value)}
            />
            <div className="details">Houre Price : 38 ILS</div>
            <div className="details">Internet and insurance fees : 40 ILS</div>
            <hr></hr>
            <button id="Calculate" value="1" onClick={() => calculat()}>
              Calculate
            </button>
            <h3 className="header3">
              study fee account = ....(Houres * 38) + 40 = {fees}
              <hr></hr>
            </h3>

            <button id="Calculate" onClick={() => appendAmount()}>
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
