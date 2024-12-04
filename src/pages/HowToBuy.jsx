import React from "react"; 
import { FaShoppingCart, FaInfoCircle, FaCheckCircle, FaCreditCard } from "react-icons/fa"; 
import "./HowToBuy.css";

const HowToBuy = () => {
  return (
    <div className="how-to-buy-container">
      <h1>How to Buy</h1>
      <p>
        Shopping with us is simple! Follow these easy steps to find and purchase your favorite items.
      </p>

      <div className="steps">
        <div className="step">
          <FaShoppingCart className="step-icon" />
          <h2>Step 1: Browse Our Collection</h2>
          <p>
            Start by exploring our extensive collection of clothing and accessories. 
            Use filters to find exactly what you're looking for.
          </p>
        </div>

        <div className="step">
          <FaInfoCircle className="step-icon" />
          <h2>Step 2: Select Your Items</h2>
          <p>
            Click on an item to see more details. Choose your size, color, and quantity. 
            Use our sizing guide for assistance.
          </p>
        </div>

        <div className="step">
          <FaCheckCircle className="step-icon" />
          <h2>Step 3: Add to Cart</h2>
          <p>
            Click the “Add to Cart” button. Continue shopping or view your cart to check your selected items.
          </p>
        </div>

        <div className="step">
          <FaCreditCard className="step-icon" />
          <h2>Step 4: Checkout</h2>
          <p>
            Click the “Checkout” button and enter your shipping and payment information. 
            Review all details to ensure accuracy.
          </p>
        </div>
      </div>

      {/* Add margin-top to this section */}
      <h2 style={{ marginTop: '40px' }}>Need Assistance?</h2>
      <p>If you have any questions or need help with your order, please contact our customer support team:</p>
      <ul>
        <li>Email: support@zenlooks.com</li>
        <li>Phone: +1 123 456 7890</li>
      </ul>
    </div>
  );
};

export default HowToBuy;
