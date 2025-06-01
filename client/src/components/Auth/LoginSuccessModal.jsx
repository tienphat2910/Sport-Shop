import React, { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

const LoginSuccessModal = ({ show, onClose, userName }) => {
    // Create a ref for the modal
    const modalRef = useRef(null);

    // Initialize and control the modal
    useEffect(() => {
        if (!modalRef.current) return;

        const modalElement = modalRef.current;
        const bsModal = new Modal(modalElement);

        if (show) {
            bsModal.show();
        } else {
            bsModal.hide();
        }

        // Event listeners for modal closure
        const handleHidden = () => {
            if (onClose) onClose();
        };

        modalElement.addEventListener('hidden.bs.modal', handleHidden);

        return () => {
            bsModal.dispose();
            modalElement.removeEventListener('hidden.bs.modal', handleHidden);
        };
    }, [show, onClose]);

    return (
        <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="loginSuccessModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center py-4">
                        <div className="mb-4">
                            <i className="fa-solid fa-circle-check fa-4x text-success"></i>
                        </div>
                        <h4 className="mb-3">Đăng nhập thành công!</h4>
                        <p className="mb-0">Chào mừng <strong>{userName || 'bạn'}</strong> đã quay trở lại Sport Shop.</p>
                    </div>
                    <div className="modal-footer border-0 justify-content-center pb-4">
                        <button type="button" className="btn btn-primary px-4" data-bs-dismiss="modal">
                            Tiếp tục
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSuccessModal;
