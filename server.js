const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const Stripe = require('stripe');

// Load environment variables from .env
dotenv.config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware to parse JSON bodies
app.use(express.json());

// Serve React build files
app.use(express.static(path.join(__dirname, 'build')));

// Root route for basic testing
app.get('/', (req, res) => {
  res.send('Hello, World! The server is running.');
});

// Route to create a payment intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Stripe expects amount in cents
      currency: 'usd',
    });
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});

// Confirm and save payment
app.post('/confirm-payment', async (req, res) => {
  const { paymentIntentId, userDetails } = req.body;

  try {
    console.log('Payment confirmed for ID:', paymentIntentId);
    console.log('User Details:', userDetails);

    // Here, you can save payment details to a database (e.g., DynamoDB)
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).send({ error: 'Failed to confirm payment.' });
  }
});

// Fallback route to serve React index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
