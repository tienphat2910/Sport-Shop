import React from 'react';
import Navigation from '../../layouts/Header/Navigation';

const Home = () => {
    return (
        <>
            <Navigation />
            <div className="container mt-4">
                <h1>Welcome to Sport Shop</h1>
                <p>Find the best sporting equipment and apparel here!</p>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Featured Products</h5>
                                <p className="card-text">Check out our latest sporting equipment and gear.</p>
                                <button className="btn btn-primary">Shop Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Special Offers</h5>
                                <p className="card-text">Limited time deals on select items.</p>
                                <button className="btn btn-success">View Offers</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
