import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultLayout } from '../../layouts';
import ShippingForm from '../../components/Checkout/ShippingForm';
import PaymentMethod from '../../components/Checkout/PaymentMethod';
import OrderReview from '../../components/Checkout/OrderReview';
import OrderSummary from '../../components/Checkout/OrderSummary';
import CheckoutSteps from '../../components/Checkout/CheckoutSteps';
import cartItems from '../../data/cartItems';

const Checkout = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [orderInfo, setOrderInfo] = useState({
        shipping: {
            fullName: '',
            phone: '',
            email: '',
            address: '',
            province: '',
            district: '',
            ward: '',
            notes: ''
        },
        payment: {
            method: 'cod',
            cardNumber: '',
            cardName: '',
            cardExpiry: '',
            cardCvc: ''
        }
    });

    // Fetch cart data
    useEffect(() => {
        // Simulate API call to get cart items
        setTimeout(() => {
            setItems(cartItems);
            setLoading(false);
        }, 500);
    }, []);

    // Calculate totals
    const getSubtotal = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getShippingFee = () => {
        return getSubtotal() > 500000 ? 0 : 30000;
    };

    const getDiscount = () => {
        return getSubtotal() > 1000000 ? getSubtotal() * 0.1 : 0;
    };

    const getTotal = () => {
        return getSubtotal() - getDiscount() + getShippingFee();
    };

    const updateShipping = (data) => {
        setOrderInfo({
            ...orderInfo,
            shipping: { ...data }
        });
    };

    const updatePayment = (data) => {
        setOrderInfo({
            ...orderInfo,
            payment: { ...data }
        });
    };

    const validateCurrentStep = () => {
        if (currentStep === 1) {
            // Validate shipping info
            const { fullName, phone, email, address, province, district, ward } = orderInfo.shipping;
            return fullName && phone && email && address && province && district && ward;
        }

        if (currentStep === 2) {
            // Validate payment info
            const { method } = orderInfo.payment;
            if (method === 'credit') {
                const { cardNumber, cardName, cardExpiry, cardCvc } = orderInfo.payment;
                return cardNumber && cardName && cardExpiry && cardCvc;
            }
            return true;
        }

        return true;
    };

    const nextStep = () => {
        if (validateCurrentStep()) {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
                window.scrollTo(0, 0);
            } else {
                // Place order
                handlePlaceOrder();
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePlaceOrder = () => {
        setLoading(true);

        // Simulate API call to place order
        setTimeout(() => {
            console.log('Order placed:', {
                items,
                ...orderInfo,
                totals: {
                    subtotal: getSubtotal(),
                    shipping: getShippingFee(),
                    discount: getDiscount(),
                    total: getTotal()
                }
            });

            navigate('/order-success');
        }, 1500);
    };

    // If cart is empty, redirect to cart page
    useEffect(() => {
        if (!loading && items.length === 0) {
            navigate('/cart');
        }
    }, [loading, items, navigate]);

    // Render the current step
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <ShippingForm data={orderInfo.shipping} updateData={updateShipping} />;
            case 2:
                return <PaymentMethod data={orderInfo.payment} updateData={updatePayment} />;
            case 3:
                return <OrderReview orderInfo={orderInfo} items={items} />;
            default:
                return null;
        }
    };

    return (
        <DefaultLayout>
            <div className="container py-4">
                <h1 className="h3 mb-4">Thanh toán</h1>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Đang tải...</span>
                        </div>
                        <p className="mt-2">Đang tải thông tin...</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-body p-4">
                                    {/* Checkout Steps Indicator */}
                                    <CheckoutSteps currentStep={currentStep} />

                                    {/* Render current step form */}
                                    <div className="mt-4">
                                        {renderStep()}
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="d-flex justify-content-between mt-4">
                                        {currentStep > 1 ? (
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={prevStep}
                                            >
                                                <i className="fa-solid fa-arrow-left me-2"></i>
                                                Quay lại
                                            </button>
                                        ) : (
                                            <div></div>
                                        )}

                                        <button
                                            className="btn btn-primary px-4"
                                            onClick={nextStep}
                                            disabled={!validateCurrentStep()}
                                        >
                                            {currentStep < 3 ? (
                                                <>Tiếp tục<i className="fa-solid fa-arrow-right ms-2"></i></>
                                            ) : (
                                                <>Đặt hàng</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <OrderSummary
                                items={items}
                                subtotal={getSubtotal()}
                                shipping={getShippingFee()}
                                discount={getDiscount()}
                                total={getTotal()}
                            />
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default Checkout;
