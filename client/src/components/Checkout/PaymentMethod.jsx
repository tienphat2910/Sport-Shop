import React, { useState, useEffect } from 'react';

const PaymentMethod = ({ data, updateData }) => {
    const [paymentMethod, setPaymentMethod] = useState(data.method || 'cod');
    const [cardInfo, setCardInfo] = useState({
        cardNumber: data.cardNumber || '',
        cardName: data.cardName || '',
        cardExpiry: data.cardExpiry || '',
        cardCvc: data.cardCvc || ''
    });
    const [errors, setErrors] = useState({});

    // Update parent component data when payment method changes
    useEffect(() => {
        updateData({
            method: paymentMethod,
            ...cardInfo
        });
    }, [paymentMethod, cardInfo, updateData]);

    const handleMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCardInfoChange = (e) => {
        const { name, value } = e.target;

        // Format card number with spaces
        if (name === 'cardNumber') {
            const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
            setCardInfo({ ...cardInfo, [name]: formatted });
        }
        // Format expiry date as MM/YY
        else if (name === 'cardExpiry') {
            const cleaned = value.replace(/\D/g, '');
            let formatted = cleaned;

            if (cleaned.length > 2) {
                formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
            }

            setCardInfo({ ...cardInfo, [name]: formatted });
        }
        // Regular input handling
        else {
            setCardInfo({ ...cardInfo, [name]: value });
        }

        // Clear error when field is changed
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        // Validate fields
        let error = '';

        if (paymentMethod === 'credit') {
            switch (name) {
                case 'cardNumber':
                    error = value.replace(/\s/g, '').length !== 16 ? 'Số thẻ phải có 16 số' : '';
                    break;
                case 'cardName':
                    error = !value.trim() ? 'Vui lòng nhập tên chủ thẻ' : '';
                    break;
                case 'cardExpiry':
                    const pattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
                    error = !pattern.test(value) ? 'Định dạng MM/YY không hợp lệ' : '';
                    break;
                case 'cardCvc':
                    error = !/^[0-9]{3,4}$/.test(value) ? 'Mã CVC không hợp lệ' : '';
                    break;
                default:
                    break;
            }
        }

        setErrors({ ...errors, [name]: error });
    };

    return (
        <div>
            <h4 className="mb-3">Phương thức thanh toán</h4>

            <div className="payment-methods mb-4">
                {/* COD Payment Option */}
                <div className="form-check mb-3 p-0">
                    <input
                        type="radio"
                        className="btn-check"
                        name="paymentMethod"
                        id="cod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={handleMethodChange}
                    />
                    <label className="btn btn-outline-secondary d-flex align-items-center w-100 text-start" htmlFor="cod">
                        <i className="fa-solid fa-money-bill-wave fs-4 me-3"></i>
                        <div>
                            <div className="fw-bold">Thanh toán khi nhận hàng (COD)</div>
                            <small className="text-muted">Thanh toán bằng tiền mặt khi nhận hàng</small>
                        </div>
                    </label>
                </div>

                {/* Bank Transfer Option */}
                <div className="form-check mb-3 p-0">
                    <input
                        type="radio"
                        className="btn-check"
                        name="paymentMethod"
                        id="banking"
                        value="banking"
                        checked={paymentMethod === 'banking'}
                        onChange={handleMethodChange}
                    />
                    <label className="btn btn-outline-secondary d-flex align-items-center w-100 text-start" htmlFor="banking">
                        <i className="fa-solid fa-building-columns fs-4 me-3"></i>
                        <div>
                            <div className="fw-bold">Chuyển khoản ngân hàng</div>
                            <small className="text-muted">Chuyển khoản trước khi giao hàng</small>
                        </div>
                    </label>
                </div>

                {/* MoMo Payment Option */}
                <div className="form-check mb-3 p-0">
                    <input
                        type="radio"
                        className="btn-check"
                        name="paymentMethod"
                        id="momo"
                        value="momo"
                        checked={paymentMethod === 'momo'}
                        onChange={handleMethodChange}
                    />
                    <label className="btn btn-outline-secondary d-flex align-items-center w-100 text-start" htmlFor="momo">
                        <img
                            src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/momo_1.png"
                            alt="Momo"
                            className="me-3"
                            style={{ width: '32px', height: '32px' }}
                        />
                        <div>
                            <div className="fw-bold">Ví MoMo</div>
                            <small className="text-muted">Thanh toán qua ví điện tử MoMo</small>
                        </div>
                    </label>
                </div>

                {/* VNPay Payment Option */}
                <div className="form-check mb-3 p-0">
                    <input
                        type="radio"
                        className="btn-check"
                        name="paymentMethod"
                        id="vnpay"
                        value="vnpay"
                        checked={paymentMethod === 'vnpay'}
                        onChange={handleMethodChange}
                    />
                    <label className="btn btn-outline-secondary d-flex align-items-center w-100 text-start" htmlFor="vnpay">
                        <img
                            src="https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/vnpay-logo.png"
                            alt="VNPay"
                            className="me-3"
                            style={{ width: '32px', height: '32px' }}
                        />
                        <div>
                            <div className="fw-bold">VNPay</div>
                            <small className="text-muted">Thanh toán qua cổng VNPay</small>
                        </div>
                    </label>
                </div>

                {/* ZaloPay Payment Option */}
                <div className="form-check mb-3 p-0">
                    <input
                        type="radio"
                        className="btn-check"
                        name="paymentMethod"
                        id="zalopay"
                        value="zalopay"
                        checked={paymentMethod === 'zalopay'}
                        onChange={handleMethodChange}
                    />
                    <label className="btn btn-outline-secondary d-flex align-items-center w-100 text-start" htmlFor="zalopay">
                        <img
                            src="https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/zalopay-logo.png"
                            alt="ZaloPay"
                            className="me-3"
                            style={{ width: '32px', height: '32px' }}
                        />
                        <div>
                            <div className="fw-bold">ZaloPay</div>
                            <small className="text-muted">Thanh toán qua ví ZaloPay</small>
                        </div>
                    </label>
                </div>

                {/* Credit Card Option */}
                <div className="form-check mb-3 p-0">
                    <input
                        type="radio"
                        className="btn-check"
                        name="paymentMethod"
                        id="credit"
                        value="credit"
                        checked={paymentMethod === 'credit'}
                        onChange={handleMethodChange}
                    />
                    <label className="btn btn-outline-secondary d-flex align-items-center w-100 text-start" htmlFor="credit">
                        <i className="fa-solid fa-credit-card fs-4 me-3"></i>
                        <div>
                            <div className="fw-bold">Thẻ tín dụng/Ghi nợ</div>
                            <small className="text-muted">Thanh toán an toàn với Visa, Mastercard, JCB</small>
                        </div>
                    </label>
                </div>

                {/* Credit Card Form (Conditionally Rendered) */}
                {paymentMethod === 'credit' && (
                    <div className="card border mt-3 p-3">
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label">Số thẻ</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                                        id="cardNumber"
                                        name="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19" // 16 digits + 3 spaces
                                        value={cardInfo.cardNumber}
                                        onChange={handleCardInfoChange}
                                        onBlur={handleBlur}
                                    />
                                    <span className="input-group-text bg-white">
                                        <i className="fa-brands fa-cc-visa text-primary me-1"></i>
                                        <i className="fa-brands fa-cc-mastercard text-danger me-1"></i>
                                        <i className="fa-brands fa-cc-jcb text-success"></i>
                                    </span>
                                    {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="cardName" className="form-label">Tên chủ thẻ</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                                    id="cardName"
                                    name="cardName"
                                    placeholder="NGUYEN VAN A"
                                    value={cardInfo.cardName}
                                    onChange={handleCardInfoChange}
                                    onBlur={handleBlur}
                                />
                                {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cardExpiry" className="form-label">Ngày hết hạn</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.cardExpiry ? 'is-invalid' : ''}`}
                                        id="cardExpiry"
                                        name="cardExpiry"
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        value={cardInfo.cardExpiry}
                                        onChange={handleCardInfoChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.cardExpiry && <div className="invalid-feedback">{errors.cardExpiry}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cardCvc" className="form-label">CVC/CVV</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.cardCvc ? 'is-invalid' : ''}`}
                                        id="cardCvc"
                                        name="cardCvc"
                                        placeholder="123"
                                        maxLength="4"
                                        value={cardInfo.cardCvc}
                                        onChange={handleCardInfoChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.cardCvc && <div className="invalid-feedback">{errors.cardCvc}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bank Transfer Details (Conditionally Rendered) */}
                {paymentMethod === 'banking' && (
                    <div className="card border mt-3">
                        <div className="card-body">
                            <h6 className="card-title">Thông tin chuyển khoản</h6>
                            <p className="card-text small mb-1">Ngân hàng: <strong>Vietcombank</strong></p>
                            <p className="card-text small mb-1">Số tài khoản: <strong>1234567890</strong></p>
                            <p className="card-text small mb-1">Chủ tài khoản: <strong>CONG TY TNHH SPORT SHOP</strong></p>
                            <p className="card-text small mb-1">Nội dung: <strong>Thanh toan don hang [Số điện thoại]</strong></p>
                            <div className="alert alert-info mt-3 mb-0 small py-2">
                                <i className="fa-solid fa-circle-info me-2"></i>
                                Đơn hàng sẽ được xử lý sau khi chúng tôi nhận được thanh toán.
                            </div>
                        </div>
                    </div>
                )}

                {/* MoMo Details (Conditionally Rendered) */}
                {paymentMethod === 'momo' && (
                    <div className="card border mt-3">
                        <div className="card-body">
                            <h6 className="card-title">Thanh toán qua MoMo</h6>
                            <p className="card-text small">Quét mã QR hoặc nhập số điện thoại để thanh toán:</p>
                            <div className="text-center mb-2">
                                <div className="bg-light p-3 d-inline-block">
                                    <img
                                        src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/momo_1.png"
                                        alt="MoMo QR"
                                        className="mb-2"
                                        style={{ width: '100px' }}
                                    />
                                    <small className="text-muted d-block">Mã QR thanh toán</small>
                                </div>
                            </div>
                            <p className="card-text small mb-1">Số điện thoại MoMo: <strong>0987654321</strong></p>
                            <p className="card-text small mb-1">Tên tài khoản: <strong>SPORT SHOP</strong></p>
                            <div className="alert alert-info mt-3 mb-0 small py-2">
                                <i className="fa-solid fa-circle-info me-2"></i>
                                Hệ thống sẽ tự động xác nhận sau khi bạn thanh toán thành công.
                            </div>
                        </div>
                    </div>
                )}

                {/* VNPay or ZaloPay Details (Conditionally Rendered) */}
                {(paymentMethod === 'vnpay' || paymentMethod === 'zalopay') && (
                    <div className="card border mt-3">
                        <div className="card-body">
                            <h6 className="card-title">Thanh toán qua {paymentMethod === 'vnpay' ? 'VNPay' : 'ZaloPay'}</h6>
                            <p className="card-text small">Bạn sẽ được chuyển đến cổng thanh toán {paymentMethod === 'vnpay' ? 'VNPay' : 'ZaloPay'} sau khi xác nhận đơn hàng.</p>
                            <div className="text-center my-3">
                                <img
                                    src={paymentMethod === 'vnpay'
                                        ? "https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/vnpay-logo.png"
                                        : "https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/zalopay-logo.png"
                                    }
                                    alt={paymentMethod === 'vnpay' ? "VNPay" : "ZaloPay"}
                                    style={{ width: '100px' }}
                                />
                            </div>
                            <div className="alert alert-info mb-0 small py-2">
                                <i className="fa-solid fa-circle-info me-2"></i>
                                Hãy làm theo hướng dẫn trên màn hình thanh toán để hoàn tất giao dịch.
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentMethod;
