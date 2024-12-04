// // src/components/CheckoutModal.jsx
// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import './CheckoutModal.css'; // Import the CSS file for styles

// const CheckoutModal = ({ show, handleClose, totalAmount, clientSecret }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//       },
//     });

//     if (error) {
//       console.error("Payment failed", error.message);
//       alert(error.message);
//     } else if (paymentIntent && paymentIntent.status === "succeeded") {
//       console.log("Payment successful");
//       alert("Payment was successful! Thank you for your purchase.");
//       handleClose(); // Close the modal
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered className="checkout-modal">
//       <Modal.Header closeButton>
//         <Modal.Title>Checkout</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <form onSubmit={handleSubmit} className="checkout-form">
//           <CardElement className="card-element" />
//           <Button type="submit" disabled={!stripe} className="pay-button">
//             Pay ${totalAmount}.00
//           </Button>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default CheckoutModal;
// src/components/CheckoutModal.jsx
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './CheckoutModal.css';

const CheckoutModal = ({ show, handleClose, totalAmount, userDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && totalAmount) {
      const fetchClientSecret = async () => {
        try {
          const response = await axios.post('http://localhost:5000/create-payment-intent', {
            amount: totalAmount * 100, 
            userDetails,
          });
          setClientSecret(response.data.clientSecret);
        } catch (error) {
          setPaymentError('Failed to initialize payment: ' + error.message);
        }
      };
      fetchClientSecret();
    }
  }, [show, totalAmount, userDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);
    setPaymentError(null);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: userDetails?.name,
          email: userDetails?.email,
        },
      },
    });

    setLoading(false);

    if (error) {
      setPaymentError(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        // Save payment confirmation to backend
        await axios.post("http://localhost:5000/confirm-payment", {
          paymentIntentId: paymentIntent.id,
          userDetails,
        });
        alert("Payment was successful! Thank you for your purchase.");
        handleClose();
      } catch (error) {
        console.error("Error saving payment details:", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="checkout-modal">
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="checkout-form">
          <CardElement className="card-element" />
          {paymentError && <div className="error">{paymentError}</div>}
          <Button type="submit" disabled={!stripe || loading} className="pay-button">
            {loading ? "Processing..." : `Pay $${totalAmount}.00`}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CheckoutModal;
