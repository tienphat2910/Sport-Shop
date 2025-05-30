import React from 'react';
import Navigation from '../Header/Navigation';
import Footer from '../Footer/Footer';

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Navigation />
            <div className="container-fluid container-lg px-0 px-sm-3 px-lg-4">
                {children}
            </div>
            <Footer />
        </>
    );
};

export default DefaultLayout;
