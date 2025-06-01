import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginSuccessModal from './LoginSuccessModal';

const LoginForm = ({ initialEmail = '' }) => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: initialEmail,
        password: '',
        rememberMe: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [userName, setUserName] = useState('');

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Use the login function from AuthContext
            const response = await login(formData.email, formData.password);
            console.log('Login successful:', response);

            // Extract user data from the response
            const userData = response.user || {};

            // Set user name and show success modal
            setUserName(userData.name || userData.displayName || formData.email.split('@')[0]);
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Login error:', error);
            setErrors({
                form: error.message || 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.'
            });
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        // Navigate to home page after closing the modal
        navigate('/');
    };

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                {/* Show form error if any */}
                {errors.form && (
                    <div className="alert alert-danger py-2" role="alert">
                        {errors.form}
                    </div>
                )}

                {/* Email field */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Nhập email của bạn"
                        required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* Password field */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
                            required
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={togglePasswordVisibility}
                        >
                            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                </div>

                {/* Remember me & Forgot password */}
                <div className="d-flex justify-content-between mb-4">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        <label className="form-check-label small" htmlFor="rememberMe">
                            Ghi nhớ đăng nhập
                        </label>
                    </div>
                    <Link to="/forgot-password" className="small text-decoration-none">Quên mật khẩu?</Link>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 mb-3"
                    style={{ backgroundColor: '#22a7e0', borderColor: '#22a7e0' }}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Đang đăng nhập...
                        </>
                    ) : 'Đăng nhập'}
                </button>
            </form>

            {/* Login Success Modal */}
            <LoginSuccessModal
                show={showSuccessModal}
                onClose={handleModalClose}
                userName={userName}
            />
        </>
    );
};

export default LoginForm;
