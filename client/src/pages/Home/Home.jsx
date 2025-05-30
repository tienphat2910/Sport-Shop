import React, { useState, useEffect } from 'react';
import Navigation from '../../layouts/Header/Navigation';
import Footer from '../../layouts/Footer/Footer';
import BannerCarousel from '../../components/Home/BannerCarousel';
import CategorySection from '../../components/Home/CategorySection';
import FeaturedOffers from '../../components/Home/FeaturedOffers';
import ProductCards from '../../components/Home/ProductCards';

const Home = () => {
    const [loading, setLoading] = useState(true);

    // Simulate loading delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Navigation />
            <div className="container-fluid container-lg px-0 px-sm-3 px-lg-4">
                {/* Banner Section */}
                <BannerCarousel />

                {/* Category Section */}
                <CategorySection loading={loading} />

                {/* Featured Offers */}
                <FeaturedOffers />

                {/* Product Cards */}
                <ProductCards />
            </div>
            <Footer />
        </>
    );
};

export default Home;
