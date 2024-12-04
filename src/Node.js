const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Q64R0A5rrCXxijjdeTSDhNsDIARVagXxMxaYetNVVVTS9QQJXkayyM0JpKeonRleRTTn0Wp3Ih7PwJ9k1M9toWK005nlOY0S0'); // Secret key from Stripe Dashboard
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Ensure that the frontend can make requests to the backend

// Endpoint to create payment intent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // amount should come from the frontend, typically in cents (1000 = $10)
    
    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // The amount for the payment in the smallest currency unit (e.g., cents for USD)
      currency: 'usd', // Set the currency for the payment (USD in this example)
      // Optionally, you can also include other details like a description, metadata, etc.
    });

    // Send the client secret to the frontend
    res.send({
      clientSecret: paymentIntent.client_secret, // This is the key that your frontend will use to confirm the payment
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send('Internal Server Error');
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
