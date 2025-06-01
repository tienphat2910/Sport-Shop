import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfileInfo = () => {
    const { currentUser, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        phone: currentUser?.phone || '',
        gender: currentUser?.gender || '',
        dateOfBirth: currentUser?.dateOfBirth ? new Date(currentUser.dateOfBirth).toISOString().split('T')[0] : '',
        address: {
            street: currentUser?.address?.street || '',
            city: currentUser?.address?.city || '',
            state: currentUser?.address?.state || '',
            zipCode: currentUser?.address?.zipCode || '',
            country: currentUser?.address?.country || ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested address fields
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const result = await updateProfile(formData);
            setSuccess('Thông tin cá nhân đã được cập nhật thành công!');
            setIsEditing(false);
        } catch (error) {
            setError(error.message || 'Không thể cập nhật thông tin cá nhân. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    // Cancel editing and reset form
    const handleCancel = () => {
        setFormData({
            name: currentUser?.name || '',
            phone: currentUser?.phone || '',
            gender: currentUser?.gender || '',
            dateOfBirth: currentUser?.dateOfBirth ? new Date(currentUser.dateOfBirth).toISOString().split('T')[0] : '',
            address: {
                street: currentUser?.address?.street || '',
                city: currentUser?.address?.city || '',
                state: currentUser?.address?.state || '',
                zipCode: currentUser?.address?.zipCode || '',
                country: currentUser?.address?.country || ''
            }
        });
        setIsEditing(false);
        setError('');
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'Chưa cập nhật';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN');
        } catch (e) {
            return 'Chưa cập nhật';
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Thông tin cá nhân</h4>
                {!isEditing && (
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setIsEditing(true)}
                    >
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        Chỉnh sửa
                    </button>
                )}
            </div>

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

            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="name" className="form-label">Họ và tên</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={currentUser?.email || ''}
                                disabled
                            />
                            <div className="form-text">Email không thể thay đổi.</div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="phone" className="form-label">Số điện thoại</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="gender" className="form-label">Giới tính</label>
                            <select
                                className="form-select"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="dateOfBirth" className="form-label">Ngày sinh</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <h5 className="mt-4 mb-3">Địa chỉ</h5>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="address.street" className="form-label">Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address.street"
                                name="address.street"
                                value={formData.address.street}
                                onChange={handleChange}
                                placeholder="Số nhà, đường"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="address.city" className="form-label">Thành phố</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address.city"
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="address.state" className="form-label">Tỉnh/Thành phố</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address.state"
                                name="address.state"
                                value={formData.address.state}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="address.zipCode" className="form-label">Mã bưu điện</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address.zipCode"
                                name="address.zipCode"
                                value={formData.address.zipCode}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="address.country" className="form-label">Quốc gia</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address.country"
                                name="address.country"
                                value={formData.address.country}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleCancel}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Đang lưu...
                                </>
                            ) : (
                                <>Lưu thay đổi</>
                            )}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="mb-2 text-muted small">Họ và tên</div>
                        <div className="fw-medium">{currentUser?.name || 'Chưa cập nhật'}</div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="mb-2 text-muted small">Email</div>
                        <div className="fw-medium">{currentUser?.email || 'Chưa cập nhật'}</div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="mb-2 text-muted small">Số điện thoại</div>
                        <div className="fw-medium">{currentUser?.phone || 'Chưa cập nhật'}</div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="mb-2 text-muted small">Giới tính</div>
                        <div className="fw-medium">
                            {currentUser?.gender === 'male' ? 'Nam' :
                                currentUser?.gender === 'female' ? 'Nữ' :
                                    currentUser?.gender === 'other' ? 'Khác' : 'Chưa cập nhật'}
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="mb-2 text-muted small">Ngày sinh</div>
                        <div className="fw-medium">{formatDate(currentUser?.dateOfBirth)}</div>
                    </div>

                    <div className="col-12 mt-2">
                        <h5 className="mb-3">Địa chỉ</h5>
                        {currentUser?.address?.street ? (
                            <div>
                                <p className="mb-1">{currentUser.address.street}</p>
                                <p className="mb-1">
                                    {[
                                        currentUser.address.city,
                                        currentUser.address.state,
                                        currentUser.address.zipCode
                                    ].filter(Boolean).join(', ')}
                                </p>
                                <p>{currentUser.address.country || ''}</p>
                            </div>
                        ) : (
                            <p className="text-muted">Chưa cập nhật địa chỉ</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileInfo;
