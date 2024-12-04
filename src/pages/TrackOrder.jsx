import React, { useState } from 'react';
import './TrackOrder.css';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateOrderId = (id) => {
    // Simple validation: Check if the order ID is alphanumeric and 5-10 characters long
    const regex = /^[a-zA-Z0-9]{5,10}$/;
    return regex.test(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateOrderId(orderId)) {
      setError('Please enter a valid Order ID (5-10 alphanumeric characters).');
      return;
    }

    setLoading(true);
    setError('');
    setTrackingInfo('');

    // Simulate an API call to fetch tracking information
    setTimeout(() => {
      const mockData = {
        '12345': 'Your order has been shipped and is on its way!',
        'ABCDE': 'Your order is currently being processed.',
        // Add more mock data as needed
      };

      if (mockData[orderId]) {
        setTrackingInfo(mockData[orderId]);
      } else {
        setError('No tracking information found for this Order ID.');
      }

      setLoading(false);
      setOrderId(''); // Clear input after submission
    }, 1500);
  };

  return (
    <div className="track-order-container">
      <h1>Track Your Order</h1>
      <form onSubmit={handleSubmit} className="track-order-form">
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Tracking...' : 'Track Order'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {trackingInfo && <div className="tracking-info">{trackingInfo}</div>}
    </div>
  );
};

export default TrackOrder;
