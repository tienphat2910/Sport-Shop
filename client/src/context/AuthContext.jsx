import React, { createContext, useState, useEffect, useContext } from 'react';
import { isAuthenticated, getCurrentUser } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = () => {
            const authStatus = isAuthenticated();
            setAuthenticated(authStatus);

            if (authStatus) {
                const userData = getCurrentUser();
                setUser(userData);
            } else {
                setUser(null);
            }

            setLoading(false);
        };

        checkAuthStatus();

        // Listen for storage events (for login/logout in other tabs)
        window.addEventListener('storage', checkAuthStatus);

        // Create a custom event for auth changes within the same tab
        window.addEventListener('auth-change', checkAuthStatus);

        return () => {
            window.removeEventListener('storage', checkAuthStatus);
            window.removeEventListener('auth-change', checkAuthStatus);
        };
    }, []);

    const updateAuthState = () => {
        // Dispatch a custom event to notify all components about the auth change
        window.dispatchEvent(new Event('auth-change'));
    };

    const value = {
        user,
        authenticated,
        loading,
        updateAuthState
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
