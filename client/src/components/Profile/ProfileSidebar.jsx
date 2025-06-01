import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfileSidebar = ({ activeTab, onTabChange }) => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!currentUser || !currentUser.name) return 'U';

        return currentUser.name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    // Handle logout
    const handleLogout = () => {
        if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            logout();
            navigate('/login');
        }
    };

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-body text-center p-4">
                {/* User Avatar */}
                <div className="mb-3">
                    <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                        style={{ width: '80px', height: '80px', fontSize: '32px' }}
                    >
                        {getUserInitials()}
                    </div>
                </div>

                {/* User Name & Email */}
                <h5 className="fw-bold mb-1">{currentUser?.name || 'Người dùng'}</h5>
                <p className="text-muted small mb-3">{currentUser?.email || ''}</p>

                <hr className="my-3" />

                {/* Navigation List */}
                <ul className="nav flex-column nav-pills">
                    <li className="nav-item">
                        <button
                            className={`nav-link text-start ${activeTab === 'info' ? 'active' : ''}`}
                            onClick={() => onTabChange('info')}
                        >
                            <i className="fa-solid fa-user me-2"></i>
                            Thông tin cá nhân
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link text-start ${activeTab === 'security' ? 'active' : ''}`}
                            onClick={() => onTabChange('security')}
                        >
                            <i className="fa-solid fa-shield-alt me-2"></i>
                            Bảo mật tài khoản
                        </button>
                    </li>

                    <li className="nav-item mt-2">
                        <button
                            className="nav-link text-start text-danger"
                            onClick={handleLogout}
                        >
                            <i className="fa-solid fa-sign-out-alt me-2"></i>
                            Đăng xuất
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileSidebar;
