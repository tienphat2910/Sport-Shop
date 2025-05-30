import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
        // Clear errors when typing
        if (error) setError('');
    };

    const validateEmail = () => {
        if (!email.trim()) {
            setError('Vui lòng nhập email');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Email không hợp lệ');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail()) return;

        setLoading(true);

        try {
            // Simulate API call to request password reset
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate success
            setSuccessMessage('Link đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.');
            setEmail('');
        } catch (error) {
            console.error('Password reset error:', error);
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Success message */}
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            {/* Only show the form if no success message */}
            {!successMessage && (
                <form onSubmit={handleSubmit} noValidate>
                    {/* Show error if any */}
                    {error && (
                        <div className="alert alert-danger py-2" role="alert">
                            {error}
                        </div>
                    )}

                    {/* Email field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${error ? 'is-invalid' : ''}`}
                            id="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-2"
                        style={{ backgroundColor: '#22a7e0', borderColor: '#22a7e0' }}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Đang xử lý...
                            </>
                        ) : 'Gửi link đặt lại mật khẩu'}
                    </button>
                </form>
            )}

            {/* If successful, show back to login button */}
            {successMessage && (
                <Link to="/login" className="btn btn-outline-primary w-100 mt-3">
                    Quay lại trang đăng nhập
                </Link>
            )}
        </div>
    );
};

export default ForgotPasswordForm;
