import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DefaultLayout } from '../../layouts';
import CartItem from '../../components/Cart/CartItem';
import CartSummary from '../../components/Cart/CartSummary';
import cartItems from '../../data/cartItems';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulate fetching cart data
    useEffect(() => {
        const timer = setTimeout(() => {
            setItems(cartItems);
            // Initially select all items
            setSelectedItems(cartItems.map(item => item.id));
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const updateQuantity = (id, quantity) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: quantity } : item
        ));
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
        setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    };

    // Toggle selection of an individual item
    const toggleSelect = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    // Select all items
    const selectAll = () => {
        setSelectedItems(items.map(item => item.id));
    };

    // Deselect all items
    const deselectAll = () => {
        setSelectedItems([]);
    };

    // Check if all items are selected
    const isAllSelected = items.length > 0 && selectedItems.length === items.length;

    // Get subtotal of selected items
    const getSubtotal = () => {
        return items
            .filter(item => selectedItems.includes(item.id))
            .reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Get count of selected items
    const getSelectedCount = () => {
        return items
            .filter(item => selectedItems.includes(item.id))
            .reduce((count, item) => count + item.quantity, 0);
    };

    // Get total count of all items
    const getItemCount = () => {
        return items.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <DefaultLayout>
            <div className="container py-4">
                <h1 className="h3 mb-4">Giỏ hàng của bạn</h1>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Đang tải...</span>
                        </div>
                        <p className="mt-2">Đang tải giỏ hàng...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="mb-4">
                            <i className="fa-solid fa-cart-shopping fa-4x text-muted"></i>
                        </div>
                        <h2 className="h4 mb-3">Giỏ hàng của bạn đang trống</h2>
                        <p className="text-muted mb-4">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
                        <Link to="/products" className="btn btn-primary px-4">
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                ) : (
                    <div className="row g-4">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm mb-3">
                                <div className="card-header bg-white py-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="selectAll"
                                                checked={isAllSelected}
                                                onChange={isAllSelected ? deselectAll : selectAll}
                                            />
                                            <label className="form-check-label ms-2" htmlFor="selectAll">
                                                {isAllSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                                            </label>
                                        </div>
                                        <span className="text-muted">
                                            <span className="fw-bold">{getItemCount()}</span> sản phẩm trong giỏ hàng
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    {items.map(item => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            updateQuantity={updateQuantity}
                                            removeItem={removeItem}
                                            isSelected={selectedItems.includes(item.id)}
                                            toggleSelect={toggleSelect}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="d-flex flex-wrap justify-content-between mb-4">
                                <Link to="/" className="btn btn-outline-secondary mb-2 mb-md-0">
                                    <i className="fa-solid fa-arrow-left me-2"></i>
                                    Tiếp tục mua sắm
                                </Link>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => setItems([])}
                                    disabled={items.length === 0}
                                >
                                    <i className="fa-solid fa-trash-can me-2"></i>
                                    Xóa giỏ hàng
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <CartSummary
                                subtotal={getSubtotal()}
                                itemCount={getSelectedCount()}
                                selectedItemCount={getSelectedCount()}
                                totalItemCount={getItemCount()}
                            />

                            <div className="card border-0 shadow-sm mt-3 p-3">
                                <h5 className="mb-3">Chấp nhận thanh toán</h5>
                                <div className="d-flex flex-wrap gap-2 mb-2">
                                    <i className="fab fa-cc-visa fs-2 text-primary"></i>
                                    <i className="fab fa-cc-mastercard fs-2 text-danger"></i>
                                    <i className="fab fa-cc-jcb fs-2 text-success"></i>
                                    <i className="fab fa-cc-paypal fs-2 text-info"></i>
                                </div>
                                <div className="d-flex flex-wrap gap-2">
                                    <i className="fab fa-cc-apple-pay fs-2"></i>
                                    <i className="fab fa-google-pay fs-2 text-danger"></i>
                                    {/* Momo icon (using a styled span since there's no FontAwesome icon) */}
                                    <span className="fs-2 d-inline-flex align-items-center justify-content-center rounded px-2"
                                        style={{ backgroundColor: '#ae2070', color: 'white', height: '40px', width: '40px' }}>
                                        M
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default Cart;
