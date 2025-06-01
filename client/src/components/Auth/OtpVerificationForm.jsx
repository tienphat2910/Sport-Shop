import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OtpVerificationForm = ({ email, name }) => {
    const navigate = useNavigate();
    const { verifyOtp, resendOtp } = useAuth();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const inputRefs = useRef([]);

    // Timer countdown
    useEffect(() => {
        if (timeLeft <= 0 || success) return;

        const timerId = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [timeLeft, success]);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle input change
    const handleChange = (index, value) => {
        // Only allow digits
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }

        // Clear error when typing
        if (error) setError('');
    };

    // Handle backspace key
    const handleKeyDown = (index, e) => {
        // If backspace is pressed and current field is empty, focus previous field
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Handle paste event
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();

        // Check if pasted content is a 6-digit number
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setOtp(digits);

            // Focus last input
            inputRefs.current[5].focus();
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpValue = otp.join('');

        if (otpValue.length !== 6) {
            setError('Vui lòng nhập đủ 6 chữ số của mã OTP');
            return;
        }

        setLoading(true);

        try {
            // Use verifyOtp from AuthContext
            await verifyOtp(email, otpValue);
            setSuccess(true);
            setError('');

            // Navigate to login page after 3 seconds
            setTimeout(() => {
                navigate('/login', {
                    state: {
                        verificationSuccess: true,
                        email: email
                    }
                });
            }, 3000);

        } catch (error) {
            console.error('Verification error:', error);
            setError(error.message || 'Mã OTP không đúng hoặc đã hết hạn. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        try {
            setError('');
            // Use resendOtp from AuthContext
            await resendOtp(email);
            setTimeLeft(300); // Reset timer to 5 minutes

            // Show a temporary success message
            setError('Mã OTP mới đã được gửi đến email của bạn');
            setTimeout(() => {
                setError('');
            }, 5000);
        } catch (error) {
            setError(error.message || 'Không thể gửi lại mã OTP. Vui lòng thử lại sau.');
        }
    };

    // If verification was successful, show success message
    if (success) {
        return (
            <div className="text-center">
                <div className="mb-4">
                    <i className="fa-solid fa-circle-check fa-4x text-success"></i>
                </div>
                <h4 className="mb-3">Xác thực thành công!</h4>
                <p className="mb-4">Tài khoản của bạn đã được kích hoạt. Bạn sẽ được chuyển đến trang đăng nhập trong giây lát.</p>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang chuyển hướng...</span>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Error message */}
            {error && (
                <div className={`alert ${error.includes('mới đã được gửi') ? 'alert-success' : 'alert-danger'} py-2 mb-3`} role="alert">
                    {error}
                </div>
            )}

            {/* OTP input fields */}
            <div className="mb-4">
                <label className="form-label">Nhập mã OTP 6 chữ số</label>
                <div className="d-flex justify-content-between gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            className="form-control text-center fw-bold fs-5"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : null}
                            style={{ width: '45px' }}
                            required
                        />
                    ))}
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                    <small className="text-muted">
                        Mã OTP hết hạn trong <span className="text-danger">{formatTime(timeLeft)}</span>
                    </small>
                    <button
                        type="button"
                        className="btn btn-link btn-sm p-0 text-decoration-none"
                        onClick={handleResendOtp}
                        disabled={timeLeft > 0 && timeLeft < 290} // Disable for 10 seconds after sending
                    >
                        Gửi lại mã
                    </button>
                </div>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                className="btn btn-primary w-100 py-2 mb-3"
                style={{ backgroundColor: '#22a7e0', borderColor: '#22a7e0' }}
                disabled={loading || otp.join('').length !== 6}
            >
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Đang xác thực...
                    </>
                ) : 'Xác thực'}
            </button>

            <div className="text-center">
                <button
                    type="button"
                    className="btn btn-link text-decoration-none"
                    onClick={() => navigate('/register')}
                >
                    Quay lại đăng ký
                </button>
            </div>
        </form>
    );
};

export default OtpVerificationForm;
