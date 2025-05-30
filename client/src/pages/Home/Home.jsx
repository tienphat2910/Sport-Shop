import React from 'react';
import Navigation from '../../layouts/Header/Navigation';
import Footer from '../../layouts/Footer/Footer';

const Home = () => {
    return (
        <>
            <Navigation />
            <div className="container-fluid container-lg px-0 px-sm-3 px-lg-4">
                {/* Hero Banner - full width on mobile */}
                <div className="mb-4">
                    <div className="position-relative">
                        <picture>
                            <source media="(min-width: 768px)" srcSet="https://via.placeholder.com/1200x400" />
                            <img src="https://via.placeholder.com/600x300" alt="Sport Shop Banner" className="img-fluid w-100" />
                        </picture>
                        <div className="position-absolute top-50 start-0 translate-middle-y p-3 p-md-5 text-white"
                            style={{ background: 'rgba(0,0,0,0.4)', maxWidth: '80%' }}>
                            <h2 className="fw-bold">Welcome to Sport Shop</h2>
                            <p className="d-none d-md-block">Find the best sporting equipment and apparel here!</p>
                            <button className="btn btn-primary mt-2">Shop Now</button>
                        </div>
                    </div>
                </div>

                <div className="px-3 px-lg-0">
                    {/* Mobile-optimized category browsing */}
                    <div className="mb-4">
                        <h4 className="text-center mb-3">Browse Categories</h4>
                        <div className="row g-2 row-cols-4">
                            {['Football', 'Basketball', 'Running', 'Tennis'].map((category, index) => (
                                <div key={index} className="col text-center">
                                    <a href="#" className="text-decoration-none">
                                        <div className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                                            style={{ width: '60px', height: '60px', backgroundColor: '#f0f0f0' }}>
                                            <i className={`fa-solid fa-${['futbol', 'basketball', 'person-running', 'table-tennis-paddle-ball'][index]}`}></i>
                                        </div>
                                        <span className="small d-block text-dark">{category}</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Featured and Special Offers - improved cards */}
                    <div className="row gy-4 mb-4">
                        <div className="col-12 col-md-6">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="row g-0">
                                    <div className="col-4">
                                        <img src="https://via.placeholder.com/200x200" alt="Featured" className="img-fluid h-100" style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="col-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Featured Products</h5>
                                            <p className="card-text small">Check out our latest sporting equipment and gear.</p>
                                            <button className="btn btn-sm" style={{ backgroundColor: '#22a7e0', color: 'white' }}>Shop Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="row g-0">
                                    <div className="col-4">
                                        <img src="https://via.placeholder.com/200x200" alt="Offers" className="img-fluid h-100" style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="col-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Special Offers</h5>
                                            <p className="card-text small">Limited time deals on select items.</p>
                                            <button className="btn btn-sm btn-success">View Offers</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Products - better spacing and styling */}
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
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
