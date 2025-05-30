import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderReview = ({ orderInfo, items }) => {
    const { shipping, payment } = orderInfo;
    const [paymentMethodIcons, setPaymentMethodIcons] = useState({
        momo: <img src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/momo_1.png" alt="Momo" className="me-2" style={{ width: '24px', height: '24px' }} />,
        vnpay: <img src="https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/vnpay-logo.png" alt="VNPay" className="me-2" style={{ width: '24px', height: '24px' }} />,
        zalopay: <img src="https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/zalopay-logo.png" alt="ZaloPay" className="me-2" style={{ width: '24px', height: '24px' }} />
    });

    // Helper for payment method display
    const getPaymentMethodText = () => {
        switch (payment.method) {
            case 'cod':
                return 'Thanh toán khi nhận hàng (COD)';
            case 'banking':
                return 'Chuyển khoản ngân hàng';
            case 'momo':
                return 'Ví MoMo';
            case 'vnpay':
                return 'VNPay';
            case 'zalopay':
                return 'ZaloPay';
            case 'credit':
                return 'Thẻ tín dụng/Ghi nợ';
            default:
                return 'Không xác định';
        }
    };

    // Helper for payment method icon
    const getPaymentMethodIcon = () => {
        switch (payment.method) {
            case 'momo':
                return paymentMethodIcons.momo;
            case 'vnpay':
                return paymentMethodIcons.vnpay;
            case 'zalopay':
                return paymentMethodIcons.zalopay;
            case 'cod':
                return <i className="fa-solid fa-money-bill-wave me-1"></i>;
            case 'banking':
                return <i className="fa-solid fa-building-columns me-1"></i>;
            case 'credit':
                return <i className="fa-solid fa-credit-card me-1"></i>;
            default:
                return null;
        }
    };

    return (
        <div>
            <h4 className="mb-3">Xác nhận đơn hàng</h4>

            <div className="row">
                {/* Shipping Information Summary */}
                <div className="col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0 h6">
                                <i className="fa-solid fa-location-dot me-2"></i>
                                Địa chỉ giao hàng
                            </h5>
                            <Link to="#" onClick={(e) => { e.preventDefault(); window.history.back(); }} className="small text-decoration-none">
                                <i className="fa-solid fa-pen-to-square me-1"></i>
                                Sửa
                            </Link>
                        </div>
                        <div className="card-body">
                            <p className="card-text fw-bold mb-1">{shipping.fullName}</p>
                            <p className="card-text small mb-1">Điện thoại: {shipping.phone}</p>
                            <p className="card-text small mb-1">Email: {shipping.email}</p>
                            <p className="card-text small mb-1">
                                {shipping.address}, {shipping.ward}, {shipping.district}, {shipping.province}
                            </p>
                            {shipping.notes && (
                                <div className="mt-2">
                                    <p className="card-text small mb-0"><strong>Ghi chú:</strong></p>
                                    <p className="card-text small fst-italic">{shipping.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Payment Method Summary */}
                <div className="col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0 h6">
                                <i className="fa-solid fa-credit-card me-2"></i>
                                Phương thức thanh toán
                            </h5>
                            <Link to="#" onClick={(e) => { e.preventDefault(); window.history.back(); }} className="small text-decoration-none">
                                <i className="fa-solid fa-pen-to-square me-1"></i>
                                Sửa
                            </Link>
                        </div>
                        <div className="card-body">
                            <p className="card-text mb-1 d-flex align-items-center">
                                {getPaymentMethodIcon()}
                                {getPaymentMethodText()}
                            </p>

                            {payment.method === 'credit' && (
                                <div className="mt-2 small">
                                    <p className="mb-1">Thẻ: **** **** **** {payment.cardNumber.slice(-4)}</p>
                                    <p className="mb-0">Chủ thẻ: {payment.cardName}</p>
                                </div>
                            )}

                            {payment.method === 'banking' && (
                                <div className="alert alert-light mt-2 py-2 small mb-0">
                                    Vui lòng chuyển khoản đúng nội dung để đơn hàng được xử lý nhanh chóng.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="card mb-4">
                <div className="card-header bg-white">
                    <h5 className="card-title mb-0 h6">
                        <i className="fa-solid fa-basket-shopping me-2"></i>
                        Sản phẩm
                    </h5>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col" className="ps-3">Sản phẩm</th>
                                    <th scope="col" className="text-center">Đơn giá</th>
                                    <th scope="col" className="text-center">Số lượng</th>
                                    <th scope="col" className="text-end pe-3">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="align-middle ps-3">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="me-3 rounded"
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                />
                                                <div>
                                                    <p className="mb-0 fw-medium">{item.name}</p>
                                                    {(item.size || item.color) && (
                                                        <small className="text-muted">
                                                            {item.size && `Size: ${item.size}`}
                                                            {item.size && item.color && ' | '}
                                                            {item.color && `Màu: ${item.color}`}
                                                        </small>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle text-center">
                                            {item.price.toLocaleString('vi-VN')}₫
                                        </td>
                                        <td className="align-middle text-center">
                                            {item.quantity}
                                        </td>
                                        <td className="align-middle text-end fw-bold pe-3">
                                            {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="alert alert-warning" role="alert">
                <div className="d-flex">
                    <div className="me-3">
                        <i className="fa-solid fa-circle-info fa-2x"></i>
                    </div>
                    <div>
                        <h6 className="alert-heading fw-bold">Lưu ý:</h6>
                        <p className="mb-0 small">
                            Vui lòng kiểm tra lại thông tin đơn hàng trước khi xác nhận. Bằng cách nhấn "Đặt hàng",
                            bạn đồng ý với <a href="/terms" className="alert-link">điều khoản dịch vụ</a> và
                            <a href="/privacy" className="alert-link"> chính sách bảo mật</a> của chúng tôi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;
