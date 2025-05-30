import React from 'react';

const ProductCards = () => {
    return (
        <>
            <h4 className="text-center my-4">Featured Products</h4>
            <div className="row row-cols-2 row-cols-md-4 g-2 g-md-3 mb-4">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="col">
                        <div className="card h-100 border-0 shadow-sm product-card">
                            <div className="position-relative">
                                <img src={`https://via.placeholder.com/300x300?text=Product${item}`} className="card-img-top" alt={`Product ${item}`} />
                                <span className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 small m-2 rounded">-20%</span>
                            </div>
                            <div className="card-body p-2 p-md-3">
                                <p className="card-title small fw-bold mb-1">Product Name {item}</p>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <p className="card-text text-danger fw-bold mb-0">$99.99</p>
                                    <small className="text-decoration-line-through text-muted">$129.99</small>
                                </div>
                                <button className="btn btn-sm w-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#22a7e0', color: 'white' }}>
                                    <i className="fa-solid fa-cart-plus me-1"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductCards;
