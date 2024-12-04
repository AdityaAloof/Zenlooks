import React, { lazy, Suspense, useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate here
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { AuthContext, AuthProvider } from "./context/AuthContext";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import CheckoutPage from './components/checkoutPage/CheckoutPage';
import Login from "./components/SignIn/SignIn";
import WelcomePage from './components/SignIn/WelcomePage';
import Contacts from "./components/contacts/Contacts";
import ValidatePage from './components/SignUp/ValidatePage';
import RegisterPage from "./components/SignUp/SignUp";

// AWS Amplify Configuration
Amplify.configure(awsExports);

// Stripe configuration
const stripePromise = loadStripe("pk_test_51Q64R0A5rrCXxijjtQMDhooMlurXIrZmum5L0u82DzDNKNRaORw1LUbOeXo6pf23HQYPEjzrCbpuoCYcCZTH3cH2000M7qNSIX");

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const OurStores = lazy(() => import("./pages/OurStores"));
const OurCares = lazy(() => import("./pages/OurCares"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const HowToBuy = lazy(() => import("./pages/HowToBuy"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const CorporatePurchasing = lazy(() => import("./pages/CorporatePurchasing"));
const ReturnsRefunds = lazy(() => import("./pages/ReturnsRefunds"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authContext = useContext(AuthContext); // Use AuthContext for auth state

  // Update authentication status on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  const updateAuthStatus = (authStatus) => {
    setIsAuthenticated(authStatus);
  };

  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavBar isAuthenticated={isAuthenticated} updateAuthStatus={updateAuthStatus} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/sign-in" element={<Login updateAuthStatus={updateAuthStatus} />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/validate" element={<ValidatePage />} />
          <Route path="/contacts" element={<Contacts isAuthenticated={isAuthenticated} />} />
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Stripe Checkout Route */}
          <Route
            path="/checkout"
            element={
              isAuthenticated ? (
                <Elements stripe={stripePromise}>
                  <CheckoutPage />
                </Elements>
              ) : (
                <RedirectToSignIn />
              )
            }
          />

          {/* About Us Routes */}
          <Route path="/our-stores" element={<OurStores />} />
          <Route path="/our-cares" element={<OurCares />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Customer Care Routes */}
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/how-to-buy" element={<HowToBuy />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/corporate-purchasing" element={<CorporatePurchasing />} />
          <Route path="/returns-refunds" element={<ReturnsRefunds />} />

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </AuthProvider>
  );
  
  // Component to handle redirection to sign-in
  function RedirectToSignIn() {
    const navigate = useNavigate(); // Import and use `useNavigate` here

    useEffect(() => {
      navigate("/sign-in");
    }, [navigate]);

    return null;
  }
}

export default App;
