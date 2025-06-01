import axios from 'axios';

// Access environment variables using import.meta.env for Vite
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'sport_shop_token';
const USER_KEY = import.meta.env.VITE_USER_KEY || 'sport_shop_user';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add authorization header to requests when token exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth APIs
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/api/auth/register', userData);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/api/auth/login', credentials);

        // Save token and user data to localStorage
        if (response.data.token) {
            localStorage.setItem(TOKEN_KEY, response.data.token);
            localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
        }

        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const logoutUser = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

export const verifyEmail = async (verificationData) => {
    try {
        const response = await api.post('/api/auth/verify-email', verificationData);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const requestPasswordReset = async (email) => {
    try {
        const response = await api.post('/api/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

// Helper function to handle API errors
const handleApiError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return {
            status: error.response.status,
            message: error.response.data.message || 'An error occurred',
            data: error.response.data
        };
    } else if (error.request) {
        // The request was made but no response was received
        return {
            status: 0,
            message: 'No response from server. Please check your connection.'
        };
    } else {
        // Something happened in setting up the request that triggered an Error
        return {
            status: 0,
            message: error.message || 'An unknown error occurred'
        };
    }
};

// Get current authenticated user
export const getCurrentUser = () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem(TOKEN_KEY);
};

export default api;
