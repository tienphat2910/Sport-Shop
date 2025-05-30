import React from 'react';
import { DefaultLayout } from '../../layouts';
import ForgotPasswordForm from '../../components/Auth/ForgotPasswordForm';
import LoginLink from '../../components/Auth/LoginLink';

const ForgotPassword = () => {
    return (
        <DefaultLayout>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="text-center mb-4 fw-bold">Quên mật khẩu</h3>
                                <p className="text-center text-muted mb-4">
                                    Vui lòng nhập email bạn đã đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu vào email của bạn.
                                </p>

                                {/* Forgot Password Form */}
                                <ForgotPasswordForm />

                                {/* Login Link */}
                                <div className="text-center mt-4">
                                    <LoginLink />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ForgotPassword;
