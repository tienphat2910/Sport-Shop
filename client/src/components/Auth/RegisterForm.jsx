import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

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

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Full name validation
        if (!formData.name?.trim()) {
            newErrors.name = 'Vui lòng nhập họ tên';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        // Terms and conditions validation
        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Call register function from AuthContext
            const response = await register(formData.name, formData.email, formData.password);

            console.log('Registration successful, OTP sent');

            // Redirect to OTP verification page instead of showing success message
            navigate('/verify-email', {
                state: {
                    email: formData.email,
                    name: formData.name
                }
            });
        } catch (error) {
            console.error('Registration error:', error);

            if (error.message.includes('already in use')) {
                setErrors({
                    email: 'Email này đã được đăng ký. Vui lòng sử dụng email khác.'
                });
            } else {
                setErrors({
                    form: error.message || 'Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.'
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            {/* Success message */}
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            {/* Show form error if any */}
            {errors.form && (
                <div className="alert alert-danger py-2" role="alert">
                    {errors.form}
                </div>
            )}

            {/* Full Name field */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Họ và tên</label>
                <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên của bạn"
                    required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

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
                        onClick={() => togglePasswordVisibility('password')}
                    >
                        <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <small className="form-text text-muted">Mật khẩu phải có ít nhất 6 ký tự</small>
            </div>

            {/* Confirm Password field */}
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                <div className="input-group">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Nhập lại mật khẩu"
                        required
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                    >
                        <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
            </div>

            {/* Terms and Conditions checkbox */}
            <div className="mb-4">
                <div className="form-check">
                    <input
                        className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        required
                    />
                    <label className="form-check-label" htmlFor="acceptTerms">
                        Tôi đồng ý với <a href="/terms" className="text-decoration-none">điều khoản sử dụng</a> và <a href="/privacy" className="text-decoration-none">chính sách bảo mật</a>
                    </label>
                    {errors.acceptTerms && <div className="invalid-feedback">{errors.acceptTerms}</div>}
                </div>
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
                        Đang đăng ký...
                    </>
                ) : 'Đăng ký'}
            </button>
        </form>
    );
};

export default RegisterForm;
