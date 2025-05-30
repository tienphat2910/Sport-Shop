import React from 'react';
import { Link } from 'react-router-dom';

const LoginLink = () => {
    return (
        <div className="text-center">
            <p className="mb-0">
                Bạn đã có tài khoản? {' '}
                <Link to="/login" className="text-decoration-none fw-semibold" style={{ color: '#22a7e0' }}>
                    Đăng nhập
                </Link>
            </p>
        </div>
    );
};

export default LoginLink;
