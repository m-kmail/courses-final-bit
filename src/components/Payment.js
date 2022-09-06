import { useState } from "react";
import "../App.css";
import StripeContainer from "./StripeContainer";

function Payment() {
  const [showItem, setShowItem] = useState(false);
  const [pricehoure, setpricehoure] = useState("38");
  const [fees, setfees] = useState("");
  const [val, setval] = useState("");
  const calculat = () => {
    try {
      setfees(eval(val * pricehoure + 40));
    } catch (error) {
      setval("error");
    }
  };
  return (
    <div className="payment">
      <h1>Study fee Acount</h1>

      {showItem ? (
        <StripeContainer />
      ) : (
        <>
          <input
            type="number"
            placeholder=" hours to be recorded"
            id="houres"
            value={val}
            onChange={(e) => setval(e.target.value)}
          />
          <div>Houre Price:38ILS</div>
          <div>Internet and insurance fees:40ILS</div>
          <button id="Calculate" value="1" onClick={() => calculat()}>
            Calculate
          </button>
          <h3>study fee account=....(Houres*38)+40={fees}</h3>

          <button id="pay" onClick={() => setShowItem(true)}>
            pay using card
          </button>
        </>
      )}
    </div>
  );
}

export default Payment;
