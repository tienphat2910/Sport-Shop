import React from 'react';

const SocialLogin = ({ buttonText = 'Đăng nhập với' }) => {
    const handleSocialLogin = (provider) => {
        console.log(`${buttonText} ${provider}`);
        // Here you would implement the OAuth flow for the selected provider
    };

    return (
        <div className="social-login mb-4">
            <button
                type="button"
                className="btn btn-outline-secondary w-100 mb-2 d-flex align-items-center justify-content-center"
                onClick={() => handleSocialLogin('Google')}
            >
                <i className="fab fa-google me-2"></i> {buttonText} Google
            </button>
            <button
                type="button"
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                onClick={() => handleSocialLogin('Facebook')}
            >
                <i className="fab fa-facebook-f me-2"></i> {buttonText} Facebook
            </button>
        </div>
    );
};

export default SocialLogin;
