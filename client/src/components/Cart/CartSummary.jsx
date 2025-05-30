import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({
    subtotal,
    selectedItemCount,
    totalItemCount
}) => {
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');

    // Shipping is free for orders over 500,000₫
    const shippingFee = subtotal > 500000 ? 0 : 30000;

    // Apply a 10% discount for orders over 1,000,000₫
    const orderDiscount = subtotal > 1000000 ? subtotal * 0.1 : 0;

    const total = subtotal - orderDiscount - promoDiscount + shippingFee;

    const handlePromoSubmit = (e) => {
        e.preventDefault();

        // Mock promo code validation
        if (promoCode.toUpperCase() === 'SPORT10') {
            setPromoDiscount(subtotal * 0.1);
            setPromoApplied(true);
            setPromoError('');
        } else {
            setPromoError('Mã khuyến mãi không hợp lệ hoặc đã hết hạn');
            setPromoDiscount(0);
            setPromoApplied(false);
        }
    };

    const hasSelectedItems = selectedItemCount > 0;

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
                <h5 className="mb-0">Thông tin đơn hàng</h5>
                {selectedItemCount < totalItemCount && (
                    <div className="text-muted small mt-1">
                        <i className="fa-solid fa-info-circle me-1"></i>
                        Hiển thị tổng tiền cho {selectedItemCount} sản phẩm được chọn
                    </div>
                )}
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                    <span>Tạm tính ({selectedItemCount} sản phẩm)</span>
                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>

                {orderDiscount > 0 && (
                    <div className="d-flex justify-content-between mb-2 text-success">
                        <span>Giảm giá đơn hàng (10%)</span>
                        <span>-{orderDiscount.toLocaleString('vi-VN')}₫</span>
                    </div>
                )}

                {promoApplied && (
                    <div className="d-flex justify-content-between mb-2 text-success">
                        <span>Mã khuyến mãi (SPORT10)</span>
                        <span>-{promoDiscount.toLocaleString('vi-VN')}₫</span>
                    </div>
                )}

                <div className="d-flex justify-content-between mb-2">
                    <span>Phí vận chuyển</span>
                    {shippingFee > 0 ? (
                        <span>{shippingFee.toLocaleString('vi-VN')}₫</span>
                    ) : (
                        <span className="text-success">Miễn phí</span>
                    )}
                </div>

                <hr className="my-3" />

                <div className="d-flex justify-content-between mb-3">
                    <span className="fw-bold">Tổng cộng</span>
                    <span className="fw-bold fs-5 text-danger">{total.toLocaleString('vi-VN')}₫</span>
                </div>

                {/* Promo code input */}
                <form onSubmit={handlePromoSubmit} className="mb-3">
                    <div className="input-group">
                        <input
                            type="text"
                            className={`form-control ${promoError ? 'is-invalid' : ''}`}
                            placeholder="Mã khuyến mãi"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={promoApplied}
                        />
                        <button
                            className={`btn ${promoApplied ? 'btn-success' : 'btn-outline-secondary'}`}
                            type="submit"
                            disabled={promoApplied || !promoCode.trim()}
                        >
                            {promoApplied ? (
                                <><i className="fa-solid fa-check me-1"></i> Đã áp dụng</>
                            ) : (
                                'Áp dụng'
                            )}
                        </button>
                    </div>
                    {promoError && <div className="text-danger small mt-1">{promoError}</div>}
                    {promoApplied && (
                        <div className="text-success small mt-1">
                            Đã áp dụng mã giảm giá SPORT10 (Giảm 10%)
                        </div>
                    )}
                </form>

                <Link
                    to="/checkout"
                    className={`btn btn-primary d-block py-2 ${!hasSelectedItems ? 'disabled' : ''}`}
                >
                    {hasSelectedItems ? 'Tiến hành thanh toán' : 'Vui lòng chọn sản phẩm'}
                </Link>

                {subtotal < 500000 && subtotal > 0 && (
                    <div className="mt-3 small text-muted">
                        <i className="fa-solid fa-info-circle me-1"></i>
                        Mua thêm <strong>{(500000 - subtotal).toLocaleString('vi-VN')}₫</strong> để được miễn phí vận chuyển
                    </div>
                )}

                {!hasSelectedItems && (
                    <div className="mt-3 small text-danger">
                        <i className="fa-solid fa-circle-exclamation me-1"></i>
                        Bạn cần chọn ít nhất một sản phẩm để thanh toán
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSummary;
