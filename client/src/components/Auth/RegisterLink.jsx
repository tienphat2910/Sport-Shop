import React from 'react';
import { Link } from 'react-router-dom';

const RegisterLink = () => {
    return (
        <div className="text-center">
            <p className="mb-0">
                Bạn chưa có tài khoản? {' '}
                <Link to="/register" className="text-decoration-none fw-semibold" style={{ color: '#22a7e0' }}>
                    Đăng ký ngay
                </Link>
            </p>
        </div>
    );
};

export default RegisterLink;
