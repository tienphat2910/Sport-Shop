import React from 'react';
import { Link } from 'react-router-dom';

const OrderSummary = ({ items, subtotal, shipping, discount, total }) => {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-white py-3">
                <h5 className="mb-0">Tóm tắt đơn hàng</h5>
            </div>
            <div className="card-body">
                {/* Items Summary */}
                <div className="mb-3">
                    <p className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Sản phẩm ({itemCount})</span>
                        <Link to="/cart" className="small text-decoration-none">
                            <i className="fa-solid fa-pen-to-square me-1"></i>
                            Sửa
                        </Link>
                    </p>
                    <div className="border-top pt-2">
                        {items.map((item) => (
                            <div key={item.id} className="d-flex justify-content-between small mb-2">
                                <span className="text-truncate" style={{ maxWidth: '60%' }}>
                                    {item.quantity} x {item.name}
                                </span>
                                <span className="text-end">
                                    {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Breakdown */}
                <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                        <span>Tạm tính</span>
                        <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                    </div>

                    {discount > 0 && (
                        <div className="d-flex justify-content-between mb-2 text-success">
                            <span>Giảm giá</span>
                            <span>-{discount.toLocaleString('vi-VN')}₫</span>
                        </div>
                    )}

                    <div className="d-flex justify-content-between mb-2">
                        <span>Phí vận chuyển</span>
                        {shipping > 0 ? (
                            <span>{shipping.toLocaleString('vi-VN')}₫</span>
                        ) : (
                            <span className="text-success">Miễn phí</span>
                        )}
                    </div>
                </div>

                <hr />

                {/* Total */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h6 mb-0 fw-bold">Tổng cộng</span>
                    <span className="h5 mb-0 fw-bold text-danger">{total.toLocaleString('vi-VN')}₫</span>
                </div>

                <div className="alert alert-light p-2 small mb-0">
                    <i className="fa-solid fa-shield-halved me-1"></i>
                    Mọi giao dịch đều được bảo mật và mã hóa.
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
