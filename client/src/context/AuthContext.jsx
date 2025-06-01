import React, { createContext, useContext, useState, useEffect } from 'react';

// Update the API URL to match your server
const API_URL = 'http://localhost:5000/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (using token and userData in localStorage)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      // Try to get user data from localStorage first for immediate display
      const storedUser = localStorage.getItem('currentUser');

      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setCurrentUser(userData);
        } catch (e) {
          console.error("Error parsing stored user data:", e);
          localStorage.removeItem('currentUser');
        }
      }

      if (token) {
        try {
          // Update to use the correct endpoint based on your server routes
          // Since there's no /user/me endpoint, we'll use localStorage only
          // or enable mock data for development
          if (import.meta.env.DEV) {
            console.log("Using stored user data in development mode");
            // We're already setting currentUser from localStorage above
          } else {
            // In production, you would implement a proper endpoint call here
            console.warn("No user verification endpoint implemented");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Register with email and password
  const register = async (name, email, password) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data; // Return data instead of storing token and setting currentUser
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    }
  };

  // Verify OTP after registration
  const verifyOtp = async (email, otp) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      // After successful verification, store token and set user
      if (data.token && data.user) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        setCurrentUser(data.user);
      }

      return data;
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    }
  };

  // Resend OTP
  const resendOtp = async (email) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      return data;
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    setError(null);
    try {
      // Real API call to your backend
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      setCurrentUser(data.user);
      return data;
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setError(null);
    try {
      // Redirect to Google OAuth endpoint on your backend
      window.location.href = `${API_URL}/auth/google`;
      // The backend should redirect back with a token
      return null;
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    }
  };

  // Login with Facebook
  const loginWithFacebook = async () => {
    setError(null);
    try {
      // Redirect to Facebook OAuth endpoint on your backend
      window.location.href = `${API_URL}/auth/facebook`;
      // The backend should redirect back with a token
      return null;
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    }
  };

  // Reset password
  const forgotPassword = async (email) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset request failed');
      }

      return data;
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setError(null);
    try {
      // Get user ID and token
      const userId = currentUser?._id;
      const token = localStorage.getItem('authToken');

      if (!userId || !token) {
        throw new Error('You must be logged in to update your profile');
      }

      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Update local storage and state
      const updatedUser = data.user;
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      return data;
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  // Helper function to get user-friendly error messages
  const getErrorMessage = (error) => {
    // Customize based on your API's error responses
    return error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.';
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    loginWithFacebook,
    forgotPassword,
    logout: logoutUser,
    getErrorMessage,
    verifyOtp,
    resendOtp,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
