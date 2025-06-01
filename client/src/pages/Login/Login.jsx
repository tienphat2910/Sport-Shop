import React from 'react';
import { useLocation } from 'react-router-dom';
import { DefaultLayout } from '../../layouts';
import LoginForm from '../../components/Auth/LoginForm';
import SocialLogin from '../../components/Auth/SocialLogin';
import RegisterLink from '../../components/Auth/RegisterLink';

const Login = () => {
    const location = useLocation();
    const verificationSuccess = location.state?.verificationSuccess || false;
    const verifiedEmail = location.state?.email || '';

    return (
        <DefaultLayout>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="text-center mb-4 fw-bold">Đăng nhập</h3>

                                {/* Show verification success message if applicable */}
                                {verificationSuccess && (
                                    <div className="alert alert-success mb-4" role="alert">
                                        <i className="fa-solid fa-check-circle me-2"></i>
                                        Email của bạn đã được xác thực thành công! Bây giờ bạn có thể đăng nhập.
                                    </div>
                                )}

                                {/* Login Form Component */}
                                <LoginForm initialEmail={verifiedEmail} />

                                {/* Divider */}
                                <div className="d-flex align-items-center my-4">
                                    <hr className="flex-grow-1" />
                                    <span className="px-3 small text-muted">HOẶC</span>
                                    <hr className="flex-grow-1" />
                                </div>

                                {/* Social Login Options */}
                                <SocialLogin />

                                {/* Register Link */}
                                <RegisterLink />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Login;
