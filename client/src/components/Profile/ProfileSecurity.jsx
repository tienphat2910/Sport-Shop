import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfileSecurity = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Call API to change password
            const response = await fetch('http://localhost:5000/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Không thể thay đổi mật khẩu.');
            }

            setSuccess('Mật khẩu đã được thay đổi thành công!');
            // Reset form
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            setError(error.message || 'Không thể thay đổi mật khẩu. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h4 className="mb-4">Bảo mật tài khoản</h4>

            {success && (
                <div className="alert alert-success" role="alert">
                    <i className="fa-solid fa-check-circle me-2"></i>
                    {success}
                </div>
            )}

            {error && (
                <div className="alert alert-danger" role="alert">
                    <i className="fa-solid fa-exclamation-circle me-2"></i>
                    {error}
                </div>
            )}

            <div className="card border mb-4">
                <div className="card-header bg-white">
                    <h5 className="mb-0">Đổi mật khẩu</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="currentPassword" className="form-label">Mật khẩu hiện tại</label>
                            <div className="input-group">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    className="form-control"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    <i className={`fa-solid ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                            <div className="input-group">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    className="form-control"
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    <i className={`fa-solid ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                            <div className="form-text">Mật khẩu phải có ít nhất 6 ký tự.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu mới</label>
                            <div className="input-group">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Đang cập nhật...
                                </>
                            ) : (
                                <>Cập nhật mật khẩu</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSecurity;
