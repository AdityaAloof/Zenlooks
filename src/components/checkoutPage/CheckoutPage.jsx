// import React, { useState, useEffect } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { Container, Row, Col, Button, Form } from "react-bootstrap";
// import { useLocation } from "react-router-dom";
// import AWS from "aws-sdk";
// import axios from "axios";
// import "./checkout.css";

// // Configure AWS SDK (this should be done on the server-side, this is just for illustration)
// AWS.config.update({
//   region: "us-east-2", // Change to your region
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Use environment variables for your AWS credentials
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const CheckoutPage = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const location = useLocation(); // Get location if needed for any route-based info

//   const [userDetails, setUserDetails] = useState({
//     name: "",
//     email: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//   });
//   const [paymentError, setPaymentError] = useState(null);
//   const [paymentSuccess, setPaymentSuccess] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [clientSecret, setClientSecret] = useState(null); // assuming you fetch this from your backend

//   useEffect(() => {
//     // Fetch the client secret for Stripe payment intent when component mounts
//     const fetchClientSecret = async () => {
//       try {
//         const response = await axios.post("http://localhost:5000/create-payment-intent", { amount: 5000 });
//         setClientSecret(response.data.clientSecret); // Set clientSecret from backend response
//       } catch (error) {
//         setPaymentError("Failed to retrieve payment intent.");
//       }
//     };

//     fetchClientSecret();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails({ ...userDetails, [name]: value });
//   };

//   const validateForm = () => {
//     let errors = {};

//     if (!userDetails.name) errors.name = "Name is required";
//     if (!userDetails.email) errors.email = "Email is required";
//     if (!userDetails.address) errors.address = "Address is required";
//     if (!userDetails.city) errors.city = "City is required";
//     if (!userDetails.state) errors.state = "State is required";
//     if (!userDetails.zip) errors.zip = "Zip code is required";
//     if (!userDetails.country) errors.country = "Country is required";

//     setPaymentError(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validateForm()) return;

//     if (!stripe || !elements || !clientSecret) {
//       setPaymentError("Stripe.js has not yet loaded. Please wait a moment.");
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     if (!cardElement) {
//       setPaymentError("Card element is not properly loaded.");
//       return;
//     }

//     setLoading(true);
//     setPaymentError(null);
//     setPaymentSuccess(null);

//     try {
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//           billing_details: {
//             name: userDetails.name,
//             email: userDetails.email,
//             address: {
//               line1: userDetails.address,
//               city: userDetails.city,
//               state: userDetails.state,
//               postal_code: userDetails.zip,
//               country: userDetails.country,
//             },
//           },
//         },
//       });

//       setLoading(false);

//       if (error) {
//         setPaymentError(error.message);
//       } else if (paymentIntent && paymentIntent.status === "succeeded") {
//         setPaymentSuccess("Payment succeeded!");
//         // Send payment details to DynamoDB
//         await sendPaymentDetailsToDB(paymentIntent);
//       }
//     } catch (error) {
//       setLoading(false);
//       setPaymentError("Something went wrong. Please try again.");
//     }
//   };

//   // Function to send payment details to AWS DynamoDB (this should be done server-side)
//   const sendPaymentDetailsToDB = async (paymentIntent) => {
//     try {
//       const dynamoDB = new AWS.DynamoDB.DocumentClient();
//       const params = {
//         TableName: "Payments",
//         Item: {
//           paymentId: paymentIntent.id,
//           amount: paymentIntent.amount_received,
//           userDetails: userDetails,
//           status: paymentIntent.status,
//           createdAt: new Date().toISOString(),
//         },
//       };

//       await dynamoDB.put(params).promise();
//       console.log("Payment details saved to DynamoDB.");
//     } catch (error) {
//       console.error("Error saving payment details to DynamoDB", error);
//     }
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <h3>Payment Form</h3>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={userDetails.name}
//                 onChange={handleChange}
//                 placeholder="Enter your name"
//               />
//             </Form.Group>
//             <Form.Group controlId="formEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={userDetails.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//               />
//             </Form.Group>
//             <Form.Group controlId="formAddress">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="address"
//                 value={userDetails.address}
//                 onChange={handleChange}
//                 placeholder="Enter your address"
//               />
//             </Form.Group>
//             <Form.Group controlId="formCity">
//               <Form.Label>City</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="city"
//                 value={userDetails.city}
//                 onChange={handleChange}
//                 placeholder="Enter your city"
//               />
//             </Form.Group>
//             <Form.Group controlId="formState">
//               <Form.Label>State</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="state"
//                 value={userDetails.state}
//                 onChange={handleChange}
//                 placeholder="Enter your state"
//               />
//             </Form.Group>
//             <Form.Group controlId="formZip">
//               <Form.Label>Zip Code</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="zip"
//                 value={userDetails.zip}
//                 onChange={handleChange}
//                 placeholder="Enter your zip code"
//               />
//             </Form.Group>
//             <Form.Group controlId="formCountry">
//               <Form.Label>Country</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="country"
//                 value={userDetails.country}
//                 onChange={handleChange}
//                 placeholder="Enter your country"
//               />
//             </Form.Group>

//             {/* Card Element */}
//             <Form.Group controlId="formCardDetails">
//               <Form.Label>Card Details</Form.Label>
//               <CardElement />
//             </Form.Group>

//             {/* Payment Status */}
//             {paymentError && <div className="error">{paymentError}</div>}
//             {paymentSuccess && <div className="success">{paymentSuccess}</div>}

//             {/* Submit Button */}
//             <Button type="submit" disabled={!stripe || loading}>
//               {loading ? "Processing..." : "Pay Now"}
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./checkout.css";

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // Fetch the client secret for Stripe payment intent when component mounts
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post("http://localhost:5000/create-payment-intent", { amount: 5000 });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setPaymentError("Failed to retrieve payment intent.");
      }
    };

    fetchClientSecret();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const validateForm = () => {
    let errors = {};

    if (!userDetails.name) errors.name = "Name is required";
    if (!userDetails.email) errors.email = "Email is required";
    if (!userDetails.address) errors.address = "Address is required";
    if (!userDetails.city) errors.city = "City is required";
    if (!userDetails.state) errors.state = "State is required";
    if (!userDetails.zip) errors.zip = "Zip code is required";
    if (!userDetails.country) errors.country = "Country is required";

    setPaymentError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    if (!stripe || !elements || !clientSecret) {
      setPaymentError("Stripe.js has not yet loaded. Please wait a moment.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setPaymentError("Card element is not properly loaded.");
      return;
    }

    setLoading(true);
    setPaymentError(null);
    setPaymentSuccess(null);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: userDetails.name,
            email: userDetails.email,
            address: {
              line1: userDetails.address,
              city: userDetails.city,
              state: userDetails.state,
              postal_code: userDetails.zip,
              country: userDetails.country,
            },
          },
        },
      });

      setLoading(false);

      if (error) {
        setPaymentError(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setPaymentSuccess("Payment succeeded!");
        // Send payment details to DynamoDB
        await confirmAndSavePayment(paymentIntent.id);
      }
    } catch (error) {
      setLoading(false);
      setPaymentError("Something went wrong. Please try again.");
    }
  };

  const confirmAndSavePayment = async (paymentIntentId) => {
    try {
      const response = await axios.post("http://localhost:5000/confirm-payment", {
        paymentIntentId,
        userDetails,
      });

      if (response.data.success) {
        console.log("Payment details saved to DynamoDB.");
      } else {
        setPaymentError("Failed to save payment details.");
      }
    } catch (error) {
      console.error("Error confirming and saving payment", error);
      setPaymentError("Failed to confirm and save payment details.");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Payment Form</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={userDetails.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={userDetails.state}
                onChange={handleChange}
                placeholder="Enter your state"
              />
            </Form.Group>
            <Form.Group controlId="formZip">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zip"
                value={userDetails.zip}
                onChange={handleChange}
                placeholder="Enter your zip code"
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={userDetails.country}
                onChange={handleChange}
                placeholder="Enter your country"
              />
            </Form.Group>

            {/* Card Element */}
            <Form.Group controlId="formCardDetails">
              <Form.Label>Card Details</Form.Label>
              <CardElement />
            </Form.Group>

            {/* Payment Status */}
            {paymentError && (
            <div className="error">
              {/* If paymentError is an object, access its message or error description */}
              {typeof paymentError === 'string' ? paymentError : paymentError.message}
            </div>
          )}
          {paymentSuccess && (
            <div className="success">
              {/* If paymentSuccess is an object, access its message */}
              {typeof paymentSuccess === 'string' ? paymentSuccess : paymentSuccess.message}
            </div>
)}


            {/* Submit Button */}
            <Button type="submit" disabled={!stripe || loading}>
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
