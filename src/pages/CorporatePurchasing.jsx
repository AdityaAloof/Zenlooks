import React, { useState } from 'react';
import './CorporatePurchasing.style';

const CorporateBulkPurchasing = () => {
  const [contactInfo, setContactInfo] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission logic
    setSuccess(true);
    setContactInfo('');
    setQuantity('');
    setMessage('');
  };

  return (
    <div className="corporate-bulk-container">
      <h1>Corporate & Bulk Purchasing</h1>
      <p>For corporate or bulk purchases, please fill out the form below:</p>
      <form onSubmit={handleSubmit} className="bulk-purchase-form">
        <input
          type="text"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <textarea
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit Inquiry</button>
      </form>
      {success && <div className="success-message">Inquiry submitted successfully!</div>}
    </div>
  );
};

export default CorporateBulkPurchasing;
