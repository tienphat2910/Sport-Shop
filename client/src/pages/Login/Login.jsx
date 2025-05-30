import React from 'react';
import { DefaultLayout } from '../../layouts';
import LoginForm from '../../components/Auth/LoginForm';
import SocialLogin from '../../components/Auth/SocialLogin';
import RegisterLink from '../../components/Auth/RegisterLink';

const Login = () => {
    return (
        <DefaultLayout>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="text-center mb-4 fw-bold">Đăng nhập</h3>

                                {/* Login Form Component */}
                                <LoginForm />

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
