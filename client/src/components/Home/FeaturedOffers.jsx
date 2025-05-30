import React from 'react';

const FeaturedOffers = () => {
    return (
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
    );
};

export default FeaturedOffers;
