import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { DefaultLayout } from '../../layouts';
import OtpVerificationForm from '../../components/Auth/OtpVerificationForm';

const VerifyEmail = () => {
    const location = useLocation();
    const email = location.state?.email || '';

    // If no email was provided in the state, redirect to registration
    if (!email) {
        return <Navigate to="/register" replace />;
    }

    return (
        <DefaultLayout>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="text-center mb-3 fw-bold">Xác thực Email</h3>
                                <p className="text-center text-muted mb-4">
                                    Chúng tôi đã gửi mã OTP đến email <strong>{email}</strong>.<br />
                                    Vui lòng kiểm tra hộp thư đến và nhập mã xác thực bên dưới.
                                </p>

                                <OtpVerificationForm email={email} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default VerifyEmail;
