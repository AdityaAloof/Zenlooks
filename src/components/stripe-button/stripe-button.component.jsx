import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  // Convert price to cents for Stripe
  const priceForStripe = price * 100;
  
  // Your Stripe publishable key
  const publishableKey = 'pk_test_WBqax2FWVzS9QlpJScO07iuL';

  // Handle successful token generation
  const onToken = (token) => {
    console.log(token); // Log the token received from Stripe
    alert('Payment Successful!'); // Alert the user about the successful payment
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Zenlooks PVT LTD.' // Business name
      billingAddress // Prompt for billing address
      shippingAddress // Prompt for shipping address
      image='https://svgshare.com/i/CUz.svg' // Logo or image to display
      description={`Your total is $${price}`} // Payment description
      amount={priceForStripe} // Amount in cents
      panelLabel='Pay Now' // Label for the payment button
      token={onToken} // Callback for successful payment
      stripeKey={publishableKey} // Your Stripe publishable key
    />
  );
};

export default StripeCheckoutButton;

