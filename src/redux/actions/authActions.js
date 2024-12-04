// src/redux/actions/authActions.js
import { signInWithEmailAndPassword, signOut } from "firebase/auth"; // Firebase authentication functions
import { auth } from "../../firebase/firebase.utils"; // Import Firebase auth object

// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

// Action to start the login process (e.g., show a loading spinner)
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

// Action when login is successful
export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

// Action when login fails
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Action to logout a user
export const logoutSuccess = () => ({
  type: LOGOUT,
});

// Thunk function for asynchronous login with Firebase
export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest()); // Show loading spinner

  try {
    // Firebase's signInWithEmailAndPassword method for logging in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Extract user data from the response

    dispatch(loginSuccess(user)); // Dispatch login success with user data
  } catch (error) {
    dispatch(loginFailure(error.message)); // Dispatch login failure with the error message
    console.error("Error during login:", error.message); // Log the error for debugging
  }
};

// Thunk function to handle logout with Firebase
export const logout = () => async (dispatch) => {
  try {
    // Firebase's signOut method for logging out
    await signOut(auth);
    dispatch(logoutSuccess()); // Dispatch logout success
  } catch (error) {
    console.error("Error during logout:", error.message); // Handle any errors in logging out
  }
};
