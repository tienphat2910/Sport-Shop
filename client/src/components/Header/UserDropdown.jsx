import React from 'react';
import { Link } from 'react-router-dom';

const UserDropdown = ({ userDropdownOpen, toggleUserDropdown }) => {
    return (
        <div className="nav-item dropdown user-dropdown-container">
            <a
                className="nav-link px-2 px-md-3"
                href="#"
                role="button"
                onClick={toggleUserDropdown}
                aria-expanded={userDropdownOpen ? "true" : "false"}
            >
                <i className="fa-solid fa-user"></i>
            </a>
            <ul
                className={`dropdown-menu dropdown-menu-end shadow ${userDropdownOpen ? 'show' : ''}`}
                style={{
                    minWidth: '200px',
                    margin: '0.125rem 0 0',
                    padding: '8px 0',
                    borderRadius: '4px',
                    border: 'none',
                    zIndex: 1000
                }}
            >
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
            </ul>
        </div>
    );
};

export default UserDropdown;
