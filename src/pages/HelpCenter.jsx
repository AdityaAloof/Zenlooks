import React from 'react';
import { FaQuestionCircle, FaPhoneAlt, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import './HelpCenter.style';

const HelpCenter = () => {
  return (
    <div className="help-center-container">
      <h1>Help Center</h1>
      <p>
        We’re here to assist you! Explore our frequently asked questions or reach out to our support team for help.
      </p>

      <div className="help-options">
        <div className="help-option">
          <FaQuestionCircle className="option-icon" />
          <h2>FAQs</h2>
          <p>
            Check out our Frequently Asked Questions to find answers to common queries.
          </p>
        </div>

        <div className="help-option">
          <FaPhoneAlt className="option-icon" />
          <h2>Contact Support</h2>
          <p>
            Speak with our customer service team for personalized assistance.
          </p>
          <p><strong>Phone:</strong> +1 123 456 7890</p>
        </div>

        <div className="help-option">
          <FaEnvelope className="option-icon" />
          <h2>Email Us</h2>
          <p>
            Send us an email and we’ll respond as soon as possible.
          </p>
          <p><strong>Email:</strong> support@zenlooks.com</p>
        </div>

        <div className="help-option">
          <FaUserCircle className="option-icon" />
          <h2>Live Chat</h2>
          <p>
            Chat with a representative for immediate assistance. Click the chat button on our website.
          </p>
        </div>
      </div>

      <div className="more-help-section">
        <h2>Need More Help?</h2>
        <p>
          If you can't find what you're looking for, please reach out to our support team for further assistance.
        </p>
      </div>
    </div>
  );
};

export default HelpCenter;
