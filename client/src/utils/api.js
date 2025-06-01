const API_URL = 'http://localhost:5000/api';

// Helper functions to check authentication status
export const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null;
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// This will be integrated with the AuthContext
export const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
};

// User authentication
export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Store token and user data in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// For verification
export const verifyEmail = async (verificationData) => {
    try {
        const response = await fetch(`${API_URL}/auth/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(verificationData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Email verification failed');
        }

        return data;
    } catch (error) {
        console.error('Email verification error:', error);
        throw error;
    }
};

// Password reset
export const requestPasswordReset = async (email) => {
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
        console.error('Password reset request error:', error);
        throw error;
    }
};

// Add authentication headers to requests
export const authHeader = () => {
    const token = getAuthToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Function to make authenticated API requests
export const fetchWithAuth = async (url, options = {}) => {
    const headers = {
        ...options.headers,
        ...authHeader(),
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Request failed');
    }

    return data;
};
