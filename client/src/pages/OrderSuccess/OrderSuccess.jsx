import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DefaultLayout } from '../../layouts';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const orderNumber = `OD${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    const orderDate = new Date().toLocaleDateString('vi-VN');

    // Redirect if accessed directly without order
    useEffect(() => {
        const hasOrder = sessionStorage.getItem('hasOrderedRecently');
        if (!hasOrder) {
            // For demo purposes, set this to true so we can view the page
            sessionStorage.setItem('hasOrderedRecently', 'true');
            // In a real app, you might redirect if there's no recent order
            // navigate('/');
        }

        return () => {
            // Clear the flag when navigating away
            sessionStorage.removeItem('hasOrderedRecently');
        };
    }, [navigate]);

    return (
        <DefaultLayout>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center p-5">
                                <div className="mb-4">
                                    <i className="fa-solid fa-circle-check fa-5x text-success"></i>
                                </div>

                                <h2 className="mb-4">Đặt hàng thành công!</h2>

                                <p className="fs-5 mb-1">Cảm ơn bạn đã đặt hàng tại Sport Shop</p>
                                <p className="mb-4">Đơn hàng của bạn đã được xác nhận và đang được xử lý.</p>

                                <div className="card bg-light mb-4">
                                    <div className="card-body py-3">
                                        <div className="row">
                                            <div className="col-md-6 mb-2 mb-md-0">
                                                <div className="text-start">
                                                    <p className="small text-muted mb-1">Mã đơn hàng:</p>
                                                    <p className="fw-bold mb-0">{orderNumber}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="text-md-end text-start">
                                                    <p className="small text-muted mb-1">Ngày đặt hàng:</p>
                                                    <p className="fw-bold mb-0">{orderDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert alert-info" role="alert">
                                    <div className="d-flex">
                                        <i className="fa-solid fa-envelope me-3 fs-4"></i>
                                        <div className="text-start">
                                            <p className="fw-bold mb-1">Chúng tôi đã gửi email xác nhận đơn hàng!</p>
                                            <p className="small mb-0">
                                                Vui lòng kiểm tra hộp thư của bạn để xem chi tiết đơn hàng.
                                                Nếu không tìm thấy email, hãy kiểm tra thư mục "Spam" hoặc "Quảng cáo".
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
                                    <Link to="/orders" className="btn btn-outline-primary">
                                        <i className="fa-solid fa-receipt me-2"></i>
                                        Xem đơn hàng của tôi
                                    </Link>
                                    <Link to="/" className="btn btn-primary">
                                        <i className="fa-solid fa-house me-2"></i>
                                        Tiếp tục mua sắm
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <p className="mb-2">Có vấn đề với đơn hàng của bạn?</p>
                            <Link to="/contact" className="text-decoration-none">
                                <i className="fa-solid fa-headset me-2"></i>
                                Liên hệ với chúng tôi
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default OrderSuccess;
