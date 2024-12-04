const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const Stripe = require('stripe'); // Import Stripe

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve React build files
app.use(express.static(path.join(__dirname, 'build')));

// Initialize Stripe with the secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // Amount is expected in the request body

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

// Confirm and save payment (optional)
app.post('/confirm-payment', async (req, res) => {
  const { paymentIntentId, userDetails } = req.body;
  try {
    // Add logic to save payment details to a database (e.g., DynamoDB)
    console.log('Payment confirmed for ID:', paymentIntentId, 'User details:', userDetails);
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).send({ error: 'Failed to confirm payment.' });
  }
});

// Route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
