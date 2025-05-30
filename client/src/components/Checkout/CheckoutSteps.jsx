import React from 'react';

const CheckoutSteps = ({ currentStep }) => {
    const steps = [
        { number: 1, name: 'Thông tin giao hàng' },
        { number: 2, name: 'Phương thức thanh toán' },
        { number: 3, name: 'Xác nhận đơn hàng' }
    ];

    return (
        <div className="d-flex justify-content-between align-items-center steps-indicator">
            {steps.map((step) => (
                <div
                    key={step.number}
                    className="d-flex flex-column align-items-center position-relative"
                    style={{ width: `${100 / steps.length}%` }}
                >
                    <div
                        className={`
                            rounded-circle d-flex align-items-center justify-content-center mb-2
                            ${step.number < currentStep ? 'bg-success' :
                                step.number === currentStep ? 'bg-primary' : 'bg-light'}
                        `}
                        style={{
                            width: '40px',
                            height: '40px',
                            color: step.number <= currentStep ? 'white' : '#6c757d',
                            zIndex: 2
                        }}
                    >
                        {step.number < currentStep ? (
                            <i className="fa-solid fa-check"></i>
                        ) : (
                            step.number
                        )}
                    </div>
                    <div
                        className="text-center small"
                        style={{
                            fontWeight: step.number === currentStep ? 'bold' : 'normal',
                            color: step.number <= currentStep ? '#000' : '#6c757d'
                        }}
                    >
                        {step.name}
                    </div>

                    {/* Connecting Line */}
                    {step.number < steps.length && (
                        <div
                            className="position-absolute"
                            style={{
                                top: '20px',
                                right: '0',
                                width: '50%',
                                height: '2px',
                                backgroundColor: step.number < currentStep ? '#198754' : '#e9ecef',
                                zIndex: 1
                            }}
                        ></div>
                    )}

                    {/* Connecting Line (left side) */}
                    {step.number > 1 && (
                        <div
                            className="position-absolute"
                            style={{
                                top: '20px',
                                left: '0',
                                width: '50%',
                                height: '2px',
                                backgroundColor: step.number <= currentStep ? '#198754' :
                                    step.number - 1 < currentStep ? '#198754' : '#e9ecef',
                                zIndex: 1
                            }}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CheckoutSteps;
