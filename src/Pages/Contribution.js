import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // make sure this is set up
import "../Styles/Contribution.css";

const Contribution = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("phone");
  const [number, setNumber] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Fetch payment destinations from Supabase
  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from("payment_destinations")
        .select("*");
      if (error) {
        console.error("Error fetching destinations:", error);
      } else {
        setDestinations(data || []);
      }
    };

    fetchDestinations();
  }, []);

  // Update number automatically when method changes
  useEffect(() => {
    const selected = destinations.find(
      (d) => d.type.toLowerCase() === method.toLowerCase()
    );
    if (selected) {
      setNumber(selected.number);
    } else {
      setNumber("");
    }
  }, [method, destinations]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://your-backend.onrender.com/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, method, number }),
      });

      if (!res.ok) throw new Error("Failed to initiate payment");
      const data = await res.json();
      console.log("Payment initiated:", data);

      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Error initiating payment. Please try again.");
    }
  };

  const handleConfirm = () => {
    alert("Payment confirmation sent. Admin will review your contribution.");
    setAmount("");
    setNumber("");
    setSubmitted(false);
  };

  return (
    <div className="contribution-page">
      <h1>Make a Contribution</h1>
      <p className="subtitle">Support with your tithe, offerings, or donations.</p>

      <form onSubmit={handleSubmit} className="contribution-form">
        <div className="form-group">
          <label>Amount (KES)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          >
            <option value="phone">Phone Number</option>
            <option value="till">Till Number</option>
            <option value="paybill">Paybill</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            {method === "phone"
              ? "Phone Number"
              : method === "till"
              ? "Till Number"
              : "Paybill Number"}
          </label>
          <input
            type="text"
            value={number}
            readOnly
            className="readonly-input"
          />
        </div>

        <button type="submit" className="btn-primary">
          Contribute
        </button>
      </form>

      {submitted && (
        <div className="confirmation-box">
          <p>
            If you have completed the payment on M-Pesa, click below to notify
            admin.
          </p>
          <button onClick={handleConfirm} className="btn-confirm">
            Payment Complete
          </button>
        </div>
      )}
    </div>
  );
};

export default Contribution;
