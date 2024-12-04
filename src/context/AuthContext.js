import React, { createContext, useEffect, useState } from "react";
import { Auth } from 'aws-amplify';  // Correct import for Auth

export const AuthContext = createContext();  // Create context

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);  // State to hold the current user
    const [loading, setLoading] = useState(true);  // State to manage loading status

    // Fetch current authenticated user
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();  // Fetch authenticated user
                setCurrentUser(user);  // Set the user in state if authenticated
            } catch (error) {
                console.log("No user signed in:", error.message);
            } finally {
                setLoading(false);  // Loading finished after fetching user
            }
        };

        fetchCurrentUser();
    }, []);

    // Return loading indicator if still loading
    if (loading) {
        return <div>Loading...</div>;  // Optionally, you can replace this with a spinner or loader component
    }

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}  {/* Provide context to child components */}
        </AuthContext.Provider>
    );
};
