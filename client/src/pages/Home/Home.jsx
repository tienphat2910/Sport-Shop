import React, { useState, useEffect } from 'react';
import Navigation from '../../layouts/Header/Navigation';
import Footer from '../../layouts/Footer/Footer';
import banners from '../../data/banners';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Simulate loading delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Giảm thời gian loading để mượt hơn
        return () => clearTimeout(timer);
    }, []);

    // Auto-rotate carousel
    useEffect(() => {
        if (!loading && isImageLoaded) {
            const interval = setInterval(() => {
                setActiveIndex((current) => (current === banners.length - 1 ? 0 : current + 1));
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [loading, isImageLoaded]);

    // Khi ảnh banner load xong
    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    return (
        <>
            <Navigation />
            <div className="container-fluid container-lg px-0 px-sm-3 px-lg-4">
                {/* Banner Section */}
                <div className="mb-4 position-relative">
                    {loading || !isImageLoaded ? (
                        <div className="position-relative overflow-hidden" style={{ height: '300px', backgroundColor: '#f0f0f0' }}>
                            <div className="position-absolute top-50 start-50 translate-middle text-muted">Loading Banner...</div>
                        </div>
                    ) : null}

                    <div
                        id="heroCarousel"
                        className={`carousel slide ${loading || !isImageLoaded ? 'opacity-0' : 'opacity-100'}`}
                        style={{
                            transition: 'opacity 0.5s ease-in-out',
                            position: loading || !isImageLoaded ? 'absolute' : 'relative',
                            top: 0,
                            left: 0,
                            width: '100%',
                            zIndex: 1,
                        }}
                        data-bs-ride="false"
                    >
                        {/* Carousel Indicators */}
                        <div className="carousel-indicators">
                            {banners.map((banner, index) => (
                                <button
                                    key={`indicator-${banner.id}`}
                                    type="button"
                                    data-bs-target="#heroCarousel"
                                    data-bs-slide-to={index}
                                    className={index === activeIndex ? 'active' : ''}
                                    aria-current={index === activeIndex ? 'true' : 'false'}
                                    aria-label={`Slide ${index + 1}`}
                                    onClick={() => setActiveIndex(index)}
                                ></button>
                            ))}
                        </div>

                        {/* Carousel Items */}
                        <div className="carousel-inner">
                            {banners.map((banner, index) => (
                                <div
                                    key={`banner-${banner.id}`}
                                    className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                                >
                                    <img
                                        src={banner.img}
                                        className="d-block w-100"
                                        alt={`Banner ${index + 1}`}
                                        style={{
                                            maxHeight: '500px',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                        }}
                                        onLoad={index === 0 ? handleImageLoad : undefined}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Carousel Controls */}
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#heroCarousel"
                            data-bs-slide="prev"
                            onClick={() =>
                                setActiveIndex((prevIndex) =>
                                    prevIndex === 0 ? banners.length - 1 : prevIndex - 1
                                )
                            }
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#heroCarousel"
                            data-bs-slide="next"
                            onClick={() =>
                                setActiveIndex((prevIndex) =>
                                    prevIndex === banners.length - 1 ? 0 : prevIndex + 1
                                )
                            }
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                {/* Category Section */}
                <div className="mb-4">
                    <h4 className="text-center mb-3">
                        {loading ? <span className="placeholder col-4"></span> : "Browse Categories"}
                    </h4>
                    <div className="row g-2 row-cols-4">
                        {['Football', 'Basketball', 'Running', 'Tennis'].map((category, index) => (
                            <div key={index} className="col text-center">
                                {loading ? (
                                    <div className="placeholder-glow d-flex flex-column align-items-center">
                                        <div className="placeholder rounded-circle" style={{ width: '60px', height: '60px' }}></div>
                                        <span className="placeholder col-8 mt-2"></span>
                                    </div>
                                ) : (
                                    <a href="#" className="text-decoration-none">
                                        <div
                                            className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                                            style={{ width: '60px', height: '60px', backgroundColor: '#f0f0f0' }}
                                        >
                                            <i className={`fa-solid fa-${['futbol', 'basketball', 'person-running', 'table-tennis-paddle-ball'][index]}`}></i>
                                        </div>
                                        <span className="small d-block text-dark">{category}</span>
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured + Offers */}
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

                {/* Product Cards */}
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
            <Footer />
        </>
    );
};

export default Home;
