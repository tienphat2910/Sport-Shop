import React, { useState, useEffect } from 'react';
import { DefaultLayout } from '../../layouts';
import BannerCarousel from '../../components/Home/BannerCarousel';
import CategorySection from '../../components/Home/CategorySection';
import FeaturedOffers from '../../components/Home/FeaturedOffers';
import ProductDisplay from '../../components/Home/ProductDisplay';
import { getProductsByCategory, getFeaturedProducts } from '../../data/products';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [footballProducts, setFootballProducts] = useState([]);
    const [basketballProducts, setBasketballProducts] = useState([]);
    const [runningProducts, setRunningProducts] = useState([]);

    // Simulate loading delay and fetch products
    useEffect(() => {
        const timer = setTimeout(() => {
            setFeaturedProducts(getFeaturedProducts());
            setFootballProducts(getProductsByCategory('football'));
            setBasketballProducts(getProductsByCategory('basketball'));
            setRunningProducts(getProductsByCategory('running'));
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

            {/* Featured Products */}
            <ProductDisplay
                title="Sản phẩm nổi bật"
                products={featuredProducts}
                loading={loading}
                categoryLink="/products/featured"
                viewAllText="Xem tất cả sản phẩm nổi bật"
            />

            {/* Football Products */}
            <ProductDisplay
                title="Bóng đá"
                products={footballProducts}
                loading={loading}
                categoryLink="/products/football"
            />

            {/* Basketball Products */}
            <ProductDisplay
                title="Bóng rổ"
                products={basketballProducts}
                loading={loading}
                categoryLink="/products/basketball"
            />

            {/* Running Products */}
            <ProductDisplay
                title="Chạy bộ"
                products={runningProducts}
                loading={loading}
                categoryLink="/products/running"
            />
        </DefaultLayout>
    );
};

export default Home;
