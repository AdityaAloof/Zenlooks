import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";

// Make sure you use your own Stripe public key here
const stripePromise = loadStripe("pk_test_51Q64R0A5rrCXxijjtQMDhooMlurXIrZmum5L0u82DzDNKNRaORw1LUbOeXo6pf23HQYPEjzrCbpuoCYcCZTH3cH2000M7qNSIX");

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
};

export default App;
