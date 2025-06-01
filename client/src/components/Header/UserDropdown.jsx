import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserDropdown = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop event from bubbling up
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        // Show confirmation dialog before logging out
        if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            logout();
            setDropdownOpen(false);
            navigate('/login');
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Get user display name or extract from email
    const getUserName = () => {
        if (currentUser) {
            return currentUser.displayName || currentUser.email.split('@')[0];
        }
        return '';
    };

    // Get user initials for avatar
    const getUserInitials = () => {
        if (currentUser) {
            if (currentUser.displayName) {
                return currentUser.displayName
                    .split(' ')
                    .map(part => part[0])
                    .join('')
                    .toUpperCase()
                    .substring(0, 2);
            }
            return currentUser.email.substring(0, 2).toUpperCase();
        }
        return '';
    };

    // Show different dropdown content based on authentication status
    return (
        <div className="nav-item dropdown user-dropdown-container" ref={dropdownRef}>
            <a
                className="nav-link px-2 px-md-3 d-flex align-items-center"
                href="#"
                role="button"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen ? "true" : "false"}
                style={{ color: '#22a7e0' }}
            >
                {currentUser ? (
                    <>
                        <i className="fa-solid fa-circle-user me-2"></i>
                        <span className="d-none d-md-inline">{getUserName()}</span>
                    </>
                ) : (
                    <i className="fa-solid fa-user"></i>
                )}
            </a>

            <ul
                className={`dropdown-menu dropdown-menu-end shadow ${dropdownOpen ? 'show' : ''}`}
                style={{
                    minWidth: '240px',
                    margin: '0.125rem 0 0',
                    padding: '8px 0',
                    borderRadius: '4px',
                    border: 'none',
                    zIndex: 1000,
                    right: '-85px'
                }}
            >
                {currentUser ? (
                    <>
                        <li className="dropdown-header">
                            <div className="d-flex align-items-center mb-2">
                                {currentUser.photoURL ? (
                                    <img 
                                        src={currentUser.photoURL} 
                                        alt="Profile" 
                                        className="rounded-circle me-2"
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                ) : (
                                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                                        style={{ width: '40px', height: '40px', fontSize: '16px' }}>
                                        {getUserInitials()}
                                    </div>
                                )}
                                <div>
                                    <div className="fw-bold">{getUserName()}</div>
                                    <div className="text-muted small">{currentUser.email}</div>
                                </div>
                            </div>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <Link className="dropdown-item py-2" to="/profile">
                                <i className="fa-solid fa-user me-2"></i>
                                Thông tin cá nhân
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item py-2" to="/orders">
                                <i className="fa-solid fa-box me-2"></i>
                                Đơn hàng của tôi
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item py-2" to="/wishlist">
                                <i className="fa-solid fa-heart me-2"></i>
                                Sản phẩm yêu thích
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item py-2" to="/addresses">
                                <i className="fa-solid fa-location-dot me-2"></i>
                                Địa chỉ giao hàng
                            </Link>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <button className="dropdown-item text-danger py-2" onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket me-2"></i>
                                Đăng xuất
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link className="dropdown-item py-2" to="/login">
                                <i className="fa-solid fa-right-to-bracket me-2"></i>
                                Đăng nhập
                            </Link>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <Link className="dropdown-item py-2" to="/register">
                                <i className="fa-solid fa-user-plus me-2"></i>
                                Đăng ký
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default UserDropdown;
