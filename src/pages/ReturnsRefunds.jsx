import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import './ReturnsRefunds.css';

const ReturnsRefunds = () => {
  const [orderId, setOrderId] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Simulate a submission process with a timeout
    setTimeout(() => {
      if (orderId && reason) {
        setSuccessMessage('Your return request has been submitted successfully!');
      } else {
        setErrorMessage('Please fill in all fields.');
      }
      setLoading(false);
      setOrderId(''); // Clear Order ID input
      setReason(''); // Clear Reason input
    }, 1500);
  };

  return (
    <div className="returns-refunds-container">
      <h1>Returns & Refunds</h1>
      <p>
        We want you to be completely satisfied with your purchase. If you are not happy with your order, you may return it within 30 days for a full refund. Please fill out the form below to initiate your return.
      </p>

      <form onSubmit={handleSubmit} className="returns-refunds-form">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
        <textarea
          placeholder="Reason for Return"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          <FaInfoCircle /> {loading ? 'Submitting...' : 'Submit Return Request'}
        </button>
      </form>

      {loading && <div className="loading">Processing your request...</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default ReturnsRefunds;
