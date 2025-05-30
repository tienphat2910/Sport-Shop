import React, { useState, useEffect } from 'react';
import banners from '../../data/banners';

const BannerCarousel = () => {
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Simulate loading delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
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

    // Handle image load completion
    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    return (
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
    );
};

export default BannerCarousel;
