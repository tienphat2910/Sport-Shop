import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SocialLogin = () => {
    const navigate = useNavigate();
    const { loginWithGoogle, loginWithFacebook } = useAuth();
    const [loading, setLoading] = useState({
        google: false,
        facebook: false
    });
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        setLoading({ ...loading, google: true });
        setError('');
        
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (error) {
            console.error('Google login error:', error);
            setError(error.message);
        } finally {
            setLoading({ ...loading, google: false });
        }
    };

    const handleFacebookLogin = async () => {
        setLoading({ ...loading, facebook: true });
        setError('');
        
        try {
            await loginWithFacebook();
            navigate('/');
        } catch (error) {
            console.error('Facebook login error:', error);
            setError(error.message);
        } finally {
            setLoading({ ...loading, facebook: false });
        }
    };

    return (
        <div>
            {error && (
                <div className="alert alert-danger py-2 mb-3" role="alert">
                    {error}
                </div>
            )}
            
            <div className="d-grid gap-2 mb-3">
                <button 
                    type="button" 
                    className="btn btn-outline-danger d-flex align-items-center justify-content-center" 
                    onClick={handleGoogleLogin}
                    disabled={loading.google || loading.facebook}
                >
                    {loading.google ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                        <i className="fab fa-google me-2"></i>
                    )}
                    Đăng nhập với Google
                </button>
                
                <button 
                    type="button" 
                    className="btn btn-outline-primary d-flex align-items-center justify-content-center" 
                    onClick={handleFacebookLogin}
                    disabled={loading.google || loading.facebook}
                >
                    {loading.facebook ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                        <i className="fab fa-facebook-f me-2"></i>
                    )}
                    Đăng nhập với Facebook
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
