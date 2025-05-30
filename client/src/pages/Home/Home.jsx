import React, { useState, useEffect } from 'react';
import { DefaultLayout } from '../../layouts';
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
        <DefaultLayout>
            {/* Banner Section */}
            <BannerCarousel />

            {/* Category Section */}
            <CategorySection loading={loading} />

            {/* Featured Offers */}
            <FeaturedOffers />

            {/* Product Cards */}
            <ProductCards />
        </DefaultLayout>
    );
};

export default Home;
