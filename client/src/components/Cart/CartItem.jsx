import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, updateQuantity, removeItem, isSelected, toggleSelect }) => {
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0 && newQuantity <= 10) {
            updateQuantity(item.id, newQuantity);
        }
    };

    const incrementQuantity = () => {
        if (item.quantity < 10) {
            updateQuantity(item.id, item.quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        }
    };

    return (
        <div className="card-body border-bottom py-3">
            <div className="row align-items-center">
                <div className="col-md-1 col-2 mb-2 mb-md-0 text-center">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`select-${item.id}`}
                            checked={isSelected}
                            onChange={() => toggleSelect(item.id)}
                        />
                    </div>
                </div>
                <div className="col-md-2 col-3 mb-2 mb-md-0">
                    <Link to={`/product/${item.id}`}>
                        <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{ objectFit: 'cover', height: '80px', width: '80px' }}
                        />
                    </Link>
                </div>
                <div className="col-md-3 col-7 mb-2 mb-md-0">
                    <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                        <h5 className="card-title h6 mb-1">{item.name}</h5>
                    </Link>
                    <div className="d-flex gap-2 small text-muted">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && (
                            <span className="d-flex align-items-center">
                                Màu:
                                <span
                                    className="d-inline-block rounded-circle ms-1"
                                    style={{
                                        backgroundColor: item.colorCode || item.color,
                                        width: '12px',
                                        height: '12px'
                                    }}
                                ></span>
                                {item.color}
                            </span>
                        )}
                    </div>
                    <div className="text-danger mt-1">
                        {item.price.toLocaleString('vi-VN')}₫
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-2 mb-md-0">
                    <div className="input-group input-group-sm" style={{ maxWidth: '120px' }}>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={decrementQuantity}
                        >
                            <i className="fa-solid fa-minus small"></i>
                        </button>
                        <input
                            type="number"
                            className="form-control text-center"
                            value={item.quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            max="10"
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={incrementQuantity}
                        >
                            <i className="fa-solid fa-plus small"></i>
                        </button>
                    </div>
                </div>
                <div className="col-md-2 col-4 text-end mb-2 mb-md-0">
                    <span className="fw-bold">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </span>
                </div>
                <div className="col-md-1 col-2 text-end">
                    <button
                        className="btn btn-sm text-danger border-0"
                        onClick={() => removeItem(item.id)}
                        title="Xóa sản phẩm"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
