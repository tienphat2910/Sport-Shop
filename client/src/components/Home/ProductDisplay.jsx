import React from 'react';
import { Link } from 'react-router-dom';

const ProductDisplay = ({
    title,
    products = [],
    loading = false,
    categoryLink = "#",
    viewAllText = "Xem tất cả"
}) => {
    // Handle empty products
    if (!products.length && !loading) {
        return null;
    }

    return (
        <div className="product-category-section mb-5">
            {/* Category header with view all link */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">{loading ? <span className="placeholder col-4"></span> : title}</h4>
                <Link to={categoryLink} className="text-decoration-none" style={{ color: '#22a7e0' }}>
                    {loading ? <span className="placeholder col-4"></span> : viewAllText} <i className="fa-solid fa-arrow-right-long ms-1"></i>
                </Link>
            </div>

            {/* Products row */}
            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-2 g-md-3">
                {loading ? (
                    // Loading placeholders
                    Array(5).fill(0).map((_, index) => (
                        <div key={`placeholder-${index}`} className="col">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="placeholder-glow">
                                    <div className="placeholder w-100" style={{ height: '160px' }}></div>
                                </div>
                                <div className="card-body p-2 p-md-3">
                                    <div className="placeholder-glow">
                                        <span className="placeholder col-7 mb-2"></span>
                                        <span className="placeholder col-4 mb-3"></span>
                                        <span className="placeholder col-12" style={{ height: '32px' }}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Actual products
                    products.map((product) => (
                        <div key={product.id} className="col">
                            <div className="card h-100 border-0 shadow-sm product-card">
                                <div className="position-relative">
                                    <Link to={`/product/${product.id}`}>
                                        <img
                                            src={product.image}
                                            className="card-img-top"
                                            alt={product.name}
                                            style={{ height: '160px', objectFit: 'cover' }}
                                        />
                                    </Link>
                                    {product.discount && (
                                        <span className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 small m-2 rounded">-{product.discount}%</span>
                                    )}
                                    {product.isNew && (
                                        <span className="position-absolute top-0 start-0 bg-primary text-white px-2 py-1 small m-2 rounded">New</span>
                                    )}
                                </div>
                                <div className="card-body p-2 p-md-3">
                                    <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                                        <p className="card-title small fw-bold mb-1 text-truncate">{product.name}</p>
                                    </Link>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        {product.discount ? (
                                            <>
                                                <p className="card-text text-danger fw-bold mb-0">{product.discountedPrice.toLocaleString('vi-VN')}₫</p>
                                                <small className="text-decoration-line-through text-muted">{product.price.toLocaleString('vi-VN')}₫</small>
                                            </>
                                        ) : (
                                            <p className="card-text fw-bold mb-0">{product.price.toLocaleString('vi-VN')}₫</p>
                                        )}
                                    </div>
                                    <button className="btn btn-sm w-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#22a7e0', color: 'white' }}>
                                        <i className="fa-solid fa-cart-plus me-1"></i> Thêm vào giỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductDisplay;
